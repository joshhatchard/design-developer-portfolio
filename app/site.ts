const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://joshhatchard.com");

export const siteUrl = new URL(configuredSiteUrl);
export const siteName = "Josh Hatchard";
export const siteDescription = "Josh Hatchard is a designer and developer building thoughtful digital products, brands, and interactive experiences.";
export const isPreviewDeployment = process.env.VERCEL_ENV === "preview";

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}
