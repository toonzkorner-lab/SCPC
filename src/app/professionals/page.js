import Link from 'next/link';

export const metadata = {
  title: 'Architect & Contractor Portal | SCPC Precast',
  description: 'Download CAD drawings, specifications, and high-res textures for SCPC custom precast concrete products.',
};

export default function ProfessionalsPortal() {
  const categories = [
    { name: 'Balusters & Railings', count: 42 },
    { name: 'Columns & Capitals', count: 120 },
    { name: 'Fireplace Surrounds', count: 35 },
    { name: 'Pool Coping', count: 18 },
    { name: 'Wall Caps & Pier Caps', count: 65 }
  ];

  return (
    <div style={{ backgroundColor: '#fcfcfc', minHeight: '100vh' }}>
      <div style={{ backgroundColor: '#1a1a1a', padding: '5rem 2rem', color: 'white', textAlign: 'center' }}>
        <h1 className="fade-in-up" style={{ fontSize: '3.5rem', marginBottom: '1rem', color: 'white' }}>Professionals Portal</h1>
        <p className="fade-in-up" style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', animationDelay: '0.2s', opacity: 0.8 }}>
          Technical resources, CAD files, and specifications for Architects, Designers, and Contractors.
        </p>
      </div>

      <div className="container section" style={{ padding: '4rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
          
          {/* Main Downloads */}
          <div style={{ gridColumn: '1 / -1' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--primary)', borderBottom: '2px solid #eaeaea', paddingBottom: '1rem' }}>
              Resource Downloads
            </h2>
            <p style={{ color: '#555', marginBottom: '2rem', fontSize: '1.1rem' }}>
              Access our complete library of technical drawings and high-resolution material textures to incorporate SCPC products directly into your Revit, AutoCAD, or SketchUp models.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {categories.map(cat => (
                <div key={cat.name} style={{ padding: '1.5rem', backgroundColor: 'white', border: '1px solid #eaeaea', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--primary)' }}>{cat.name}</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <a href="#" style={{ color: 'var(--accent)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '1.2rem' }}>📄</span> CAD (.DWG) - {cat.count} files
                    </a>
                    <a href="#" style={{ color: 'var(--accent)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '1.2rem' }}>🖼️</span> High-Res Textures (.ZIP)
                    </a>
                    <a href="#" style={{ color: 'var(--accent)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '1.2rem' }}>📊</span> Technical Specs (.PDF)
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Project Planning */}
          <div style={{ backgroundColor: '#e9f5f9', padding: '3rem', borderRadius: '12px', border: '1px solid #d0e7ef', gridColumn: '1 / -1', marginTop: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>Start a Custom Project</h2>
              <p style={{ fontSize: '1.1rem', maxWidth: '700px', marginBottom: '2rem', color: '#444' }}>
                Have a unique design or need a custom mold created? Use our Project Planner to securely upload your architectural plans, and our estimating team will provide a detailed quote and timeline.
              </p>
              <Link href="/contact" className="btn btn-accent" style={{ fontSize: '1.2rem', padding: '1rem 3rem' }}>
                Upload Project Plans
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
