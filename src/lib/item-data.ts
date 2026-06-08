/**
 * Item details data layer.
 *
 * Reads product data from the `public/Item Details/` directory structure.
 * Server-only — uses `fs` to discover files at runtime.
 *
 * Directory layout:
 *   public/Item Details/
 *     Centre Bearing Brackets/  (display: "Center Bearing Packets")
 *     Mountings Plates/         (display: "Mounting Plates")
 *     Suspension Parts/         (display: "Suspension Plates")
 *     HR, HRPO & CRCA Slit Coils/     (modal — no page)
 *     HR, HRPO & CRCA Sheets & Strips/ (modal — no page)
 */

import fs from 'fs';
import path from 'path';

const ITEM_DETAILS_DIR = path.join(process.cwd(), 'public', 'Item Details');

/* ── Category data ─────────────────────────────────────── */

export interface CategoryInfo {
  /** URL-friendly slug */
  slug: string;
  /** Display name shown in UI */
  displayName: string;
  /** Actual directory name on disk */
  dirName: string;
  /** Whether this category opens a page (vs a modal) */
  hasPage: boolean;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    slug: 'center-bearing-packets',
    displayName: 'Center Bearing Packets',
    dirName: 'Centre Bearing Brackets',
    hasPage: true,
  },
  {
    slug: 'mounting-plates',
    displayName: 'Mounting Plates',
    dirName: 'Mountings Plates',
    hasPage: true,
  },
  {
    slug: 'suspension-plates',
    displayName: 'Suspension Plates',
    dirName: 'Suspension Parts',
    hasPage: true,
  },
  {
    slug: 'hr-hrpo-slit-coils',
    displayName: 'HR / HRPO Slit Coils',
    dirName: 'HR, HRPO & CRCA Slit Coils',
    hasPage: false,
  },
  {
    slug: 'hr-hrpo-crca-sheets-strips',
    displayName: 'HR / HRPO & CRCA Sheets & Strips',
    dirName: 'HR, HRPO & CRCA Sheets & Strips',
    hasPage: false,
  },
];

const SLUG_TO_CATEGORY = new Map<string, CategoryInfo>(
  CATEGORIES.map((c) => [c.slug, c])
);

export function getCategoryBySlug(slug: string): CategoryInfo | undefined {
  return SLUG_TO_CATEGORY.get(slug);
}

export function getAllCategories(): CategoryInfo[] {
  return [...CATEGORIES];
}

export function getPageCategories(): CategoryInfo[] {
  return CATEGORIES.filter((c) => c.hasPage);
}

/* ── Product data ──────────────────────────────────────── */

export interface ProductItem {
  name: string;
  imagePath: string;
  category: string;
  /** File modification time for date-based sorting */
  sortDate: Date;
}

/**
 * Read all product files from a category's directory.
 * Returns products sorted alphabetically by name.
 */
export function getProductsByCategory(dirName: string): ProductItem[] {
  const dirPath = path.join(ITEM_DETAILS_DIR, dirName);

  if (!fs.existsSync(dirPath)) {
    console.warn(`[item-data] Directory not found: ${dirPath}`);
    return [];
  }

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  const products: ProductItem[] = [];
  for (const entry of entries) {
    if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) {
        const name = path.basename(entry.name, ext);
        const fullPath = path.join(dirPath, entry.name);
        const stat = fs.statSync(fullPath);
        products.push({
          name,
          imagePath: `/Item Details/${dirName}/${entry.name}`,
          category: dirName,
          sortDate: stat.mtime,
        });
      }
    }
  }

  products.sort((a, b) => a.name.localeCompare(b.name));
  return products;
}

/**
 * Get products for a category by slug.
 */
export function getProductsBySlug(slug: string): ProductItem[] {
  const cat = getCategoryBySlug(slug);
  if (!cat) return [];
  return getProductsByCategory(cat.dirName);
}

/** Public URL path for an item-detail image (used in <img> src) */
export function imageUrl(product: ProductItem): string {
  return encodeURI(product.imagePath);
}

/* ── Summary for API ───────────────────────────────────── */

export interface CategorySummary {
  slug: string;
  displayName: string;
  productCount: number;
  hasPage: boolean;
}

export function getAllCategorySummaries(): CategorySummary[] {
  return CATEGORIES.map((cat) => ({
    slug: cat.slug,
    displayName: cat.displayName,
    productCount: getProductsByCategory(cat.dirName).length,
    hasPage: cat.hasPage,
  }));
}
