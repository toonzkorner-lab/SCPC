import Link from 'next/link';
import Image from 'next/image';
import { getCategories } from '../lib/db';
import ProductCard from '../components/ProductCard';
import FadeIn from '../components/FadeIn';

export const metadata = {
  title: 'Home | SCPC Precast',
  description: 'Providing high-quality, custom precast concrete products for architects, contractors, and landscapers in Coachella, California, surrounding states, and nationwide for large projects.',
  openGraph: {
    title: 'Home | SCPC Precast',
    description: 'Providing high-quality, custom precast concrete products for architects, contractors, and landscapers in Coachella, California, surrounding states, and nationwide for large projects.',
    url: 'https://precastbyscpcinc.com/',
  }
};

export default async function Home() {
  const categories = await getCategories();
  const featuredCategories = categories.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="section section-dark text-center hero-section" style={{ padding: '6rem 0' }}>
        <FadeIn className="container">
          <h1 style={{ marginBottom: '1.5rem', letterSpacing: '-1px' }}>
            Seawright Custom Precast, Inc.
          </h1>
          <h2 style={{ color: 'var(--accent)', fontWeight: '400', fontSize: '1.8rem', marginBottom: '2rem' }}>
            Best prices anywhere!
          </h2>
          <p style={{ maxWidth: '800px', margin: '0 auto 3rem auto', opacity: 0.9, fontSize: '1.2rem' }}>
            With over 40 years of experience in this industry, we have seen a few things, so we can help you make good decisions concerning your project.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/products" className="btn btn-accent" style={{ fontSize: '1.1rem' }}>View Catalog</Link>
            <Link href="/contact" className="btn" style={{ fontSize: '1.1rem', backgroundColor: 'transparent', border: '2px solid white' }}>Contact Us</Link>
          </div>
        </FadeIn>
      </section>

      {/* Info Sections Split */}
      <section className="section">
        <div className="container grid-cols-2">
          <FadeIn direction="right" style={{ padding: '2rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)' }}>
            <h2 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>What is precast concrete?</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
              It's a construction product that is produced by using a mold or form (which is reusable). Once the items are made they can be transported to the construction site or your home project; for the DIY'ers. Sometimes the molds are moved to the construction site and poured on-site to yield the desired precast concrete product.
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginTop: '1rem' }}>
              Precast concrete products save you time and money. Everything from precast concrete steps, columns, water features, bowls, and flag poles (just to name a few items). Good concrete suppliers will have a large offering and here at SCPC inc we also do consultations for all your precast concrete projects.
            </p>
          </FadeIn>
          
          <FadeIn direction="left" style={{ padding: '2rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)' }}>
            <h2 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Enhance your project with a limited budget</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
              With the assistance of a knowledgeable precaster with design and installation experience, you can be directed to utilize the precast at locations that will catch the eye. It is not necessary to have precast on each and every windowsill on the building if you are looking to save money. A front door surround will go a long way to dress up the building.
            </p>
            <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>Consulting</h3>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
              With 34 years of installation and manufacturing experience, I can be of assistance in the early stages of your design. Although I am not a licensed engineer, my attachment methods have been tested through many years of installation, on many projects. We can assist in designing attachments for your projects, at which time it can be engineered if required.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Featured Categories Grid */}
      <section className="section section-light">
        <div className="container">
          <FadeIn className="text-center mb-8">
            <h2>Our Featured Products</h2>
            <p>Explore some of our most popular precast concrete categories.</p>
          </FadeIn>
          <FadeIn delay={0.2} className="grid-auto-fit">
            {featuredCategories.map((cat) => (
              <ProductCard 
                key={cat.id}
                title={cat.name}
                description={cat.description}
                link={`/products/${cat.slug}`}
                imageUrl={`/images/${cat.image || 'placeholder.jpg'}`}
              />
            ))}
          </FadeIn>
          <div className="text-center" style={{ marginTop: '3rem' }}>
            <Link href="/products" className="btn btn-accent">See All Products</Link>
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="section text-center" style={{ backgroundColor: '#1e3a5f', color: 'white' }}>
        <FadeIn className="container">
          <h2 style={{ color: 'white', marginBottom: '1rem' }}>The SCPC Inc team thanks you for visiting our website</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Feel free to call us anytime.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '1.3rem', fontWeight: 'bold' }}>
            <span>Phone: 760-398-1515</span>
            <span>Fax: 760-398-1008</span>
          </div>
        </FadeIn>
      </section>

    </div>
  );
}
