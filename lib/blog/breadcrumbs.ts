export interface BlogBreadcrumbItem {
  label: string;
  href?: string;
  isVisuallyHidden?: boolean;
}

const DEFAULT_BASE_URL = 'https://eduardoac.dev';

const normalizeBaseUrl = (baseUrl: string): string => baseUrl.replace(/\/$/, '');

export const getAbsoluteSiteUrl = (path: string, baseUrl: string = DEFAULT_BASE_URL): string => {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  const normalizedBaseUrl = normalizeBaseUrl(baseUrl);

  if (path === '/') {
    return normalizedBaseUrl;
  }

  return `${normalizedBaseUrl}${path.startsWith('/') ? path : `/${path}`}`;
};

export const createBlogBreadcrumbItems = (
  childItems: ReadonlyArray<BlogBreadcrumbItem> = [],
): BlogBreadcrumbItem[] => {
  if (childItems.length === 0) {
    return [];
  }

  return [
    {
      label: 'Blog',
      href: '/blog',
    },
    ...childItems,
  ];
};

export const createBreadcrumbStructuredData = (
  items: ReadonlyArray<BlogBreadcrumbItem>,
  currentPath: string,
  baseUrl: string = DEFAULT_BASE_URL,
) => {
  if (items.length < 2) {
    return null;
  }

  const currentUrl = getAbsoluteSiteUrl(currentPath, baseUrl);

  return {
    '@type': 'BreadcrumbList',
    '@id': `${currentUrl}#breadcrumbs`,
    itemListElement: items.map((item, index) => {
      const isLastItem = index === items.length - 1;
      const itemUrl = item.href ?? (isLastItem ? currentPath : undefined);

      return {
        '@type': 'ListItem',
        position: index + 1,
        name: item.label,
        ...(itemUrl ? { item: getAbsoluteSiteUrl(itemUrl, baseUrl) } : {}),
      };
    }),
  };
};

export const createStructuredDataGraph = (
  nodes: ReadonlyArray<Record<string, unknown> | null>,
) => ({
  '@context': 'https://schema.org',
  '@graph': nodes.filter((node): node is Record<string, unknown> => Boolean(node)),
});
