import Image from 'next/image';
import React from 'react';

export default function Footer(){
  return (
    <footer style={{ backgroundColor: '#f5f5f5', padding: '20px', fontFamily: 'Arial, sans-serif', color: '#000' }}>
      <div style={{ maxWidth: '1000px', margin: 'auto', display: 'flex', alignItems: 'flex-start' }}>
        
        {/* Logo and Tagline */}
        <div style={{ flex: 1 }}>
        <Image 
                                src="/assets/images/logo.png" 
                                alt="Logo" // Tambahkan alt untuk aksesibilitas
                                width={150} // Tentukan lebar gambar
                                height={50} // Tentukan tinggi gambar
                            />
          <p style={{ marginTop: '10px' }}>MyPS, Bawa Keseruan Game ke Rumahmu</p>
        </div>

        

        {/* Information Links */}
        <div style={{ flex: 1 }}>
          <h4>Information</h4>
          <p><a href="#" style={{ color: '#000', textDecoration: 'none' }}>Home</a></p>
          <p><a href="#" style={{ color: '#000', textDecoration: 'none' }}>Terms and Conditions</a></p>
          <p><a href="#" style={{ color: '#000', textDecoration: 'none' }}>Privacy policy</a></p>
          <p><a href="#" style={{ color: '#000', textDecoration: 'none' }}>About MYPS</a></p>
        </div>
      </div>

      {/* Bottom Row */}
      <div style={{ maxWidth: '1000px', margin: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', fontSize: '14px', color: '#666' }}>
        <div>
          <span style={{ display: 'inline-flex', alignItems: 'center' }}>
            <span style={{ marginRight: '5px' }}>🌐</span> English
          </span>
        </div>
        <p>Copyright © MYPS 2024. All rights reserved.</p>
      </div>
    </footer>
  );
}
