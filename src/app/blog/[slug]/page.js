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
  return {
    title: `${postData.title} | SCPC Precast Blog`,
  };
}

export default async function BlogPost({ params }) {
  const resolvedParams = await params;
  const postData = await getPostData(resolvedParams.slug);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem' }}>
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
