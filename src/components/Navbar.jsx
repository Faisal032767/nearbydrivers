import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faIndianRupeeSign, 
  faConciergeBell, 
  faPhone 
} from '@fortawesome/free-solid-svg-icons';
import styles from './Navbar.module.css';
import logo from '../assets/logo.png'; // Adjust path if using public/logo.png

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        {/* Left Side: Logo */}
        <div className={styles.logo}>
          <a href="/">
            <img src={logo} alt="Company Logo" className={styles.logoImg} />
          </a>
        </div>

        {/* Right Side: Navigation Links */}
        <div className={styles.navMenu}>
          {/* Goes to CarFleetService section */}
          <a href="#car-fleet-service" className={styles.navLink}>
            <FontAwesomeIcon icon={faConciergeBell} className={styles.icon} />
            Services
          </a>

          {/* Goes to PlanSelection section */}
          <a href="#plan-selection" className={styles.navLink}>
            <FontAwesomeIcon icon={faIndianRupeeSign} className={styles.icon} />
            Rate
          </a>

          {/* Directly triggers phone call to 7799667934 */}
          <a href="tel:+917799667934" className={`${styles.navLink} ${styles.contactHighlighted}`}>
            <FontAwesomeIcon icon={faPhone} className={styles.contactIcon} />
            Contact Us
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;