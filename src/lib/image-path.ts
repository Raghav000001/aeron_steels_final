/**
 * URL-encode a filesystem-style path for safe use as an <Image src> / <img src>.
 *
 * Why not just `encodeURI(path)`:
 * `encodeURI` deliberately leaves a handful of characters untouched
 * because they're "reserved/valid" in a URL — and `+` is one of them.
 * But `+` is *also* the legacy form-encoding shorthand for a space, and
 * some layers in the request path (CDNs, image optimizers, even some
 * browsers re-parsing a URL) decode `+` back into a space rather than
 * treating it literally. A filename like "Tata 407 (Front) (L+R).png"
 * then gets requested as "...(L R).png", which doesn't exist on disk —
 * silently broken image, only for filenames containing "+".
 *
 * Fix: encode each path segment with `encodeURIComponent` (so "/" stays
 * a separator) and explicitly convert any literal "+" to "%2B", which is
 * unambiguous everywhere.
 *
 * IMPORTANT: this file has zero Node-only imports (no `fs`, no `path`)
 * on purpose, so client components can safely import it. Do NOT import
 * this function from `item-data.ts` into a 'use client' file — that file
 * pulls in `fs`, which breaks the browser bundle. Keep this helper
 * standalone.
 *
 * Use it everywhere an image path is turned into a URL — e.g.
 * `<Image src={encodeImagePath(product.imagePath)} ... />`.
 */
export function encodeImagePath(rawPath: string): string {
  return rawPath
    .split('/')
    .map((segment) => encodeURIComponent(segment).replace(/\+/g, '%2B'))
    .join('/');
}