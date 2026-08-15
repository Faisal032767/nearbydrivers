import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPhone, 
  faEnvelope, 
  faMapMarkerAlt, 
  faStar, 
  faExternalLinkAlt,
  faCopyright,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import { 
  faWhatsapp, 
  faInstagram, 
  faYoutube, 
  faFacebook, 
  faXTwitter 
} from '@fortawesome/free-brands-svg-icons';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footerSection}>
      <div className={styles.container}>
        <div className={styles.grid}>
          
          {/* Column 1: About Nearby Drivers & Social Media Links */}
          <div className={styles.col}>
            <h3 className={styles.brandTitle}>Nearby Drivers</h3>
            <p className={styles.aboutText}>
              Nearby Drivers connects you with professional drivers for safe, reliable, 
              and comfortable travel anytime in your city.
            </p>

            <h4 className={styles.socialHeading}>Connect With Us</h4>
            <div className={styles.socialRow}>
              <a 
                href="https://wa.me/7799667934" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`${styles.socialIcon} ${styles.whatsapp}`}
                aria-label="WhatsApp"
              >
                <FontAwesomeIcon icon={faWhatsapp} />
              </a>
              <a 
                href="https://www.instagram.com/nearby_driver_service_?igsh=ZGJpcWp1ZGRhZXo5" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`${styles.socialIcon} ${styles.instagram}`}
                aria-label="Instagram"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a 
                href="https://www.youtube.com/@Nearbydriverservice" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`${styles.socialIcon} ${styles.youtube}`}
                aria-label="YouTube"
              >
                <FontAwesomeIcon icon={faYoutube} />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`${styles.socialIcon} ${styles.facebook}`}
                aria-label="Facebook"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`${styles.socialIcon} ${styles.twitter}`}
                aria-label="X (Twitter)"
              >
                <FontAwesomeIcon icon={faXTwitter} />
              </a>
            </div>
          </div>

          {/* Column 2: Our Location & Google Maps Embed */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Our Location</h4>
            <ul className={styles.contactList}>
              <li>
                <FontAwesomeIcon icon={faPhone} className={styles.icon} />
                <a href="tel:+917799667934" className={styles.contactLink}>
                  +91 7799667934
                </a>
              </li>
              <li>
                <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
                <a href="mailto:nearbydrivers@gmail.com" className={styles.contactLink}>
                  nearbydrivers@gmail.com
                </a>
              </li>
              <li>
                <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.icon} />
                <a 
                  href="https://maps.app.goo.gl/C7feM9wq41Z6aiEB8" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.contactLink}
                >
                  Hyderabad, India <FontAwesomeIcon icon={faExternalLinkAlt} className={styles.extIcon} />
                </a>
              </li>
            </ul>

            {/* Embedded Google Map */}
            <div className={styles.mapContainer}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15229.815566734713!2d78.496446!3d17.389992!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb996afe90e603%3A0x184a082471fcbf65!2snearby%20driver%20service!5e0!3m2!1sen!2sin!4v1786623235144!5m2!1sen!2sin" 
                className={styles.mapIframe}
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="strict-origin-when-cross-origin"
                title="Nearby Driver Service Location"
              ></iframe>
            </div>
          </div>

          {/* Column 3: Feedback & Google Review CTA */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Feedback</h4>
            <p className={styles.feedbackHeading}>Your Feedback Drives Us Forward!</p>
            <p className={styles.feedbackText}>
              Thank you for choosing Nearby Driver Services. If you were happy with our service, 
              we would truly appreciate a moment of your time to leave us a 5-star Google Review.
            </p>

            <a 
              href="https://g.page/r/CWW__HEkCEoYEBE/review" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.reviewBtn}
            >
              <div className={styles.starsWrap}>
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
              </div>
              <span>Leave a 5-Star Review</span>
            </a>
          </div>

        </div>

        {/* Bottom Bar Copyright */}
        <div className={styles.bottomBar}>
          <p className={styles.copyrightText}>
            <FontAwesomeIcon icon={faCopyright} className={styles.copyIcon} /> 2026 Md Faisal Alam ·{' '}
            <a 
              href="https://faisal-myportfolio.netlify.app/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.connectLink}
            >
              Connect with me <FontAwesomeIcon icon={faArrowRight} className={styles.arrowIcon} />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;