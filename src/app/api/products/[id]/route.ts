import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Product } from '@/models/Product';
import { uploadImage } from '@/lib/cloudinary';
import { errorResponse, successResponse, requireAdmin, isValidObjectId } from '@/lib/api-helpers';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!isValidObjectId(id)) {
      return errorResponse('Invalid product ID format', 400);
    }

    await connectDB();

    const product = await Product.findById(id).lean();

    if (!product) {
      return errorResponse('Product not found', 404);
    }

    return successResponse({ product });
  } catch (error) {
    console.error('GET /api/products/[id] error:', error);
    return errorResponse('Failed to fetch product', 500);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAdmin(request);
  if (authError) return authError;

  try {
    const { id } = await params;

    if (!isValidObjectId(id)) {
      return errorResponse('Invalid product ID format', 400);
    }

    const contentType = request.headers.get('content-type') || '';

    const updateData: { title?: string; src?: string } = {};

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const titleField = formData.get('title');
      const imageFile = formData.get('image');

      if (titleField && typeof titleField === 'string' && titleField.trim()) {
        updateData.title = titleField.trim();
      }

      if (imageFile && imageFile instanceof File) {
        const buffer = Buffer.from(await imageFile.arrayBuffer());
        updateData.src = await uploadImage(buffer);
      }
    } else {
      const body = await request.json();
      if (body.title && typeof body.title === 'string' && body.title.trim()) {
        updateData.title = body.title.trim();
      }
      if (body.src && typeof body.src === 'string') {
        updateData.src = body.src;
      }
    }

    if (Object.keys(updateData).length === 0) {
      return errorResponse('No fields to update', 400);
    }

    await connectDB();

    const product = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return errorResponse('Product not found', 404);
    }

    return successResponse({ product });
  } catch (error) {
    console.error('PUT /api/products/[id] error:', error);
    return errorResponse('Failed to update product', 500);
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAdmin(_request);
  if (authError) return authError;

  try {
    const { id } = await params;

    if (!isValidObjectId(id)) {
      return errorResponse('Invalid product ID format', 400);
    }

    await connectDB();

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return errorResponse('Product not found', 404);
    }

    return successResponse({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('DELETE /api/products/[id] error:', error);
    return errorResponse('Failed to delete product', 500);
  }
}
