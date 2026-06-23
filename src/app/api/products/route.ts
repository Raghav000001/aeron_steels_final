import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Product } from '@/models/Product';
import { uploadImage } from '@/lib/cloudinary';
import { errorResponse, successResponse, requireAdmin } from '@/lib/api-helpers';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = request.nextUrl;
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(200, Math.max(1, parseInt(searchParams.get('limit') || '50', 10)));
    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      Product.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Product.countDocuments(),
    ]);

    return successResponse(products, 200, {
      page,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('GET /api/products error:', error);
    return errorResponse('Failed to fetch products', 500);
  }
} 

export async function POST(request: Request) {
  const authError = requireAdmin(request);
  if (authError) return authError;

  try {
    const contentType = request.headers.get('content-type') || '';

    let title: string;
    let src: string;

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const titleField = formData.get('title');
      const imageFile = formData.get('image');

      if (!titleField || typeof titleField !== 'string' || !titleField.trim()) {
        return errorResponse('Product title is required', 400);
      }
      if (!imageFile || !(imageFile instanceof File)) {
        return errorResponse('Product image is required', 400);
      }

      title = titleField.trim();

      const buffer = Buffer.from(await imageFile.arrayBuffer());
      src = await uploadImage(buffer);
    } else {
      const body = await request.json();
      if (!body.title || !body.title.trim()) {
        return errorResponse('Product title is required', 400);
      }
      if (!body.src) {
        return errorResponse('Product image URL is required', 400);
      }

      title = body.title.trim();
      src = body.src;
    }

    await connectDB();

    const product = await Product.create({ title, src });

    return successResponse({ product }, 201);
  } catch (error) {
    console.error('POST /api/products error:', error);
    return errorResponse('Failed to create product', 500);
  }
}
