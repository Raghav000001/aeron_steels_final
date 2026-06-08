import { NextRequest } from 'next/server';
import {
  getAllCategorySummaries,
  getProductsBySlug,
} from '@/lib/item-data';
import { successResponse, errorResponse } from '@/lib/api-helpers';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const category = searchParams.get('category');

    if (category) {
      const products = getProductsBySlug(category);
      if (products.length === 0) {
        return errorResponse('Category not found or empty', 404);
      }
      return successResponse(products);
    }

    const summaries = getAllCategorySummaries();
    return successResponse(summaries);
  } catch (error) {
    console.error('GET /api/item-details error:', error);
    return errorResponse('Failed to fetch item details', 500);
  }
}
