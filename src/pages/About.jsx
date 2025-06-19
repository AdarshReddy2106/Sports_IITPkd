import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-wrapper">
        <div className="about-content">
          <div className="about-text">
            <h2 className="about-title">
              About Elite Sports <span className="accent">Council</span>
            </h2>
            <p className="about-paragraph">
              Founded in 2005, Elite Sports Council has been at the forefront of sports development and excellence. Our mission is to provide world-class facilities, expert coaching, and comprehensive programs that empower athletes to achieve their full potential.
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
          
          <div className="about-visual">
            <div className="visual-shapes">
              <div className="shape shape-1"></div>
              <div className="shape shape-2"></div>
              <div className="shape shape-3"></div>
            </div>
            <div className="visual-bg-shapes">
              <div className="bg-circle-1"></div>
              <div className="bg-circle-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
