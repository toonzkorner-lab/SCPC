import Image from 'next/image';

export const metadata = {
  title: 'About Us | SCPC Precast',
  description: 'Learn about SCPC Precast and our dedication to high-quality precast concrete.',
};

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: '#fcfcfc' }}>
      {/* Hero Section */}
      <div style={{ backgroundColor: 'var(--primary)', padding: '4rem 2rem', color: 'white', textAlign: 'center' }}>
        <h1 className="fade-in-up" style={{ fontSize: '3rem', marginBottom: '1rem', color: 'white' }}>Our Heritage</h1>
        <p className="fade-in-up" style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', animationDelay: '0.2s', opacity: 0.9 }}>
          Providing durable elegance in custom precast concrete since 1999.
        </p>
      </div>

      <div className="container section">
        <div className="grid-cols-2" style={{ alignItems: 'center', gap: '4rem', marginBottom: '6rem' }}>
          <div className="fade-in-up">
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>A Legacy of Craftsmanship</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem', color: '#444' }}>
              Seawright Custom Precast, Inc. (SCPC) has been at the forefront of manufacturing high-quality precast concrete products for decades. Founded in 1999, our commitment to craftsmanship and structural integrity has made us a trusted partner for architects, contractors, landscapers, and homeowners across the United States.
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#444' }}>
              We believe that precast concrete is not just a building material, but a defining architectural element that adds timeless beauty and significant value to any project. From expansive commercial developments to intimate residential landscapes, our products stand the test of time.
            </p>
          </div>
          <div className="fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div style={{ 
              position: 'relative',
              height: '450px', 
              borderRadius: 'var(--radius)', 
              overflow: 'hidden',
              boxShadow: 'var(--shadow)',
            }}>
              <Image 
                src="/images/Main-pic-1-1.jpg" 
                alt="SCPC Precast Craftsmanship" 
                fill 
                style={{ objectFit: 'cover' }} 
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>

        <div className="grid-cols-2" style={{ alignItems: 'center', gap: '4rem', marginBottom: '6rem' }}>
          <div className="fade-in-up" style={{ order: 1 }}>
            <div style={{ 
              position: 'relative',
              height: '450px', 
              borderRadius: 'var(--radius)', 
              overflow: 'hidden',
              boxShadow: 'var(--shadow)',
            }}>
              <Image 
                src="/images/Column-12-300x205.jpeg" 
                alt="SCPC Precast Quality" 
                fill 
                style={{ objectFit: 'cover' }} 
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
          <div className="fade-in-up" style={{ order: 2, animationDelay: '0.2s' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>The Precast Difference</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem', color: '#444' }}>
              Our extensive catalog ranges from structural columns and wall caps to decorative corbels, fireplace surrounds, and pool coping. We utilize state-of-the-art mold-making techniques to ensure flawless finishes and precise dimensions.
            </p>
            <ul style={{ listStyleType: 'none', padding: 0, margin: '0 0 1.5rem 0' }}>
              <li style={{ fontSize: '1.1rem', paddingBottom: '0.8rem', borderBottom: '1px solid #eee', marginBottom: '0.8rem', color: '#444' }}>
                <span style={{ color: 'var(--accent)', fontWeight: 'bold', marginRight: '10px' }}>✓</span> Standard Concrete & GFRC Options
              </li>
              <li style={{ fontSize: '1.1rem', paddingBottom: '0.8rem', borderBottom: '1px solid #eee', marginBottom: '0.8rem', color: '#444' }}>
                <span style={{ color: 'var(--accent)', fontWeight: 'bold', marginRight: '10px' }}>✓</span> Custom Molds & Engineering
              </li>
              <li style={{ fontSize: '1.1rem', paddingBottom: '0.8rem', borderBottom: '1px solid #eee', marginBottom: '0.8rem', color: '#444' }}>
                <span style={{ color: 'var(--accent)', fontWeight: 'bold', marginRight: '10px' }}>✓</span> Nationwide Shipping Capabilities
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center fade-in-up" style={{ backgroundColor: '#e9f5f9', padding: '4rem 2rem', borderRadius: 'var(--radius)', marginTop: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>Our Mission</h2>
          <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.2rem', lineHeight: '1.8', color: '#555', fontStyle: 'italic' }}>
            "To provide unparalleled quality, custom solutions, and exceptional customer service. Whether you need standard items from our extensive catalog or custom pieces tailored to your exact specifications, our team is dedicated to bringing your vision to life in stone."
          </p>
        </div>
      </div>
    </div>
  );
}
