# Contentstack Client

A minimal TypeScript wrapper around the Contentstack Delivery SDK with environment variable support and optional helper functions.

## Installation

The Contentstack TypeScript SDK is already installed in this project:

```bash
pnpm add @contentstack/delivery-sdk
```

## Configuration

### Environment Variables

Set up your environment variables in `.env.local`:

```env
CONTENTSTACK_API_KEY=your_api_key
CONTENTSTACK_DELIVERY_TOKEN=your_delivery_token
CONTENTSTACK_ENVIRONMENT=your_environment
CONTENTSTACK_REGION=your_region # Optional (e.g., 'US', 'EU')
CONTENTSTACK_HOST=your_host # Optional
CONTENTSTACK_TIMEOUT=5000 # Optional timeout in milliseconds
```

## Basic Usage

### Initialize Stack

```typescript
import { createStack } from './lib/contentstack';

const stack = createStack();
```

### Direct SDK Usage (Recommended)

Use the Contentstack SDK directly for full control:

```typescript
import { BaseEntry, BaseAsset } from '@contentstack/delivery-sdk';

// Define your content types
interface BlogPost extends BaseEntry {
  title: string;
  content: string;
  slug: string;
}

// Fetch a single entry
const entry = await stack
  .contentType('blog_post')
  .entry('entry_uid')
  .fetch<BlogPost>();

// Fetch multiple entries
const entries = await stack
  .contentType('blog_post')
  .entry()
  .find<BlogPost>();

// Query with filters
const filteredEntries = await stack
  .contentType('blog_post')
  .entry()
  .query({ 'title': { '$regex': 'javascript' } })
  .limit(10)
  .orderBy('-created_at')
  .find<BlogPost>();

// Fetch with references
const entryWithRefs = await stack
  .contentType('blog_post')
  .entry('entry_uid')
  .includeReference(['author', 'categories'])
  .fetch<BlogPost>();

// Fetch assets
const asset = await stack.asset('asset_uid').fetch<BaseAsset>();
const assets = await stack.asset().find<BaseAsset>();
```

### Optional Helper Functions

For simple use cases, you can use the provided helper functions:

```typescript
import { getEntry, getEntries, getAsset, getAssets } from './lib/contentstack';

// These are thin wrappers around the SDK methods
const entry = await getEntry<BlogPost>(stack, 'blog_post', 'entry_uid');
const entries = await getEntries<BlogPost>(stack, 'blog_post');
const asset = await getAsset<BaseAsset>(stack, 'asset_uid');
const assets = await getAssets<BaseAsset>(stack);
```

## TypeScript Usage

### Define Content Types

```typescript
import { BaseEntry, BaseAsset } from '@contentstack/delivery-sdk';

interface Article extends BaseEntry {
  title: string;
  slug: string;
  content: string;
  featured_image?: BaseAsset;
  author?: Author;
  published_date: string;
}

interface Author extends BaseEntry {
  name: string;
  bio?: string;
  avatar?: BaseAsset;
}

interface Page extends BaseEntry {
  title: string;
  slug: string;
  content: string;
  seo_title?: string;
  seo_description?: string;
}
```

## Examples

### Fetching Blog Posts with Authors

```typescript
const posts = await stack
  .contentType('blog_post')
  .entry()
  .includeReference(['author'])
  .limit(10)
  .find<BlogPost>();

// Access the data
posts.forEach(post => {
  console.log(`${post.title} by ${post.author?.name}`);
});
```

### Query by Slug

```typescript
const entries = await stack
  .contentType('page')
  .entry()
  .query({ 'slug': 'about-us' })
  .limit(1)
  .find<Page>();

const page = entries[0];
```

### Building a Navigation Menu

```typescript
interface NavigationItem extends BaseEntry {
  label: string;
  url: string;
  children?: NavigationItem[];
}

const navigation = await stack
  .contentType('navigation')
  .entry('main-nav')
  .includeReference(['children'])
  .fetch<NavigationItem>();
```

## Next.js Integration

### API Route Example

```typescript
// app/api/blog/[slug]/route.ts
import { createDefaultStack } from '../../../../lib/contentstack';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const stack = createDefaultStack();
  
  const entries = await stack
    .contentType('blog_post')
    .entry()
    .query({ 'slug': params.slug })
    .limit(1)
    .find<BlogPost>();
  
  if (entries.length === 0) {
    return Response.json({ error: 'Post not found' }, { status: 404 });
  }
  
  return Response.json({ post: entries[0] });
}
```

### Server Component Example

```typescript
// app/blog/[slug]/page.tsx
import { createDefaultStack } from '../../../lib/contentstack';

export default async function BlogPostPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const stack = createDefaultStack();
  
  const entries = await stack
    .contentType('blog_post')
    .entry()
    .query({ 'slug': params.slug })
    .includeReference(['author'])
    .limit(1)
    .find<BlogPost>();
  
  if (entries.length === 0) {
    return <div>Post not found</div>;
  }
  
  const post = entries[0];
  
  return (
    <article>
      <h1>{post.title}</h1>
      {post.author && <p>By {post.author.name}</p>}
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}
```

### Static Generation Example

```typescript
// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const stack = createDefaultStack();
  
  const posts = await stack
    .contentType('blog_post')
    .entry()
    .only(['slug'])
    .find<{ slug: string }>();
  
  return posts.map(post => ({
    slug: post.slug,
  }));
}
```

## Error Handling

Handle errors using standard try-catch blocks:

```typescript
try {
  const entry = await stack
    .contentType('blog_post')
    .entry('entry_uid')
    .fetch<BlogPost>();
  
  console.log('Entry:', entry);
} catch (error) {
  console.error('Failed to fetch entry:', error);
}
```

## Advanced Queries

The SDK supports powerful querying capabilities:

```typescript
// Complex filtering
const posts = await stack
  .contentType('blog_post')
  .entry()
  .query({
    'title': { '$regex': 'Next.js' },
    'published_date': { '$gte': '2024-01-01' },
    'author.name': { '$in': ['John Doe', 'Jane Smith'] }
  })
  .includeReference(['author', 'categories'])
  .only(['title', 'slug', 'author', 'published_date'])
  .orderBy('-published_date')
  .limit(20)
  .skip(0)
  .find<BlogPost>();

// Locale-specific content
const localizedEntry = await stack
  .contentType('page')
  .entry('entry_uid')
  .locale('fr-fr')
  .fetch<Page>();
```

## Best Practices

1. **Use the raw SDK directly** for most operations to avoid unnecessary abstractions
2. **Handle errors with try-catch** blocks where appropriate
3. **Use TypeScript interfaces** for better type safety
4. **Leverage SDK query capabilities** for efficient data fetching
5. **Cache responses** when appropriate for better performance
6. **Use environment variables** for configuration in production
7. **Include only necessary fields** using `.only()` for better performance

## Troubleshooting

### Common Issues

1. **Missing environment variables**: Ensure all required env vars are set
2. **Network timeouts**: Increase the timeout value in configuration
3. **Invalid region**: Use correct region values ('US', 'EU', etc.)
4. **Content type not found**: Verify content type UIDs match your Contentstack setup

### Debug Mode

For debugging, you can log the query details or use browser dev tools to inspect network requests. 