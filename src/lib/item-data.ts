/**
 * Item details data layer.
 *
 * Reads product data from the `public/Item Details/` directory structure.
 * Server-only — uses `fs` to discover files at runtime.
 *
 * IMPORTANT: this file imports `fs`/`path` (Node-only). Never import it
 * from a 'use client' component, even just to grab `encodeImagePath` —
 * the whole module (including the fs import) gets pulled into the
 * browser bundle and the build fails with "Module not found: Can't
 * resolve 'fs'". Client components needing `encodeImagePath` should
 * import it from `./image-path` instead (re-exported below for
 * server-side convenience only).
 *
 * Directory layout:
 *   public/Item Details/
 *     Centre Bearing Brackets/  (display: "Center Bearing Packets")
 *     Mountings Plates/         (display: "Mounting Plates")
 *     Suspension Parts/         (display: "Suspension Plates")
 *     HR, HRPO & CRCA Slit Coils/     (page — spec showcase)
 *     HR, HRPO & CRCA Sheets & Strips/ (page — spec showcase)
 */

import fs from 'fs';
import path from 'path';
import { encodeImagePath } from './image-path';

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
    slug: 'center-bearing-Brackets',
    displayName: 'Center Bearing Brackets',
    dirName: 'Centre Bearing Brackets',
    hasPage: true,
  },
  {
    slug: 'mounting-parts',
    displayName: 'Mounting Parts',
    dirName: 'Mountings Plates',
    hasPage: true,
  },
  {
    slug: 'suspension-parts',
    displayName: 'Suspension Parts',
    dirName: 'Suspension Parts',
    hasPage: true,
  },
  {
    slug: 'hr-hrpo-crca-slit-coils',
    displayName: 'HR / HRPO & CRCA Slit Coils',
    dirName: 'HR, HRPO & CRCA Slit Coils',
    hasPage: true,
  },
  {
    slug: 'hr-hrpo-crca-sheets-strips',
    displayName: 'HR / HRPO & CRCA Sheets & Strips',
    dirName: 'HR, HRPO & CRCA Sheets & Strips',
    hasPage: true,
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
  /** Raw filesystem-style path, e.g. "/Item Details/Foo/Bar (L+R).png" — NOT URL-encoded yet. */
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

/**
 * Re-exported for server-side convenience (API routes, server components).
 * Client components must import this from './image-path' directly instead —
 * see the file-level warning above for why.
 */
export { encodeImagePath };

/** Public URL path for an item-detail image (used in <img>/<Image> src) */
export function imageUrl(product: ProductItem): string {
  return encodeImagePath(product.imagePath);
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