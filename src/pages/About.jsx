import React from 'react';
import './About.css';
import '../../src/components/scroll.css'

const About = () => {
  return (
    <div className="about-container">
      <div className="about-wrapper">
        <div className="about-content">
          <div className="about-text">
            <h2 className="about-title">
              About Sports <span className="accent">Council</span>
            </h2>
            <p className="about-paragraph">
              Founded in 2005, Sports Council IIT Palakkad has been at the forefront of sports development and excellence. Our mission is to provide world-class facilities, expert coaching, and comprehensive programs that empower athletes to achieve their full potential.
            </p>
            <p className="about-paragraph">
              We believe in the transformative power of sports to build character, foster teamwork, and promote healthy lifestyles. Our dedicated team of professionals is committed to creating an inclusive environment where athletes of all ages and skill levels can thrive.
            </p>
            
            <div className="about-stats">
              <div className="stat-item">
                <div className="stat-number">15+</div>
                <div className="stat-label">Years of Excellence</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">50+</div>
                <div className="stat-label">Expert Coaches</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">10k+</div>
                <div className="stat-label">Athletes Trained</div>
              </div>
            </div>
          </div>
          

        </div>
      </div>
      <div className="logo-slider">
            <div className="logo-track">
              <img src="/Logos/1.png" alt="Logo 1" />
              <img src="/Logos/2.png" alt="Logo 2" />
              <img src="/Logos/3.png" alt="Logo 3" />
              <img src="/Logos/4.png" alt="Logo 4" />
              <img src="/Logos/5.png" alt="Logo 5" />
              <img src="/Logos/6.png" alt="Logo 6" />
              <img src="/Logos/7.png" alt="Logo 7" />
              <img src="/Logos/8.png" alt="Logo 8" />
              <img src="/Logos/9.png" alt="Logo 9" />
              <img src="/Logos/10.png" alt="Logo 10" />

              <img src="/Logos/1.png" alt="Logo 1" />
              <img src="/Logos/2.png" alt="Logo 2" />
              <img src="/Logos/3.png" alt="Logo 3" />
              <img src="/Logos/4.png" alt="Logo 4" />
              <img src="/Logos/5.png" alt="Logo 5" />
              <img src="/Logos/6.png" alt="Logo 6" />
              <img src="/Logos/7.png" alt="Logo 7" />
              <img src="/Logos/8.png" alt="Logo 8" />
              <img src="/Logos/9.png" alt="Logo 9" />
              <img src="/Logos/10.png" alt="Logo 10" />
            </div>
          </div>
    </div>
  );
};

export default About;
