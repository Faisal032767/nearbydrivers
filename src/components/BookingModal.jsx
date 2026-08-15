import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import styles from './BookingModal.module.css';

const PHONE_NUMBER = '7799667934';

const BookingModal = ({ isOpen, onClose, serviceName }) => {
  if (!isOpen) return null;

  // WhatsApp Redirect Handler
  const handleWhatsAppBooking = () => {
    const message = encodeURIComponent(
      `Hello! I want to book the following service:\n*${serviceName || 'Ride Service'}*`
    );
    window.open(`https://wa.me/91${PHONE_NUMBER}?text=${message}`, '_blank');
    onClose();
  };

  // Direct Call Handler
  const handleCallBooking = () => {
    window.location.href = `tel:+91${PHONE_NUMBER}`;
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button 
          className={styles.closeBtn} 
          onClick={onClose}
          aria-label="Close modal"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <h3 className={styles.modalTitle}>Complete Your Booking</h3>
        
        {serviceName && (
          <p className={styles.modalServiceText}>
            Selected Service:<br />
            <strong>{serviceName}</strong>
          </p>
        )}
        
        <p className={styles.modalSubtitle}>How would you like to connect with us?</p>

        <div className={styles.modalActions}>
          <button 
            className={`${styles.actionBtn} ${styles.callBtn}`} 
            onClick={handleCallBooking}
          >
            <FontAwesomeIcon icon={faPhone} />
            <span>Call Directly</span>
          </button>

          <button 
            className={`${styles.actionBtn} ${styles.whatsappBtn}`} 
            onClick={handleWhatsAppBooking}
          >
            <FontAwesomeIcon icon={faWhatsapp} />
            <span>Book via WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;