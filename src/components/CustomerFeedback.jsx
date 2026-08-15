import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import styles from './CustomerFeedback.module.css';

const REVIEWS = [
  {
    id: 1,
    name: 'Aarav S',
    role: 'Outstation Travel',
    rating: 5,
    comment:
      "I booked a driver for my parents' outstation trip, and everything was perfect. The driver was punctual, polite, and professional throughout the journey. Nearby Drivers made the whole process super easy—highly recommended!"
  },
  {
    id: 2,
    name: 'Harpreet Singh',
    role: 'Event & Family Ride',
    rating: 4,
    comment:
      'Needed a last-minute driver for a family wedding—and Nearby Drivers saved the day! The app is easy to use, and the support team was very responsive. Will definitely be using it again for future events.'
  },
  {
    id: 3,
    name: 'Sidhardh',
    role: 'Local City Rider',
    rating: 4,
    comment:
      'What stood out was how well-trained and respectful the driver was. It’s rare to find a service that combines professionalism with a personal touch. Nearby Drivers nailed it!'
  },
  {
    id: 4,
    name: 'Abhishek Kumar',
    role: 'Regular Customer',
    rating: 5,
    comment:
      'I’ve tried other driver booking platforms, but this one’s a game changer. Transparent pricing, friendly drivers, and no hidden charges. Nearby Drivers is now my go-to every time I need a ride.'
  }
];

const CustomerFeedback = () => {
  return (
    <section className={styles.feedbackSection}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>What Our Customers Say</h2>
          <p className={styles.subtitle}>
            Read real feedback from people who rely on Nearby Drivers for their everyday journeys.
          </p>
        </div>

        {/* Feedback Cards Grid */}
        <div className={styles.grid}>
          {REVIEWS.map((review) => (
            <div key={review.id} className={styles.card}>
              <FontAwesomeIcon icon={faQuoteLeft} className={styles.quoteIcon} />
              
              {/* Star Rating */}
              <div className={styles.ratingRow}>
                {[...Array(review.rating)].map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} className={styles.starIcon} />
                ))}
              </div>

              {/* Review Comment */}
              <p className={styles.comment}>"{review.comment}"</p>

              {/* Customer Author Info */}
              <div className={styles.authorInfo}>
                <div className={styles.avatar}>
                  {review.name.charAt(0)}
                </div>
                <div className={styles.authorDetails}>
                  <h4 className={styles.authorName}>{review.name}</h4>
                  <span className={styles.authorRole}>{review.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerFeedback;