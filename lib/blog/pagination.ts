import blogConfig from './config.json';

export const BLOG_ARCHIVE_PAGE_SIZE = blogConfig.archivePageSize;

export interface PaginatedPostSlice<T> {
  posts: T[];
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  pageSize: number;
  startIndex: number;
}

export interface ArchivePaginationLink {
  page: number;
  href: string;
  isCurrent: boolean;
}

export interface ArchivePaginationData {
  currentPage: number;
  totalPages: number;
  links: ArchivePaginationLink[];
  previousHref?: string;
  nextHref?: string;
}

export const getPageCount = (totalItems: number, pageSize: number = BLOG_ARCHIVE_PAGE_SIZE): number => {
  return Math.max(1, Math.ceil(totalItems / pageSize));
};

export const parsePageNumber = (value: string): number | null => {
  if (!/^[1-9]\d*$/.test(value)) {
    return null;
  }

  const pageNumber = Number.parseInt(value, 10);
  return Number.isSafeInteger(pageNumber) ? pageNumber : null;
};

export const paginatePosts = <T>(
  posts: ReadonlyArray<T>,
  pageNumber: number,
  pageSize: number = BLOG_ARCHIVE_PAGE_SIZE,
): PaginatedPostSlice<T> | null => {
  const totalPosts = posts.length;
  const totalPages = getPageCount(totalPosts, pageSize);

  if (!Number.isInteger(pageNumber) || pageNumber < 1 || pageNumber > totalPages) {
    return null;
  }

  const startIndex = (pageNumber - 1) * pageSize;

  return {
    posts: posts.slice(startIndex, startIndex + pageSize),
    currentPage: pageNumber,
    totalPages,
    totalPosts,
    pageSize,
    startIndex,
  };
};

export const createArchivePagination = (
  currentPage: number,
  totalPages: number,
  buildPagePath: (pageNumber: number) => string,
): ArchivePaginationData => {
  return {
    currentPage,
    totalPages,
    links: Array.from({ length: totalPages }, (_, index) => {
      const page = index + 1;

      return {
        page,
        href: buildPagePath(page),
        isCurrent: page === currentPage,
      };
    }),
    previousHref: currentPage > 1 ? buildPagePath(currentPage - 1) : undefined,
    nextHref: currentPage < totalPages ? buildPagePath(currentPage + 1) : undefined,
  };
};

export const formatArchiveResultsSummary = ({
  startIndex,
  postsOnPage,
  totalPosts,
}: {
  startIndex: number;
  postsOnPage: number;
  totalPosts: number;
}): string => {
  if (postsOnPage === 0 || totalPosts === 0) {
    return 'No articles are available yet.';
  }

  const firstPostNumber = startIndex + 1;
  const lastPostNumber = startIndex + postsOnPage;

  return `Showing articles ${firstPostNumber}-${lastPostNumber} of ${totalPosts}.`;
};
