import { getPostData, getAllPostIds } from '../../../lib/markdown';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import Head from 'next/head';

export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths.map((path) => ({
    slug: path.params.slug,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const postData = await getPostData(resolvedParams.slug);
  const description = postData.content.substring(0, 160).replace(/\n/g, ' ') + '...';
  
  return {
    title: `${postData.title} | SCPC Precast Blog`,
    description: description,
    openGraph: {
      title: `${postData.title} | SCPC Precast Blog`,
      description: description,
      url: `https://precastbyscpcinc.com/blog/${resolvedParams.slug}`,
      type: 'article',
      publishedTime: postData.date,
      images: postData.coverImage ? [postData.coverImage] : [],
    }
  };
}

export default async function BlogPost({ params }) {
  const resolvedParams = await params;
  const postData = await getPostData(resolvedParams.slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: postData.title,
    image: postData.coverImage ? `https://precastbyscpcinc.com${postData.coverImage}` : undefined,
    datePublished: postData.date,
    dateModified: postData.date,
    author: {
      '@type': 'Organization',
      name: 'SCPC Precast',
      url: 'https://precastbyscpcinc.com',
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link href="/blog" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 'bold', marginBottom: '2rem', display: 'inline-block' }}>
        &larr; Back to Blog
      </Link>
      <article>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#1a1a1a', lineHeight: '1.2' }}>{postData.title}</h1>
        <div style={{ color: '#888', marginBottom: '2rem' }}>{postData.date}</div>
        <div className="markdown-content" style={{ fontSize: '1.1rem', lineHeight: '1.7', color: '#333' }}>
          <ReactMarkdown>{postData.content}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
