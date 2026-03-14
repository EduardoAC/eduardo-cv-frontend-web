import { getAllPosts, getPostMetaBySlug, type BlogPostMeta } from './markdown';

export interface BlogSeriesContext {
  name: string;
  totalPosts: number;
  currentIndex: number;
  previousPost: BlogPostMeta | null;
  nextPost: BlogPostMeta | null;
}

const sortSeriesPosts = (a: BlogPostMeta, b: BlogPostMeta): number => {
  const orderA = a.seriesOrder ?? Number.MAX_SAFE_INTEGER;
  const orderB = b.seriesOrder ?? Number.MAX_SAFE_INTEGER;

  if (orderA !== orderB) {
    return orderA - orderB;
  }

  return a.date.localeCompare(b.date);
};

export const getSeriesContext = (slug: string): BlogSeriesContext | null => {
  const currentPost = getPostMetaBySlug(slug);

  if (!currentPost?.series) {
    return null;
  }

  const seriesPosts = getAllPosts()
    .filter((post) => post.series === currentPost.series)
    .sort(sortSeriesPosts);
  const currentIndex = seriesPosts.findIndex((post) => post.slug === slug);

  if (currentIndex < 0) {
    return null;
  }

  return {
    name: currentPost.series,
    totalPosts: seriesPosts.length,
    currentIndex: currentIndex + 1,
    previousPost: seriesPosts[currentIndex - 1] ?? null,
    nextPost: seriesPosts[currentIndex + 1] ?? null,
  };
};
