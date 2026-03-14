import manifest from '@/generated/site-image-manifest.json';

type LoaderVariant = {
  src: string;
  width: number;
  height: number;
  format: string;
};

type LoaderManifestEntry = {
  source: string;
  width: number;
  height: number;
  format: string;
  usages?: string[];
  variants: LoaderVariant[];
};

type LoaderManifest = Record<string, LoaderManifestEntry>;

type LoaderProps = {
  src: string;
  width: number;
  quality?: number;
};

const siteManifest = manifest as LoaderManifest;

const resolveVariant = (src: string, width: number) => {
  const entry = siteManifest[src];

  if (!entry || !Array.isArray(entry.variants) || entry.variants.length === 0) {
    return src;
  }

  return entry.variants.find((variant) => variant.width >= width)?.src
    ?? entry.variants[entry.variants.length - 1]?.src
    ?? src;
};

export default function siteLoader({ src, width }: LoaderProps): string {
  if (!src || src.startsWith('data:') || /^https?:\/\//i.test(src)) {
    return src;
  }

  const [pathname] = src.split('?');

  if (!pathname.startsWith('/')) {
    return src;
  }

  return resolveVariant(pathname, width);
}
