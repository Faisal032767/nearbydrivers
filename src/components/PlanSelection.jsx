import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faClock, faUserShield, faRoute, faBus } from '@fortawesome/free-solid-svg-icons';
import BookingModal from './BookingModal';
import styles from './PlanSelection.module.css';

const PLAN_CATEGORIES = [
  {
    category: "City Local Packages",
    plans: [
      {
        id: "local-4hr",
        title: "City Local (4 Hours)",
        subtitle: "Short local trips & errands",
        price: "₹600",
        unit: "/ 4 hrs",
        extraInfo: "₹100 per extra hr",
        icon: faClock,
        features: [
          "Covered up to 4 hours",
          "₹100/hr for additional time",
          "Verified local driver",
          "Ideal for shopping or short visits"
        ]
      },
      {
        id: "local-12hr",
        title: "City Local (12 Hours)",
        subtitle: "Full day city travel",
        price: "₹1,400",
        unit: "/ 12 hrs",
        icon: faClock,
        popular: true,
        features: [
          "Complete 12-hour driver duty",
          "City-wide pickup & drop",
          "Professional & punctual",
          "Best for full-day city errands"
        ]
      }
    ]
  },
  {
    category: "Monthly Permanent Duty",
    plans: [
      {
        id: "monthly-8hr",
        title: "8 Hours Duty (26 Days)",
        subtitle: "Standard monthly driver service",
        price: "₹24,000",
        unit: "/ month",
        icon: faUserShield,
        features: [
          "8 Hours daily duty",
          "26 Days duty per month",
          "Background verified driver",
          "Hassle-free driver replacement"
        ]
      },
      {
        id: "monthly-12hr",
        title: "12 Hours Duty (26 Days)",
        subtitle: "Extended monthly driver service",
        price: "₹30,000",
        unit: "/ month",
        icon: faUserShield,
        popular: true,
        features: [
          "12 Hours daily duty",
          "26 Days duty per month",
          "Dedicated personal driver",
          "Suitable for long daily commutes"
        ]
      }
    ]
  },
  {
    category: "Outstation Charges",
    plans: [
      {
        id: "outstation-driver",
        title: "Outstation Driver",
        subtitle: "Highway & long distance travel",
        price: "₹1,800",
        unit: "/ day",
        icon: faRoute,
        features: [
          "Experienced highway driver",
          "Safe long-distance travel",
          "One-way or round trip",
          "Night travel assistance"
        ]
      },
      {
        id: "outstation-bus",
        title: "Outstation Bus Charge",
        subtitle: "Specialized bus trip driver",
        price: "₹1,500",
        unit: "/ trip",
        extraInfo: "Separate charge per trip",
        icon: faBus,
        features: [
          "Heavy vehicle / bus driver",
          "Separate charge per trip",
          "Professional group travel driver",
          "Inter-state & outstation trips"
        ]
      }
    ]
  }
];

const PlanSelection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlanTitle, setSelectedPlanTitle] = useState('');

  const handleSelectPlan = (title, price) => {
    setSelectedPlanTitle(`${title} (${price})`);
    setIsModalOpen(true);
  };

  return (
<section id="plan-selection" className={styles.planSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Driver Charges & Tariff Plans</h2>
          <p className={styles.subtitle}>
            Transparent pricing for city trips, monthly duty, and outstation journeys.
          </p>
        </div>

        {PLAN_CATEGORIES.map((cat, catIdx) => (
          <div key={catIdx} className={styles.categoryBlock}>
            <h3 className={styles.categoryTitle}>{cat.category}</h3>
            
            <div className={styles.grid}>
              {cat.plans.map((plan) => (
                <div 
                  key={plan.id} 
                  className={`${styles.card} ${plan.popular ? styles.popularCard : ''}`}
                >
                  {plan.popular && <span className={styles.popularBadge}>Popular</span>}

                  <div className={styles.cardHeader}>
                    <div className={styles.iconCircle}>
                      <FontAwesomeIcon icon={plan.icon} />
                    </div>
                    <h4 className={styles.planTitle}>{plan.title}</h4>
                    <p className={styles.planSubtitle}>{plan.subtitle}</p>
                  </div>

                  <div className={styles.priceContainer}>
                    <div className={styles.priceWrap}>
                      <span className={styles.price}>{plan.price}</span>
                      <span className={styles.unit}>{plan.unit}</span>
                    </div>
                    {plan.extraInfo && (
                      <span className={styles.extraTag}>{plan.extraInfo}</span>
                    )}
                  </div>

                  <ul className={styles.featureList}>
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className={styles.featureItem}>
                        <FontAwesomeIcon icon={faCheck} className={styles.checkIcon} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    className={styles.bookPlanBtn}
                    onClick={() => handleSelectPlan(plan.title, plan.price)}
                  >
                    Book This Plan
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Reusable Booking Modal */}
      <BookingModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceName={selectedPlanTitle}
      />
    </section>
  );
};

export default PlanSelection;