import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMapMarkerAlt, 
  faCalendarAlt, 
  faClock, 
  faArrowRight,
  faExclamationCircle,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import BookingModal from './BookingModal';
import styles from './RideLocation.module.css';

const RideLocation = () => {
  const [formData, setFormData] = useState({
    fromLocation: '',
    toLocation: '',
    rideDate: '',
    rideTime: ''
  });

  // Toast & Modal States
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingSummary, setBookingSummary] = useState('');

  // Time Picker State
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [tempHour, setTempHour] = useState('01');
  const [tempMinute, setTempMinute] = useState('30');
  const [tempSecond, setTempSecond] = useState('00');
  const [tempAmpm, setTempAmpm] = useState('PM');

  const hiddenDateRef = useRef(null);
  const dateWrapperRef = useRef(null);
  const timeWrapperRef = useRef(null);

  // Close time picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (timeWrapperRef.current && !timeWrapperRef.current.contains(event.target)) {
        setShowTimePicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Trigger Toast Notification
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    // Auto hide after 3.5 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 3500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Format date cleanly (e.g. Aug 15, 2026)
  const handleDateChange = (e) => {
    const rawDate = e.target.value;
    if (rawDate) {
      const [year, month, day] = rawDate.split('-');
      const dateObj = new Date(year, month - 1, day);
      const formattedDate = dateObj.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
      setFormData((prev) => ({ ...prev, rideDate: formattedDate }));
    }
  };

  const handleOpenDatePicker = (e) => {
    e.stopPropagation();
    if (hiddenDateRef.current) {
      try {
        if ('showPicker' in HTMLInputElement.prototype) {
          hiddenDateRef.current.showPicker();
        } else {
          hiddenDateRef.current.focus();
          hiddenDateRef.current.click();
        }
      } catch (err) {
        hiddenDateRef.current.click();
      }
    }
  };

  const handleToggleTimePicker = () => {
    setShowTimePicker((prev) => !prev);
  };

  const handleConfirmTime = (e) => {
    e.stopPropagation();
    const formatted = `${tempHour}:${tempMinute} ${tempAmpm}`;
    setFormData((prev) => ({ ...prev, rideTime: formatted }));
    setShowTimePicker(false);
  };

  const handleCancelTime = (e) => {
    e.stopPropagation();
    setShowTimePicker(false);
  };

  // Form Submission & Validation Logic
  const handleSearch = (e) => {
    e.preventDefault();

    // Validate that ALL fields are filled
    if (!formData.fromLocation.trim()) {
      triggerToast('Please enter a pickup location!');
      return;
    }
    if (!formData.toLocation.trim()) {
      triggerToast('Please enter a drop location!');
      return;
    }
    if (!formData.rideDate.trim()) {
      triggerToast('Please select a ride date!');
      return;
    }
    if (!formData.rideTime.trim()) {
      triggerToast('Please select a ride time!');
      return;
    }

    // Build booking summary string for WhatsApp/Call modal
    const summary = `Ride Booking Request:
• Pickup Location: ${formData.fromLocation}
• Drop Location: ${formData.toLocation}
• Date: ${formData.rideDate}
• Time: ${formData.rideTime}`;

    setBookingSummary(summary);
    setIsModalOpen(true);
  };

  const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));
  const seconds = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

  return (
    <section className={styles.rideSection}>
      {/* Floating Error Toast Notification */}
      {showToast && (
        <div className={styles.toastContainer}>
          <FontAwesomeIcon icon={faExclamationCircle} className={styles.toastIcon} />
          <span className={styles.toastText}>{toastMessage}</span>
          <button className={styles.toastClose} onClick={() => setShowToast(false)}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      )}

      <form className={styles.container} onSubmit={handleSearch}>
        {/* From Location */}
        <div className={styles.inputGroup}>
          <div className={styles.inputWrapper}>
            <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.icon} />
            <input
              type="text"
              name="fromLocation"
              placeholder="Enter pickup location"
              value={formData.fromLocation}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
        </div>

        {/* To Location */}
        <div className={styles.inputGroup}>
          <div className={styles.inputWrapper}>
            <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.icon} />
            <input
              type="text"
              name="toLocation"
              placeholder="Enter drop location"
              value={formData.toLocation}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
        </div>

        {/* Date Input */}
        <div className={styles.inputGroup}>
          <div 
            className={styles.inputWrapper} 
            ref={dateWrapperRef}
            onClick={handleOpenDatePicker}
            style={{ position: 'relative', cursor: 'pointer' }}
          >
            <FontAwesomeIcon icon={faCalendarAlt} className={styles.icon} />
            <input
              type="text"
              placeholder="Select date"
              value={formData.rideDate}
              readOnly
              className={styles.input}
            />
            <input
              type="date"
              ref={hiddenDateRef}
              name="rideDate"
              onChange={handleDateChange}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0,
                cursor: 'pointer'
              }}
            />
          </div>
        </div>

        {/* Custom Wheel Time Picker */}
        <div className={styles.inputGroup}>
          <div 
            className={styles.inputWrapper} 
            ref={timeWrapperRef}
            onClick={handleToggleTimePicker}
          >
            <FontAwesomeIcon icon={faClock} className={styles.icon} />
            <input
              type="text"
              placeholder="Select time"
              value={formData.rideTime}
              readOnly
              className={styles.input}
            />

            {/* Bright Wheel Popup Modal */}
            {showTimePicker && (
              <div className={styles.wheelModal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.wheelColumns}>
                  {/* Hours */}
                  <div className={styles.wheelColumn}>
                    {hours.map((h) => (
                      <div
                        key={h}
                        className={`${styles.wheelItem} ${tempHour === h ? styles.activeItem : ''}`}
                        onClick={() => setTempHour(h)}
                      >
                        {parseInt(h, 10)}
                      </div>
                    ))}
                  </div>

                  {/* Minutes */}
                  <div className={styles.wheelColumn}>
                    {minutes.map((m) => (
                      <div
                        key={m}
                        className={`${styles.wheelItem} ${tempMinute === m ? styles.activeItem : ''}`}
                        onClick={() => setTempMinute(m)}
                      >
                        {m}
                      </div>
                    ))}
                  </div>

                  {/* Seconds */}
                  <div className={styles.wheelColumn}>
                    {seconds.map((s) => (
                      <div
                        key={s}
                        className={`${styles.wheelItem} ${tempSecond === s ? styles.activeItem : ''}`}
                        onClick={() => setTempSecond(s)}
                      >
                        {s}
                      </div>
                    ))}
                  </div>

                  {/* AM/PM */}
                  <div className={styles.wheelColumn}>
                    {['AM', 'PM'].map((p) => (
                      <div
                        key={p}
                        className={`${styles.wheelItem} ${tempAmpm === p ? styles.activeItem : ''}`}
                        onClick={() => setTempAmpm(p)}
                      >
                        {p}
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.wheelActions}>
                  <button type="button" className={styles.cancelBtn} onClick={handleCancelTime}>
                    CANCEL
                  </button>
                  <button type="button" className={styles.okBtn} onClick={handleConfirmTime}>
                    OK
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Search Driver Button */}
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.searchBtn}>
            <span>Search Driver</span>
            <FontAwesomeIcon icon={faArrowRight} className={styles.btnIcon} />
          </button>
        </div>
      </form>

      {/* Reusable Booking Modal */}
      <BookingModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceName={bookingSummary}
      />
    </section>
  );
};

export default RideLocation;