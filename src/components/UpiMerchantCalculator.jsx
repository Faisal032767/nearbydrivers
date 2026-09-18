import React, { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalculator, 
  faIndianRupeeSign, 
  faCircleCheck, 
  faShieldHalved, 
  faCoins,
  faQrcode,
  faPenToSquare
} from '@fortawesome/free-solid-svg-icons';
import styles from './UpiMerchantCalculator.module.css';

export default function UpiMerchantCalculator() {
  const [basePrice, setBasePrice] = useState(2050);
  const [upiId, setUpiId] = useState('nearbydrivers@okhdfcbank');
  const [merchantName, setMerchantName] = useState('Nearby Drivers');
  const [showConfig, setShowConfig] = useState(false);

  const presets = [1500, 2000, 2050, 3000, 5000, 10000];

  const result = useMemo(() => {
    const originalAmount = Math.max(0, Number(basePrice) || 0);

    if (originalAmount <= 2000) {
      return {
        originalAmount,
        feeAdded: 0,
        finalCustomerBill: originalAmount,
        isFree: true,
        isCapped: false
      };
    }

    let calculatedFee = originalAmount * 0.004;
    let isCapped = false;

    if (calculatedFee > 300) {
      calculatedFee = 300;
      isCapped = true;
    }

    const finalCustomerBill = originalAmount + calculatedFee;

    return {
      originalAmount,
      feeAdded: calculatedFee,
      finalCustomerBill,
      isFree: false,
      isCapped
    };
  }, [basePrice]);

  // Standard NPCI UPI URI string
  const upiUri = useMemo(() => {
    const formattedAmount = result.finalCustomerBill.toFixed(2);
    const encodedName = encodeURIComponent(merchantName.trim() || 'Merchant');
    const cleanUpi = upiId.trim();
    return `upi://pay?pa=${cleanUpi}&pn=${encodedName}&am=${formattedAmount}&cu=INR&tn=Invoice%20Payment`;
  }, [result.finalCustomerBill, upiId, merchantName]);

  // Dynamic QR generator link using standard clean API
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(upiUri)}&margin=1`;

  return (
    <div className={styles.calculatorCard}>
      {/* Header */}
      <div className={styles.cardHeader}>
        <div className={styles.headerLeft}>
          <FontAwesomeIcon icon={faCalculator} className={styles.headIcon} />
          <div>
            <h3 className={styles.title}>UPI Bill & Dynamic QR</h3>
            <p className={styles.subtitle}>Pass 0.4% bank fee directly to customer</p>
          </div>
        </div>

        <button 
          type="button" 
          className={styles.settingsToggle}
          onClick={() => setShowConfig(!showConfig)}
          title="Change UPI ID"
        >
          <FontAwesomeIcon icon={faPenToSquare} />
          <span>{showConfig ? 'Hide UPI' : 'Edit UPI'}</span>
        </button>
      </div>

      <div className={styles.cardBody}>
        {/* Optional UPI Config drawer */}
        {showConfig && (
          <div className={styles.upiConfigBox}>
            <div className={styles.configField}>
              <label>Your UPI ID (VPA):</label>
              <input 
                type="text" 
                value={upiId} 
                onChange={(e) => setUpiId(e.target.value)} 
                placeholder="merchant@bank"
              />
            </div>
            <div className={styles.configField}>
              <label>Merchant Name:</label>
              <input 
                type="text" 
                value={merchantName} 
                onChange={(e) => setMerchantName(e.target.value)} 
                placeholder="Business Name"
              />
            </div>
          </div>
        )}

        {/* Amount Input and Presets */}
        <div className={styles.inputRow}>
          <div className={styles.inputContainer}>
            <FontAwesomeIcon icon={faIndianRupeeSign} className={styles.rupeeIcon} />
            <input
              type="number"
              min="0"
              step="10"
              value={basePrice}
              onChange={(e) => setBasePrice(e.target.value)}
              className={styles.amountInput}
              placeholder="2050"
            />
          </div>

          <div className={styles.presetRow}>
            {presets.map((amt) => (
              <button
                key={amt}
                type="button"
                className={`${styles.presetBadge} ${Number(basePrice) === amt ? styles.activePreset : ''}`}
                onClick={() => setBasePrice(amt)}
              >
                ₹{amt}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Core Layout (Bill Details + QR Code) */}
        <div className={styles.coreGrid}>
          
          {/* Left Column: Calculation Breakdown */}
          <div className={styles.detailsCol}>
            {result.isFree ? (
              <div className={styles.freeBanner}>
                <FontAwesomeIcon icon={faCircleCheck} />
                <span>Under ₹2,000: No bank fee applies</span>
              </div>
            ) : result.isCapped ? (
              <div className={styles.capBanner}>
                <FontAwesomeIcon icon={faShieldHalved} />
                <span>Max ₹300 fee cap applied</span>
              </div>
            ) : (
              <div className={styles.feeBanner}>
                <FontAwesomeIcon icon={faCoins} />
                <span>+0.4% (+₹{result.feeAdded.toFixed(2)}) fee passed to customer</span>
              </div>
            )}

            <div className={styles.finalBillBox}>
              <span className={styles.billTag}>Final Amount to Collect</span>
              <div className={styles.bigAmount}>
                ₹{result.finalCustomerBill.toFixed(2)}
              </div>
            </div>

            <div className={styles.summaryList}>
              <div className={styles.summaryItem}>
                <span>Your Net In-Hand:</span>
                <strong>₹{result.originalAmount.toFixed(2)}</strong>
              </div>
              <div className={styles.summaryItem}>
                <span>Bank MDR Fee:</span>
                <span className={styles.feeHighlight}>
                  {result.feeAdded === 0 ? '₹0.00' : `+ ₹${result.feeAdded.toFixed(2)}`}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Scan to Pay QR Code */}
          <div className={styles.qrCol}>
            <div className={styles.qrFrame}>
              <img 
                src={qrCodeUrl} 
                alt="UPI Payment QR Code" 
                className={styles.qrImage}
                width="140"
                height="140"
              />
              <div className={styles.scanLabel}>
                <FontAwesomeIcon icon={faQrcode} />
                <span>Scan with GPay / PhonePe / Paytm</span>
              </div>
              <div className={styles.vpaDisplay}>{upiId}</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}