import React from 'react';
import Navbar from './Navbar';
import RideLocation from './RideLocation';
import styles from './Hero.module.css';
import heroVideo from '../assets/hero-animation.mp4'; // Adjust path if in public/
import SearchServices from './SearchServices';

const Hero = () => {
  return (
    <div className={styles.heroContainer}>
      {/* Background Animated Video */}
      <video 
        className={styles.bgVideo} 
        autoPlay 
        loop 
        muted 
        playsInline
      >
        <source src={heroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Tint Overlay */}
      <div className={styles.videoOverlay}></div>

      {/* Top Glassmorphism Navbar */}
      <div className={styles.navWrapper}>
        <Navbar />
         <RideLocation />
         <SearchServices/>
      </div>

      {/* Centered Hero Content with Ride Location Form */}
      <div className={styles.heroContent}>
        <div className={styles.headerText}>
          <h1 className={styles.title}>
            {/* Your Ride, Delivered Instantly */}
            Your Journey, Just <span>nearby</span>
          </h1>
          <p className={styles.subtitle}>
            Book trusted drivers, valet services, and rental cars in just a few clicks.
            {/* Where Destination Meets Comfort. */}
          </p>
        </div>

        {/* RideLocation placed directly under Navbar inside Hero */}
        
       
      </div>
    </div>
  );
};

export default Hero;