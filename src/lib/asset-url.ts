// Lovable's asset-serving path does not exist on external hosts such as Netlify.
// Resolve these pointers against the project's published Lovable origin.
const ASSET_ORIGIN = "https://sweet-startup-recipe-hub.lovable.app";

export function assetUrl(asset: { url: string }): string {
  return new URL(asset.url, ASSET_ORIGIN).href;
}