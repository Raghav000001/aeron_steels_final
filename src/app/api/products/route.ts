import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Product } from '@/models/Product';
import { uploadImage } from '@/lib/cloudinary';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = request.nextUrl;
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '50', 10)));
    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      Product.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Product.countDocuments(),
    ]);

    return Response.json({
      products,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('GET /api/products error:', error);
    return Response.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || '';

    let title: string;
    let src: string;

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const titleField = formData.get('title');
      const imageFile = formData.get('image');

      if (!titleField || typeof titleField !== 'string' || !titleField.trim()) {
        return Response.json({ error: 'Product title is required' }, { status: 400 });
      }
      if (!imageFile || !(imageFile instanceof File)) {
        return Response.json({ error: 'Product image is required' }, { status: 400 });
      }

      title = titleField.trim();

      const buffer = Buffer.from(await imageFile.arrayBuffer());
      src = await uploadImage(buffer);
    } else {
      const body = await request.json();
      if (!body.title || !body.title.trim()) {
        return Response.json({ error: 'Product title is required' }, { status: 400 });
      }
      if (!body.src) {
        return Response.json({ error: 'Product image URL is required' }, { status: 400 });
      }

      title = body.title.trim();
      src = body.src;
    }

    await connectDB();

    const product = await Product.create({ title, src });

    return Response.json({ product }, { status: 201 });
  } catch (error) {
    console.error('POST /api/products error:', error);
    return Response.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
