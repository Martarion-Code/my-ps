import React from 'react';

export default function rating() {
    return (
    <rating style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#fff' }}>
      <div style={{ maxWidth: '1000px', backgroundColor: '#fff', padding: '20px', fontFamily: 'Arial, sans-serif', color: '#000'}}>
          <h2>Beri rating untuk kami</h2>
          <p>Sampaikan pendapat anda</p>
  
          {/* Rating Section */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {[...Array(5)].map((_, index) => (
              <span key={index} style={{ fontSize: '30px', color: '#ccc' }}>★</span>
            ))}
            <a href="#" style={{ marginLeft: '10px', color: '#0070f3' }}>Tulis ulasan</a>
          </div>
  
          {/* Customers Reviews Summary */}
          <div style={{ marginTop: '20px' }}>
            <h3>Customers reviews</h3>
            <div style={{ fontSize: '24px', display: 'flex', alignItems: 'center' }}>
              <span>4.7</span>
              <div style={{ marginLeft: '10px', color: '#FFD700' }}>★★★★★</div>
              <span style={{ marginLeft: '10px', color: '#666' }}>1315 reviews</span>
            </div>
            <p style={{ color: '#666' }}>A Discount Toner Cartridge Is Better Than Ever And You Will Save 50 Or More</p>
  
            {/* Ratings Distribution */}
            <div style={{ marginTop: '10px' }}>
              {[
                { rating: 5, percent: 75, count: 982 },
                { rating: 4, percent: 16, count: 205 },
                { rating: 3, percent: 5, count: 65 },
                { rating: 2, percent: 1, count: 17 },
                { rating: 1, percent: 3, count: 46 },
              ].map((item) => (
                <div key={item.rating} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                  <span style={{ width: '20px' }}>{item.rating}</span>
                  <div style={{ flex: 1, backgroundColor: '#e0e0e0', height: '8px', margin: '0 10px' }}>
                    <div style={{ width: `${item.percent}%`, backgroundColor: '#4CAF50', height: '8px' }}></div>
                  </div>
                  <span style={{ width: '30px', textAlign: 'right' }}>{item.percent}%</span>
                  <span style={{ marginLeft: '10px', color: '#666' }}>{item.count}</span>
                </div>
              ))}
            </div>
          </div>
  
          {/* Testimonials */}
          <div style={{ marginTop: '30px' }}>
            <h3>Testimonials</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {[
                {
                  name: 'BAGAS KOPLING',
                  stars: 4,
                  review: '“Saya sangat terkesan dengan kualitas pelayan MyPS. Selain pilihan game-nya lengkap, customer service-nya juga ramah dan sangat membantu. Pasti akan merekomendasikan ke teman-teman!”',
                },
                {
                  name: 'SLAMET KARBU',
                  stars: 5,
                  review: '“Proses mudah, konsol tiba cepat, dan kondisi sangat bagus. Solusi terbaik untuk bermain game!”',
                },
                {
                  name: 'UDIN PETOT',
                  stars: 4,
                  review: '“Praktis dan hemat! Konsol tiba tepat waktu dan lengkap. Highly recommended!”',
                },
              ].map((testimonial, index) => (
                <div key={index} style={{ width: '30%', textAlign: 'center', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                  <div style={{ color: '#FFD700' }}>
                    {'★'.repeat(testimonial.stars)}{'☆'.repeat(5 - testimonial.stars)}
                  </div>
                  <p style={{ color: '#666', fontStyle: 'italic' }}>{testimonial.review}</p>
                  <strong>{testimonial.name}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </rating>
    );
  }
  

