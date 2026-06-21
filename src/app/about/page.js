export const metadata = {
  title: 'About Us | SCPC Precast',
  description: 'Learn about SCPC Precast and our dedication to high-quality precast concrete.',
};

export default function AboutPage() {
  return (
    <div className="section">
      <div className="container">
        <div className="text-center mb-8 fade-in-up">
          <h1>About SCPC Precast</h1>
          <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem' }}>
            Providing durable elegance in custom precast concrete since 1999.
          </p>
        </div>
        
        <div className="grid-cols-2" style={{ alignItems: 'center', gap: '4rem' }}>
          <div className="fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h2>Our Story</h2>
            <p>
              Seawright Custom Precast, Inc. (SCPC) has been at the forefront of manufacturing high-quality precast concrete products for decades. Our commitment to craftsmanship and structural integrity has made us a trusted partner for architects, contractors, landscapers, and homeowners.
            </p>
            <p>
              We believe that precast concrete is not just a building material, but an architectural element that adds timeless beauty and significant value to any project. Our extensive catalog ranges from structural columns and wall caps to decorative corbels, fireplace surrounds, and pool coping.
            </p>
            <h3>Our Mission</h3>
            <p>
              To provide unparalleled quality, custom solutions, and exceptional customer service. Whether you need standard items from our extensive catalog or custom pieces tailored to your exact specifications, our team is dedicated to bringing your vision to life in stone.
            </p>
          </div>
          <div className="fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div style={{ 
              height: '500px', 
              backgroundColor: '#e0e0e0', 
              borderRadius: 'var(--radius)', 
              boxShadow: 'var(--shadow)',
              backgroundImage: 'url(/images/scpc-logo-for-2020-copy-at-200-pix.jpg)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              border: '1px solid var(--border)'
            }}>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
