import styles from './Contact.module.css';

export const metadata = {
  title: 'Contact Us | SCPC Precast',
  description: 'Get in touch with SCPC Precast for a quote or custom precast concrete inquiries.',
};

export default function ContactPage() {
  return (
    <div className="section">
      <div className="container">
        <div className="text-center mb-8 fade-in-up">
          <h1>Contact Us</h1>
          <p>We look forward to working with you on your next project.</p>
        </div>
        
        <div className="grid-cols-2" style={{ gap: '4rem' }}>
          <div className="fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h2>Get In Touch</h2>
            <p><strong>Email:</strong> <a href="mailto:estimating@scpcinc.com">estimating@scpcinc.com</a></p>
            <div className="mt-4">
              <h3>Office Hours</h3>
              <p>Monday - Friday: 8:00 AM - 4:30 PM</p>
              <p>Saturday & Sunday: Closed</p>
            </div>
            
            <div className="mt-4">
              <h3>Connect With Us</h3>
              <p>
                <a href="https://www.youtube.com/user/PrecastConcreteCA/videos" target="_blank" rel="noreferrer" className="btn btn-accent" style={{ marginRight: '1rem', marginBottom: '1rem' }}>YouTube</a>
                <a href="https://www.linkedin.com/in/rex-seawright-144bb0a/" target="_blank" rel="noreferrer" className="btn btn-accent">LinkedIn</a>
              </p>
            </div>
          </div>
          
          <div className={`fade-in-up ${styles.formContainer}`} style={{ animationDelay: '0.4s' }}>
            <h2>Send a Request</h2>
            <p className="mb-4">Use your default email client to send us a direct inquiry.</p>
            
            <form action="mailto:estimating@scpcinc.com" method="GET" encType="text/plain" className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" name="subject" placeholder="Project Inquiry" required className={styles.input} />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="body">Message</label>
                <textarea id="body" name="body" rows="6" placeholder="Please describe your project or the products you are interested in..." required className={styles.input}></textarea>
              </div>
              
              <button type="submit" className="btn w-full">Open in Email Client</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
