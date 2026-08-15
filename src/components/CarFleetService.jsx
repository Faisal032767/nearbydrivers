import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCar, faTaxi, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import BookingModal from './BookingModal';
import styles from './CarFleetService.module.css';

const FLEET_SERVICES = [
  {
    id: 'valet-service',
    title: 'Valet Service',
    price: '₹1,200',
    unit: '/ 6 hrs',
    extraInfo: '6 Hours Package',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80',
    icon: faShieldAlt,
    features: [
      'Professional Valet Driver',
      'Event & Party Parking Management',
      'Punctual & Uniformed Staff',
      'Complete Vehicle Care'
    ]
  },
  {
    id: 'maruti-dzire',
    title: 'Maruti Suzuki Dzire',
    price: '₹14',
    unit: '/ km',
    extraInfo: 'Sedan Category',
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=600&q=80',
    icon: faCar,
    features: [
      '4 Passengers + 1 Driver',
      'AC Sedan Car',
      'Clean & Hygienic Interior',
      'Best for City & Outstation'
    ]
  },
  {
    id: 'toyota-innova',
    title: 'Toyota Innova',
    price: '₹18',
    unit: '/ km',
    extraInfo: 'SUV / MUV Category',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80',
    icon: faTaxi,
    popular: true,
    features: [
      '6 to 7 Seater Capacity',
      'Spacious Boot Space',
      'Dual Air Conditioning',
      'Comfortable Highway Rides'
    ]
  },
  {
    id: 'innova-crysta',
    title: 'Toyota Innova Crysta',
    price: '₹20',
    unit: '/ km',
    extraInfo: 'Premium SUV',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80',
    icon: faCar,
    features: [
      'Luxury Captain Seats',
      'Premium Interiors',
      'Smooth Highway Performance',
      'Top Choice for Long Trips'
    ]
  }
];

const CarFleetService = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServiceTitle, setSelectedServiceTitle] = useState('');

  const handleBookService = (title, price, unit) => {
    setSelectedServiceTitle(`${title} (${price}${unit})`);
    setIsModalOpen(true);
  };

  return (
    <section id="car-fleet-service" className={styles.fleetSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Valet & Vehicle Rental Fleet</h2>
          <p className={styles.subtitle}>
            Choose from our premium rental cars per kilometer or hire our dedicated valet drivers.
          </p>
        </div>

        <div className={styles.grid}>
          {FLEET_SERVICES.map((item) => (
            <div 
              key={item.id} 
              className={`${styles.card} ${item.popular ? styles.popularCard : ''}`}
            >
              {item.popular && <span className={styles.popularBadge}>Most Popular</span>}

              {/* Card Header Image */}
              <div className={styles.imageWrapper}>
                <img src={item.image} alt={item.title} className={styles.cardImg} />
                <div className={styles.imageOverlay}></div>
              </div>

              {/* Card Body */}
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{item.title}</h3>

                <div className={styles.priceContainer}>
                  <div className={styles.priceWrap}>
                    <span className={styles.price}>{item.price}</span>
                    <span className={styles.unit}>{item.unit}</span>
                  </div>
                  {item.extraInfo && (
                    <span className={styles.extraTag}>{item.extraInfo}</span>
                  )}
                </div>

                <ul className={styles.featureList}>
                  {item.features.map((feature, idx) => (
                    <li key={idx} className={styles.featureItem}>
                      <FontAwesomeIcon icon={faCheck} className={styles.checkIcon} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  className={styles.bookBtn}
                  onClick={() => handleBookService(item.title, item.price, item.unit)}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reusable Booking Modal */}
      <BookingModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceName={selectedServiceTitle}
      />
    </section>
  );
};

export default CarFleetService;