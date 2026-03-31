/**
 * Simple utility to replace placeholders like {niche}, {location}, {name}
 * in configuration strings with dynamic data from the URL.
 */
export function formatContent(template: string, data: Record<string, string>): string {
  if (!template) return "";
  return template.replace(/{(\w+)}/g, (match, key) => {
    return data[key] || match;
  });
}
