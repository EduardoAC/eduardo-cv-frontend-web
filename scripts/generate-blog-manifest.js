const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const sharp = require('sharp');

const postsDirectory = path.join(process.cwd(), 'content/posts');
const outputDirectory = path.join(process.cwd(), 'generated');
const outputPath = path.join(outputDirectory, 'blog-manifest.json');
const wordsPerMinute = 200;

const calculateReadingTime = (content) => {
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
};

const normalizeDate = (date) => {
  if (date instanceof Date) {
    return date.toISOString();
  }

  return typeof date === 'string' ? date : String(date ?? '');
};

const getImageMetadata = async (imagePath) => {
  if (!imagePath || imagePath.startsWith('http')) {
    return {};
  }

  const fullImagePath = path.join(process.cwd(), 'public', imagePath.replace(/^\//, ''));

  if (!fs.existsSync(fullImagePath)) {
    console.warn(`Skipping missing blog image: ${imagePath}`);
    return {};
  }

  try {
    const { width, height } = await sharp(fullImagePath).metadata();

    if (!width || !height) {
      return {};
    }

    return {
      imageWidth: width,
      imageHeight: height,
    };
  } catch (error) {
    console.warn(`Unable to read image metadata for ${imagePath}:`, error);
    return {};
  }
};

const generateManifest = async () => {
  const posts = await Promise.all(
    fs
      .readdirSync(postsDirectory)
      .filter((fileName) => fileName.endsWith('.md') && !fileName.startsWith('.'))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
          slug,
          title: typeof data.title === 'string' ? data.title : '',
          description: typeof data.description === 'string' ? data.description : '',
          date: normalizeDate(data.date),
          author: typeof data.author === 'string' ? data.author : '',
          tags: Array.isArray(data.tags) ? data.tags : [],
          image: typeof data.image === 'string' ? data.image : undefined,
          readingTime: calculateReadingTime(content),
          ...(await getImageMetadata(typeof data.image === 'string' ? data.image : undefined)),
        };
      }),
  );

  posts.sort((a, b) => (a.date < b.date ? 1 : -1));

  fs.mkdirSync(outputDirectory, { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(posts, null, 2)}\n`);

  console.log(`Generated blog manifest for ${posts.length} posts at ${outputPath}`);
};

generateManifest().catch((error) => {
  console.error('Failed to generate blog manifest:', error);
  process.exit(1);
});
