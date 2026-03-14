import manifest from '@/generated/site-image-manifest.json';

export type SiteImageVariant = {
  src: string;
  width: number;
  height: number;
  format: string;
};

export type SiteImageManifestEntry = {
  source: string;
  width: number;
  height: number;
  format: string;
  usages?: string[];
  variants: SiteImageVariant[];
};

type SiteImageManifest = Record<string, SiteImageManifestEntry>;

const siteImageManifest = manifest as SiteImageManifest;

export const getSiteImageEntry = (src: string): SiteImageManifestEntry | null =>
  siteImageManifest[src] ?? null;

export const getSiteImageDimensions = (
  src: string,
  fallback: { width: number; height: number },
) => {
  const entry = getSiteImageEntry(src);

  return {
    width: entry?.width ?? fallback.width,
    height: entry?.height ?? fallback.height,
  };
};
