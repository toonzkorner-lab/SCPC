import Image from 'next/image';
import styles from './Contact.module.css';

export const metadata = {
  title: 'Contact Us | SCPC Precast',
  description: 'Get in touch with SCPC Precast for a quote or custom precast concrete inquiries.',
  openGraph: {
    title: 'Contact Us | SCPC Precast',
    description: 'Get in touch with SCPC Precast for a quote or custom precast concrete inquiries.',
    url: 'https://precastbyscpcinc.com/contact',
  }
};

export default function ContactPage() {
  return (
    <div style={{ backgroundColor: '#fcfcfc', minHeight: '100vh' }}>
      {/* Hero Section */}
      <div style={{ backgroundColor: 'var(--primary)', padding: '4rem 2rem', color: 'white', textAlign: 'center' }}>
        <h1 className="fade-in-up" style={{ fontSize: '3rem', marginBottom: '1rem', color: 'white' }}>Contact Us</h1>
        <p className="fade-in-up" style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', animationDelay: '0.2s', opacity: 0.9 }}>
          Get in touch for custom quotes, catalog inquiries, and architectural precast concrete solutions.
        </p>
      </div>

      <div className="container section">
        
        {/* Contact Info Cards */}
        <div className="grid-cols-2" style={{ gap: '2rem', marginBottom: '4rem' }}>
          
          <div className="fade-in-up" style={{ backgroundColor: 'white', padding: '3rem', borderRadius: '12px', boxShadow: 'var(--shadow)', border: '1px solid #eaeaea' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--primary)' }}>Get In Touch</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', color: '#555', marginBottom: '0.5rem' }}>Location</h3>
                <p style={{ fontSize: '1.2rem', fontWeight: '500', color: '#222' }}>
                  85610 Grapefruit Blvd<br />
                  Coachella CA. 92236
                </p>
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', color: '#555', marginBottom: '0.5rem' }}>Phone</h3>
                <p style={{ fontSize: '1.2rem', fontWeight: '500', color: '#222' }}>
                  <a href="tel:760-398-1515" style={{ textDecoration: 'none', color: 'var(--accent)' }}>760-398-1515</a>
                </p>
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', color: '#555', marginBottom: '0.5rem' }}>Email</h3>
                <p style={{ fontSize: '1.2rem', fontWeight: '500', color: '#222' }}>
                  <a href="mailto:sales@scpcinc.com" style={{ textDecoration: 'none', color: 'var(--accent)' }}>sales@scpcinc.com</a>
                </p>
              </div>
            </div>

            <div style={{ marginTop: '3rem', padding: '1.5rem', backgroundColor: '#f8f9fa', borderRadius: '8px', borderLeft: '4px solid var(--accent)' }}>
              <p style={{ fontSize: '1.1rem', margin: 0, fontWeight: '500' }}>We serve anywhere in the USA.</p>
              <p style={{ margin: '0.5rem 0 0 0', color: '#555' }}>Nationwide shipping available for all products.</p>
            </div>
          </div>

          <div className="fade-in-up" style={{ animationDelay: '0.2s', backgroundColor: 'white', padding: '3rem', borderRadius: '12px', boxShadow: 'var(--shadow)', border: '1px solid #eaeaea' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>Send us a Message</h2>
            <p style={{ marginBottom: '2rem', color: '#555' }}>We look forward to working with you on your next project. Fill out the form below to open your email client.</p>
            
            <form action="mailto:sales@scpcinc.com" method="GET" encType="text/plain" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#333' }}>Subject</label>
                <input type="text" name="subject" required style={{ width: '100%', padding: '0.8rem', border: '1px solid #ccc', borderRadius: '8px', fontSize: '1rem', outline: 'none', transition: 'border-color 0.3s' }} placeholder="Quote Request / General Inquiry" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#333' }}>Message</label>
                <textarea name="body" rows="6" required style={{ width: '100%', padding: '0.8rem', border: '1px solid #ccc', borderRadius: '8px', fontSize: '1rem', outline: 'none', resize: 'vertical', transition: 'border-color 0.3s' }} placeholder="Please describe your project needs..."></textarea>
              </div>
              <button type="submit" className="btn btn-accent" style={{ padding: '1rem', fontSize: '1.1rem', width: '100%' }}>Open Email Draft</button>
            </form>
          </div>

        </div>

        {/* Directions & Map Section */}
        <div className="fade-in-up" style={{ backgroundColor: '#e9f5f9', padding: '3rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '2rem', animationDelay: '0.4s' }}>
          <div className="text-center">
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--primary)' }}>Located in Southern California</h2>
            <p style={{ fontSize: '1.1rem', color: '#444', maxWidth: '800px', margin: '0 auto' }}>
              <strong>Coming from the West on Hwy 10:</strong> Take the Dillon Rd exit in Coachella, go right towards Hwy 111, take a left. We are about 1/2 mile on the left side.<br/><br/>
              <strong>Coming from Washington Street or Hwy 111:</strong> Go east on Hwy 111 until you pass Dillon Rd. We are about 1/2 mile past Dillon Rd on the left side.
            </p>
          </div>
          
          {/* Google Maps iFrame */}
          <div style={{ width: '100%', height: '500px', borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3311.23351502422!2d-116.1824706!3d33.6823336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80daf1f8f9024f03%3A0xc3f8e56230ba7c21!2sSeawright%20Custom%20Precast%2C%20Inc!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>

      </div>
    </div>
  );
}
