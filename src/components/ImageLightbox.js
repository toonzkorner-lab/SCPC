'use client';

import { useState } from 'react';
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

export default function ImageLightbox({ src, alt }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div 
        onClick={() => setOpen(true)}
        style={{ cursor: 'zoom-in', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <img 
          src={src} 
          alt={alt} 
          style={{ maxWidth: '100%', maxHeight: '75vh', objectFit: 'contain' }}
        />
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[{ src: src, alt: alt }]}
        plugins={[Zoom]}
      />
    </>
  );
}
