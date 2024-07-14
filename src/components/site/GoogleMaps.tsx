import React from 'react';

interface GoogleMapsProps {
  src: string;
  height?: string;
}

const GoogleMaps: React.FC<GoogleMapsProps> = ({ src, height = '400px' }) => {
  return (
    <div style={{ height }}>
      <iframe
        src={src}
        width="100%"
        height={height}
        style={{ border: '0' , borderRadius: '24px'}}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Maps"
      ></iframe>
    </div>
  );
};

export default GoogleMaps;
