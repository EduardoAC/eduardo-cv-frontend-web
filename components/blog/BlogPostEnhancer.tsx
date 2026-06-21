'use client';

import { useEffect } from 'react';

interface BlogPostEnhancerProps {
  rootId: string;
}

const copyCodeToClipboard = async (button: HTMLButtonElement) => {
  const codeElement = button.closest('.snap-code-block')?.querySelector('pre code');
  const code = codeElement?.textContent ?? '';

  if (!code) {
    return;
  }

  try {
    await navigator.clipboard.writeText(code);
    const originalLabel = button.textContent;
    button.textContent = 'Copied!';
    button.classList.add('copied');

    window.setTimeout(() => {
      button.textContent = originalLabel;
      button.classList.remove('copied');
    }, 2000);
  } catch (error) {
    console.error('Failed to copy code block contents.', error);
  }
};

const renderMermaidDiagrams = async (root: HTMLElement) => {
  const diagrams = Array.from(root.querySelectorAll<HTMLElement>('.snap-mermaid[data-mermaid-diagram]')).filter(
    (diagram) => diagram.getAttribute('data-mermaid-enhanced') !== 'true',
  );

  if (diagrams.length === 0) {
    return;
  }

  const { default: mermaid } = await import('mermaid');
  const themeStyle = getComputedStyle(diagrams[0]);
  const readThemeColor = (property: string, fallback: string) => themeStyle.getPropertyValue(property).trim() || fallback;
  const diagramBackground = readThemeColor('--snap-mermaid-background', readThemeColor('--color-surface-elevated', '#ffffff'));
  const lineColor = readThemeColor('--snap-mermaid-line', readThemeColor('--color-accent', '#1d4ed8'));
  const nodeBackground = readThemeColor('--snap-mermaid-node-background', readThemeColor('--color-surface', '#ffffff'));
  const nodeTextColor = readThemeColor('--snap-mermaid-node-text', readThemeColor('--color-text-primary', '#111827'));
  const nodeBorderColor = readThemeColor('--snap-mermaid-node-border', readThemeColor('--color-border-strong', lineColor));

  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'strict',
    theme: 'base',
    htmlLabels: false,
    flowchart: {
      curve: 'linear',
      padding: 8,
      diagramPadding: 12,
      nodeSpacing: 44,
      rankSpacing: 28,
      useMaxWidth: false,
      wrappingWidth: 220,
    },
    themeVariables: {
      background: diagramBackground,
      edgeLabelBackground: diagramBackground,
      fontFamily: 'Inter, Arial, sans-serif',
      lineColor,
      mainBkg: nodeBackground,
      nodeBorder: nodeBorderColor,
      nodeTextColor,
      primaryBorderColor: nodeBorderColor,
      primaryColor: nodeBackground,
      primaryTextColor: nodeTextColor,
      secondaryColor: nodeBackground,
      secondaryTextColor: nodeTextColor,
      tertiaryColor: diagramBackground,
      tertiaryTextColor: nodeTextColor,
      textColor: nodeTextColor,
      titleColor: nodeTextColor,
    },
  });

  await Promise.all(
    diagrams.map(async (diagram, index) => {
      const sourceElement = diagram.querySelector<HTMLElement>('.snap-mermaid-source');
      const renderedElement = diagram.querySelector<HTMLElement>('.snap-mermaid-rendered');

      if (!sourceElement || !renderedElement) {
        return;
      }

      const source = sourceElement.textContent?.trim() ?? '';

      if (!source) {
        return;
      }

      try {
        const { svg, bindFunctions } = await mermaid.render(`snap-mermaid-${root.id}-${index}`, source);
        renderedElement.innerHTML = svg;
        bindFunctions?.(renderedElement);
        sourceElement.hidden = true;
        diagram.setAttribute('data-mermaid-enhanced', 'true');
      } catch (error) {
        diagram.classList.add('snap-mermaid-error');
        console.error('Failed to render Mermaid diagram.', error);
      }
    }),
  );
};

export default function BlogPostEnhancer({ rootId }: Readonly<BlogPostEnhancerProps>) {
  useEffect(() => {
    const root = document.getElementById(rootId);

    if (!root) {
      return undefined;
    }

    let activeHeadingId = '';
    const collapsibleToc = root.querySelector<HTMLDetailsElement>('[data-blog-toc-collapsible]');
    const getHeadingById = (targetId: string | null | undefined): HTMLElement | null => {
      if (!targetId) {
        return null;
      }

      const heading = document.getElementById(targetId);

      return heading instanceof HTMLElement && root.contains(heading) ? heading : null;
    };

    const clearActiveTocItems = () => {
      root.querySelectorAll('.snap-toc-item').forEach((item) => {
        item.classList.remove('snap-toc-active');
      });
    };

    const setActiveTocItem = (activeId: string) => {
      activeHeadingId = activeId;

      if (collapsibleToc && !collapsibleToc.open) {
        clearActiveTocItems();
        return;
      }

      root.querySelectorAll('.snap-toc-item').forEach((item) => {
        item.classList.toggle('snap-toc-active', item.getAttribute('data-heading-id') === activeId);
      });
    };

    const tocObserver = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);

        if (visibleEntries.length === 0) {
          return;
        }

        visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        setActiveTocItem(visibleEntries[0].target.id);
      },
      { rootMargin: '-20% 0px -35% 0px', threshold: [0.1, 0.5, 1] },
    );

    root.querySelectorAll<HTMLElement>('[data-blog-toc] a[href^="#"]').forEach((anchor) => {
      const targetId = anchor.getAttribute('href')?.slice(1);
      const heading = getHeadingById(targetId);

      if (heading) {
        tocObserver.observe(heading);
      }
    });

    root.querySelectorAll<HTMLElement>('.snap-gist-placeholder[data-gist-id]').forEach((placeholder) => {
      const gistId = placeholder.getAttribute('data-gist-id');

      if (!gistId || placeholder.getAttribute('data-gist-enhanced') === 'true') {
        return;
      }

      placeholder.setAttribute('data-gist-enhanced', 'true');
      const container = document.createElement('div');
      container.className = 'snap-gist-container';

      const script = document.createElement('script');
      script.src = `https://gist.github.com/${gistId}.js`;
      script.async = true;

      container.appendChild(script);
      placeholder.appendChild(container);
    });

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;

      if (!target) {
        return;
      }

      const copyButton = target.closest<HTMLButtonElement>('.snap-code-copy');

      if (copyButton) {
        event.preventDefault();
        void copyCodeToClipboard(copyButton);
        return;
      }

      const anchor = target.closest<HTMLAnchorElement>('[data-blog-toc] a[href^="#"]');

      if (!anchor) {
        return;
      }

      const targetId = anchor.getAttribute('href')?.slice(1);
      const heading = getHeadingById(targetId);

      if (!heading) {
        return;
      }

      event.preventDefault();
      heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', `#${targetId}`);
    };

    const onTocToggle = () => {
      if (!collapsibleToc) {
        return;
      }

      if (!collapsibleToc.open) {
        clearActiveTocItems();
        return;
      }

      if (activeHeadingId) {
        setActiveTocItem(activeHeadingId);
      }
    };

    root.addEventListener('click', onClick);
    collapsibleToc?.addEventListener('toggle', onTocToggle);
    void renderMermaidDiagrams(root);

    return () => {
      tocObserver.disconnect();
      root.removeEventListener('click', onClick);
      collapsibleToc?.removeEventListener('toggle', onTocToggle);
    };
  }, [rootId]);

  return null;
}
