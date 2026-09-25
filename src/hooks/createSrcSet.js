export function createSrcSet(baseUrl) {
  if (!baseUrl) return "";

  return `
    ${baseUrl}?w=400&fm=webp&q=80 400w,
    ${baseUrl}?w=800&fm=webp&q=80 800w,
    ${baseUrl}?w=1200&fm=webp&q=80 1200w
  `;
}