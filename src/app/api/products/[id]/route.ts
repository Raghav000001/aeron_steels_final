import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Product } from '@/models/Product';
import { uploadImage } from '@/lib/cloudinary';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();

    const product = await Product.findById(id).lean();

    if (!product) {
      return Response.json({ error: 'Product not found' }, { status: 404 });
    }

    return Response.json({ product });
  } catch (error) {
    console.error('GET /api/products/[id] error:', error);
    return Response.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const contentType = request.headers.get('content-type') || '';

    let updateData: { title?: string; src?: string } = {};

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
      return Response.json({ error: 'No fields to update' }, { status: 400 });
    }

    await connectDB();

    const product = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return Response.json({ error: 'Product not found' }, { status: 404 });
    }

    return Response.json({ product });
  } catch (error) {
    console.error('PUT /api/products/[id] error:', error);
    return Response.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await connectDB();

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return Response.json({ error: 'Product not found' }, { status: 404 });
    }

    return Response.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('DELETE /api/products/[id] error:', error);
    return Response.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
