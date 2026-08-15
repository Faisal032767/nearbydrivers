import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUserTie, 
  faCarSide, 
  faMapMarkedAlt, 
  faWineGlassAlt, 
  faParking, 
  faRoute,
  faArrowRight 
} from '@fortawesome/free-solid-svg-icons';
import styles from './ServicesGrid.module.css';

const SERVICES_DATA = [
  {
    id: 1,
    icon: faUserTie,
    title: 'Temporary Drivers',
    description: 'Professional hourly drivers for personal errands, shopping trips, or quick city commutes.',
    tag: 'Hourly Basis'
  },
  {
    id: 2,
    icon: faCarSide,
    title: 'Permanent Drivers',
    description: 'Dedicated monthly private drivers tailored for executives, families, and regular daily commutes.',
    tag: 'Monthly Plan'
  },
  {
    id: 3,
    icon: faMapMarkedAlt,
    title: 'Area-Wise Drivers & Rentals',
    description: 'Local expert drivers available in your specific neighborhood for seamless regional navigation.',
    tag: 'Local Specialist'
  },
  {
    id: 4,
    icon: faWineGlassAlt,
    title: 'Drunk & Drive Pickup',
    description: 'Safe, reliable late-night designated drivers to get you and your car home safely.',
    tag: '24/7 Safety'
  },
  {
    id: 5,
    icon: faParking,
    title: 'Valet Parking Drivers',
    description: 'Trained valet personnel for corporate events, weddings, private parties, and venues.',
    tag: 'Event Special'
  },
  {
    id: 6,
    icon: faRoute,
    title: 'Outstation Pickup & Drop',
    description: 'Experienced highway drivers for long-distance road trips and outstation travel.',
    tag: 'Long Distance'
  }
];

const ServicesGrid = () => {
  const handleCardClick = (title) => {
    alert(`Book Service: ${title}`);
  };

  return (
    <section className={styles.servicesSection}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <span className={styles.badge}>Our Offerings</span>
          <h2 className={styles.title}>Explore Our Driving Services</h2>
          <p className={styles.subtitle}>
            Choose from a wide range of professional driving and rental services tailored to your daily travel needs.
          </p>
        </div>

        {/* Cards Grid */}
        <div className={styles.grid}>
          {SERVICES_DATA.map((service) => (
            <div 
              key={service.id} 
              className={styles.card}
              onClick={() => handleCardClick(service.title)}
            >
              <div className={styles.cardHeader}>
                <div className={styles.iconBox}>
                  <FontAwesomeIcon icon={service.icon} className={styles.icon} />
                </div>
                <span className={styles.tag}>{service.tag}</span>
              </div>

              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDesc}>{service.description}</p>

              <div className={styles.cardFooter}>
                <span className={styles.actionText}>Learn More</span>
                <FontAwesomeIcon icon={faArrowRight} className={styles.arrowIcon} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;