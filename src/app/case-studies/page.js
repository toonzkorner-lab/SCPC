import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Case Studies | SCPC Precast',
  description: 'Explore our portfolio of complex architectural precast concrete installations across California and Texas.',
};

export default function CaseStudiesPage() {
  const cases = [
    {
      id: 'luxury-estate-columns',
      title: 'Luxury Estate Facade & Columns',
      location: 'Newport Beach, California',
      challenge: 'The architect required structurally integrated hollow-core columns that matched a specific historical Romanesque texture, while accommodating complex internal drainage pipes.',
      solution: 'SCPC developed a custom GFRC (Glass Fiber Reinforced Concrete) mold that drastically reduced the weight of the 14-foot columns, allowing for easier crane installation while perfectly masking the internal PVC drainage system. The custom color mix eliminated the need for field painting.',
      image: '/images/Entry-way-1-225x300.jpg',
      testimonial: '"The precision of SCPC\'s column molds saved our framing crew three days of work. The texture matching was flawless." - Lead Architect'
    },
    {
      id: 'commercial-plaza-coping',
      title: 'Commercial Plaza Pool & Fountain',
      location: 'San Antonio, Texas',
      challenge: 'A massive 5,000 sq ft reflecting pool required hundreds of linear feet of radiused pool coping that could withstand Texas heat expansion without cracking.',
      solution: 'We engineered custom radius coping pieces with specialized expansion joints and a high-PSI concrete mix designed for extreme temperature fluctuations. All pieces were shipped securely from our California facility to Texas and installed without a single breakage.',
      image: '/images/pool-1-225x300.jpg',
      testimonial: '"Getting custom radius work shipped halfway across the country is risky, but SCPC delivered perfectly. The fitment was exact." - Commercial Contractor'
    }
  ];

  return (
    <div style={{ backgroundColor: '#fcfcfc', minHeight: '100vh', paddingBottom: '4rem' }}>
      <div style={{ backgroundColor: '#1a1a1a', padding: '4rem 2rem', color: 'white', textAlign: 'center' }}>
        <h1 className="fade-in-up" style={{ fontSize: '3.5rem', marginBottom: '1rem', color: 'white' }}>Case Studies</h1>
        <p className="fade-in-up" style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', animationDelay: '0.2s', opacity: 0.8 }}>
          Real-world challenges. Engineered precast solutions.
        </p>
      </div>

      <div className="container" style={{ marginTop: '4rem', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
        {cases.map((cs, idx) => (
          <div key={cs.id} className="fade-in-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem', backgroundColor: 'white', border: '1px solid #eaeaea', borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
            
            <div style={{ position: 'relative', minHeight: '400px' }}>
              <Image 
                src={cs.image} 
                alt={cs.title} 
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div style={{ padding: '3rem 3rem 3rem 0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span style={{ color: 'var(--accent)', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '1px', marginBottom: '0.5rem' }}>
                {cs.location}
              </span>
              <h2 style={{ fontSize: '2.2rem', color: 'var(--primary)', marginBottom: '1.5rem', lineHeight: '1.2' }}>{cs.title}</h2>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#333', marginBottom: '0.5rem' }}>The Challenge:</h3>
                <p style={{ color: '#555', lineHeight: '1.6' }}>{cs.challenge}</p>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#333', marginBottom: '0.5rem' }}>The Solution:</h3>
                <p style={{ color: '#555', lineHeight: '1.6' }}>{cs.solution}</p>
              </div>

              <div style={{ padding: '1.5rem', backgroundColor: '#f9f9f9', borderLeft: '4px solid var(--accent)', fontStyle: 'italic', color: '#444' }}>
                {cs.testimonial}
              </div>
            </div>

          </div>
        ))}

        <div className="text-center fade-in-up" style={{ marginTop: '2rem', padding: '3rem', backgroundColor: '#e9f5f9', borderRadius: '12px' }}>
          <h2 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Have a Complex Project?</h2>
          <p style={{ color: '#555', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
            Our engineering team is ready to review your plans and provide custom solutions.
          </p>
          <Link href="/professionals" className="btn btn-accent">Visit the Architect Portal</Link>
        </div>

      </div>
    </div>
  );
}
