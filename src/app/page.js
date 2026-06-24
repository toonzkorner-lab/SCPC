import Link from 'next/link';
import Image from 'next/image';
import { getCategories } from '../lib/db';
import ProductCard from '../components/ProductCard';
import FadeIn from '../components/FadeIn';

export const metadata = {
  title: 'Precastbyscpcinc.com - Best prices anywhere!',
  description: 'Providing high-quality, custom precast concrete products for architects, contractors, and landscapers in Coachella, California, surrounding states, and nationwide for large projects.',
  openGraph: {
    title: 'Home | SCPC Precast',
    description: 'Providing high-quality, custom precast concrete products for architects, contractors, and landscapers in Coachella, California, surrounding states, and nationwide for large projects.',
    url: 'https://precastbyscpcinc.com/',
  }
};

export default async function Home() {
  const categories = await getCategories();
  const featuredCategories = categories.slice(0, 14); // Original site had many links

  const sliderImages = [
    'Fire-pit-new-150x150.jpg',
    'Entry-elevation.--150x150.jpg',
    'IMG_4770-150x150.jpg',
    'Firepit-Pic-150x150.jpg',
    'Fountain-5-150x150.jpeg',
    'E4-150x150.jpg',
    'Coppock-FP3-150x150.jpg',
    'Blue-flower-pot-c1-150x150.jpg',
    'IMG_0014-150x150.jpg',
    '595-150x150.jpg',
    '594-150x150.jpg',
    'PS-columns-2--150x150.jpg',
    'IMG_5236-150x150.jpg',
    'IMG_5231-150x150.jpg',
    'Base-Molding--150x150.jpg',
    'window-sills-150x150.jpg',
    'Planter-Bowl-150x150.jpg',
    'Column-12-150x150.jpeg'
  ];

  return (
    <div>
      {/* Top Header Address Block */}
      <section style={{ backgroundColor: '#f9f9f9', padding: '2rem 0', textAlign: 'center', borderBottom: '1px solid #ddd' }}>
        <div className="container">
           <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: 0, color: '#333' }}>
             Seawright Custom Precast, Inc. &nbsp;
             <span style={{ fontWeight: 'normal' }}>85610 Grapefruit Blvd. Coachella, CA 92236</span> &nbsp;
             <a href="mailto:Sales@scpcinc.com" style={{ color: '#1e73be' }}>Sales@scpcinc.com</a> &nbsp;
             760-398-1515
           </h2>
        </div>
      </section>

      {/* Image Carousel Mockup */}
      <section style={{ padding: '2rem 0', overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
           {sliderImages.map((img, i) => (
              <img key={i} src={`/images/${img}`} alt="Precast Product" style={{ height: '150px', width: '150px', objectFit: 'cover', flexShrink: 0 }} />
           ))}
        </div>
      </section>

      {/* Video and Made in America Section */}
      <section className="section">
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center' }}>
          <div style={{ flex: '1', minWidth: '300px', display: 'flex', justifyContent: 'center' }}>
            <iframe width="100%" height="315" src="https://www.youtube.com/embed/j77Klfhb1hI" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </div>
          <div style={{ flex: '1', minWidth: '300px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src="/images/Free-unsplash-american-flag-300x201.jpg" alt="Made in America" style={{ maxWidth: '200px' }} />
            <h1 style={{ marginTop: '1rem', color: '#333', fontSize: '2.5rem' }}>Made in America</h1>
          </div>
        </div>
      </section>

      {/* Headline */}
      <section style={{ padding: '3rem 0', textAlign: 'center', backgroundColor: '#fdfdfd' }}>
        <div className="container">
          <h2 style={{ fontSize: '2rem', color: '#333' }}>
            The Best Quality from Custom Seawright Concrete at <span style={{ color: '#1e73be', textDecoration: 'underline' }}>Amazing</span> Prices!
          </h2>
        </div>
      </section>

      {/* Our most popular Precast Concrete Products */}
      <section className="section" style={{ padding: '3rem 0' }}>
        <div className="container text-center">
          <h2 style={{ color: '#333', marginBottom: '2rem' }}>Our most popular Precast Concrete Products</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
             {featuredCategories.map((cat) => (
                <Link key={cat.id} href={`/products/${cat.slug}`} style={{ padding: '0.5rem 1rem', border: '1px solid #1e73be', borderRadius: '4px', color: '#1e73be', textDecoration: 'none', fontWeight: 'bold' }}>
                  {cat.name}
                </Link>
             ))}
          </div>
        </div>
      </section>

      {/* Flip Boxes / Why Use Precast Placeholder */}
      <section style={{ backgroundColor: '#1e73be', color: 'white', padding: '4rem 0' }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center', textAlign: 'center' }}>
          <div style={{ flex: '1', minWidth: '200px' }}>
            <img src="/images/Daves-bowl-2-150x150.jpg" alt="Versatile" style={{ borderRadius: '50%', marginBottom: '1rem' }} />
            <h3 style={{ color: 'white' }}>Why use Precast Concrete?</h3>
            <p style={{ fontWeight: 'bold' }}>It's Versatile</p>
          </div>
          <div style={{ flex: '1', minWidth: '200px' }}>
            <img src="/images/Johnson-Entry-225x300.jpg" alt="Resilient" style={{ borderRadius: '50%', marginBottom: '1rem', height: '150px', width: '150px', objectFit: 'cover' }} />
            <h3 style={{ color: 'white' }}>Why use Precast Concrete?</h3>
            <p style={{ fontWeight: 'bold' }}>Resilient</p>
          </div>
          <div style={{ flex: '1', minWidth: '200px' }}>
            <img src="/images/Pier-cap-150x150.jpeg" alt="Sustainable" style={{ borderRadius: '50%', marginBottom: '1rem' }} />
            <h3 style={{ color: 'white' }}>Why use Precast Concrete?</h3>
            <p style={{ fontWeight: 'bold' }}>Sustainable</p>
          </div>
          <div style={{ flex: '1', minWidth: '200px' }}>
            <img src="/images/main-pic-1-150x150.jpg" alt="Affordable" style={{ borderRadius: '50%', marginBottom: '1rem' }} />
            <h3 style={{ color: 'white' }}>Why use Precast Concrete?</h3>
            <p style={{ fontWeight: 'bold' }}>Affordable</p>
          </div>
        </div>
      </section>

      {/* Text Sections */}
      <section className="section" style={{ padding: '4rem 0' }}>
        <div className="container grid-cols-2">
          <FadeIn direction="right">
            <h2 style={{ color: '#333' }}>What is precast concrete?</h2>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>It simply is the use of concrete that is put into molds to create a product that can make an ordinary house into something spectacular. It can even be used in your landscaping as with concrete bowls for flowers, gas fire pits, or even water features for your pool.</p>

            <h2 style={{ color: '#333', marginTop: '2rem' }}>Precast concrete</h2>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>…is generally known as a construction product made by casting concrete into reusable molds. This use of molds “forms” the concrete, which is cured in a controlled process, and then it can be transported to the work site for application to the project.</p>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>The concrete finished product must meet standards that are maintained in the architectural community. In addition, this product can be colored, stained, or made to look like other products altogether. This latter fact makes it a preferred product to use by the DIY groups all the way to high-end architectural firms. You can even mix rock or “fine aggregate” into the mixture to produce, yet again, a unique and custom product.</p>
          </FadeIn>
          <FadeIn direction="left">
            <h2 style={{ color: '#333' }}>How can I use precast to enhance our project if we have a smaller budget for architectural design?</h2>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>Value engineering can be more efficient and cost effective if done in the early design stage before going to print. We can assist with that.</p>

            <h2 style={{ color: '#333', marginTop: '2rem' }}>In house services:</h2>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>Seawright Custom Precast, Inc. is a full service precaster. Our mold shop is large enough to handle any architectural project we have seen in the last twenty years. SCPC estimates all of our projects with a breakout of each piece required to complete your project. Value engineering can be done at this stage if you need assistance.</p>
            
            <h2 style={{ color: '#333', marginTop: '2rem' }}>Basic Installations not requiring attachments:</h2>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>Installation of low lying precast does not necessarily require mechanical attachments unless required by the owner. Low lying areas usually would be wall caps, pier caps, pool coping, and windowsills (with a ledge underneath). Window trims, on the first floor, and the upright legs of door surrounds can be installed without mechanical attachments.</p>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}

