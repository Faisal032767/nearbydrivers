import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import BookingModal from './BookingModal';
import styles from './SearchServices.module.css';

const SERVICES = [
  'Temporary Drivers: Available on an hourly basis',
  'Permanent Drivers: Available on a monthly basis',
  'Area-Wise Drivers & Rental Cars',
  'Valet Parking Drivers',
  'Outstation Pickup & Drop',
  'Drunk & Drive Pickup & Drop'
];

const SearchServices = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredServices = SERVICES.filter((service) =>
    service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectService = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
    setSearchTerm('');
    setIsDropdownOpen(false);
  };

  return (
    <section className={styles.searchSection}>
      <div className={styles.container}>
        <div className={styles.leftContent}>
          <h2 className={styles.heading}>Find Your Driving Service</h2>
        </div>

        <div className={styles.rightContent}>
          <div className={styles.searchWrapper} ref={searchRef}>
            <div className={styles.inputBox}>
              <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setIsDropdownOpen(true);
                }}
                onFocus={() => setIsDropdownOpen(true)}
                className={styles.searchInput}
              />
            </div>

            {isDropdownOpen && (
              <ul className={styles.dropdownList}>
                {filteredServices.length > 0 ? (
                  filteredServices.map((service, index) => {
                    const [title, description] = service.split(': ');
                    return (
                      <li
                        key={index}
                        className={styles.dropdownItem}
                        onClick={() => handleSelectService(service)}
                      >
                        <div className={styles.itemText}>
                          <span className={styles.itemTitle}>{title}</span>
                          {description && (
                            <span className={styles.itemDesc}>{description}</span>
                          )}
                        </div>
                        <FontAwesomeIcon icon={faChevronRight} className={styles.arrowIcon} />
                      </li>
                    );
                  })
                ) : (
                  <li className={styles.noResult}>No matching services found</li>
                )}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Reusable Booking Modal Component */}
      <BookingModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceName={selectedService}
      />
    </section>
  );
};

export default SearchServices;