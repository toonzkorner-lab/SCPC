import styles from './Contact.module.css';

export const metadata = {
  title: 'Contact Us | SCPC Precast',
  description: 'Get in touch with SCPC Precast for a quote or custom precast concrete inquiries.',
};

export default function ContactPage() {
  return (
    <div style={{ backgroundColor: '#fcfcfc' }}>
      {/* Top Banner (Contact Us) */}
      <div style={{ backgroundColor: 'var(--accent)', padding: '2rem 0', color: 'white' }}>
        <div className="container">
          <h1 style={{ margin: 0, fontSize: '2.5rem', fontWeight: '500' }}>Contact Us</h1>
        </div>
      </div>

      <div className="container" style={{ padding: '3rem 0', textAlign: 'center' }}>
        {/* Logo */}
        <div style={{ marginBottom: '2rem' }}>
          <img src="/images/logo.jpg" alt="SCPC Precast Logo" style={{ maxWidth: '300px', height: 'auto', margin: '0 auto' }} />
        </div>

        {/* Info Banner */}
        <div style={{ backgroundColor: '#5bc0de', color: '#111', padding: '1rem', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '3rem' }}>
          Seawright Custom Precast, Inc | 85610 Grapefruit Blvd | Coachella CA. 92236<br />
          760-398-1515 | <a href="mailto:sales@scpcinc.com" style={{ color: '#111', textDecoration: 'underline' }}>sales@scpcinc.com</a>
        </div>

        {/* Highlighted text */}
        <h2 style={{ fontSize: '2rem', textShadow: '2px 2px 4px rgba(0,0,0,0.2)', marginBottom: '3rem', color: '#222' }}>
          We are located in Coachella California! Plus we can serve you anywhere in the USA
        </h2>

        {/* Product Showcase */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', marginBottom: '4rem' }}>
          <div style={{ textAlign: 'center' }}>
            <img src="/images/Column-12-300x205.jpeg" alt="Precast Concrete Columns" style={{ width: '250px', height: '200px', objectFit: 'cover', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
            <p style={{ marginTop: '0.5rem', fontWeight: '600', color: '#555' }}>Precast Concrete Columns</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <img src="/images/Wall-cap-plinth--225x300.jpg" alt="Precast Concrete Walls" style={{ width: '250px', height: '200px', objectFit: 'cover', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
            <p style={{ marginTop: '0.5rem', fontWeight: '600', color: '#555' }}>Precast Concrete Walls</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <img src="/images/Entry-way-1-225x300.jpg" alt="Entrance" style={{ width: '250px', height: '200px', objectFit: 'cover', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
            <p style={{ marginTop: '0.5rem', fontWeight: '600', color: '#555' }}>Entrance Details</p>
          </div>
        </div>

        {/* Directions & Map Section */}
        <div style={{ backgroundColor: '#e9f5f9', padding: '3rem', borderRadius: '12px', textAlign: 'left', marginBottom: '4rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Located in Southern California</h2>
          <div className="grid-cols-2" style={{ gap: '2rem' }}>
            <div>
              <h3 style={{ textDecoration: 'underline', marginBottom: '1rem' }}>Directions</h3>
              <p><strong>Coming from the West on Hwy 10:</strong><br />Take the Dillon Rd exit in Coachella, go right towards Hwy 111, take a left. We are about 1/2 mile on the left side.</p>
              <p><strong>Coming from Washington Street or Hwy 111:</strong><br />Go east on Hwy 111 until you pass Dillon Rd. We are about 1/2 mile past Dillon Rd on the left side.</p>
              
              <div className="mt-4" style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #ddd' }}>
                <h3 style={{ marginBottom: '0.5rem' }}>Get In Touch</h3>
                <p style={{ marginBottom: '1rem' }}>We look forward to working with you on your next project.</p>
                <form action="mailto:estimating@scpcinc.com" method="GET" encType="text/plain">
                  <input type="text" name="subject" placeholder="Subject" required style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                  <textarea name="body" rows="4" placeholder="Your message..." required style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}></textarea>
                  <button type="submit" className="btn" style={{ width: '100%' }}>Email Us via Your Client</button>
                </form>
              </div>
            </div>
            
            {/* Google Maps iFrame */}
            <div>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3311.23351502422!2d-116.1824706!3d33.6823336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80daf1f8f9024f03%3A0xc3f8e56230ba7c21!2sSeawright%20Custom%20Precast%2C%20Inc!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0, minHeight: '400px', borderRadius: '8px' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
