import React, { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalculator, 
  faIndianRupeeSign, 
  faCircleCheck, 
  faShieldHalved, 
  faCoins, 
  faQrcode,
  faPenToSquare,
  faCircleExclamation,
  faRotateLeft,
  faXmark
} from '@fortawesome/free-solid-svg-icons';
import styles from './UpiMerchantCalculator.module.css';

export default function UpiMerchantCalculator({ onClose }) {
  const [basePrice, setBasePrice] = useState('');
  const [upiId, setUpiId] = useState('');
  const [merchantName, setMerchantName] = useState('');
  const [showConfig, setShowConfig] = useState(false);

  // Clear all fields back to initial state
  const handleReset = () => {
    setBasePrice('');
    setUpiId('');
    setMerchantName('');
  };

  const result = useMemo(() => {
    const originalAmount = Math.max(0, Number(basePrice) || 0);

    if (originalAmount === 0) {
      return {
        originalAmount: 0,
        feeAdded: 0,
        finalCustomerBill: 0,
        isZero: true,
        isFree: true,
        isCapped: false
      };
    }

    // Free under ₹2,000
    if (originalAmount <= 2000) {
      return {
        originalAmount,
        feeAdded: 0,
        finalCustomerBill: originalAmount,
        isZero: false,
        isFree: true,
        isCapped: false
      };
    }

    // 0.4% UPI MDR calculation
    let calculatedFee = originalAmount * 0.004;
    let isCapped = false;

    // NPCI cap of ₹300
    if (calculatedFee > 300) {
      calculatedFee = 300;
      isCapped = true;
    }

    const finalCustomerBill = originalAmount + calculatedFee;

    return {
      originalAmount,
      feeAdded: calculatedFee,
      finalCustomerBill,
      isZero: false,
      isFree: false,
      isCapped
    };
  }, [basePrice]);

  // Standard NPCI UPI URI string
  const upiUri = useMemo(() => {
    const cleanUpi = upiId.trim();
    if (!cleanUpi || result.finalCustomerBill <= 0) return '';

    const formattedAmount = result.finalCustomerBill.toFixed(2);
    const encodedName = encodeURIComponent(merchantName.trim() || 'Merchant');
    return `upi://pay?pa=${cleanUpi}&pn=${encodedName}&am=${formattedAmount}&cu=INR&tn=Invoice%20Payment`;
  }, [result.finalCustomerBill, upiId, merchantName]);

  const qrCodeUrl = upiUri 
    ? `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(upiUri)}&margin=1`
    : null;

  return (
    <div className={styles.calculatorCard}>
      {/* Clean Header with Dedicated Close Button */}
      <div className={styles.cardHeader}>
        <div className={styles.headerLeft}>
          <FontAwesomeIcon icon={faCalculator} className={styles.headIcon} />
          <div>
            <h3 className={styles.title}>UPI Surcharge & Dynamic QR</h3>
            <p className={styles.subtitle}>Pass 0.4% bank fee directly to customer</p>
          </div>
        </div>

        {onClose && (
          <button 
            type="button" 
            className={styles.headerCloseBtn} 
            onClick={onClose}
            aria-label="Close Calculator"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        )}
      </div>

      <div className={styles.cardBody}>
        {/* Action Bar (Edit UPI Setup & Reset Button) - Completely separate from header */}
        <div className={styles.actionBar}>
          <button 
            type="button" 
            className={`${styles.actionBtn} ${showConfig ? styles.activeActionBtn : ''}`}
            onClick={() => setShowConfig(!showConfig)}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
            <span>{showConfig ? 'Hide UPI Setup' : 'Edit UPI Setup'}</span>
          </button>

          <button 
            type="button" 
            className={`${styles.actionBtn} ${styles.resetActionBtn}`}
            onClick={handleReset}
            title="Reset All Fields"
          >
            <FontAwesomeIcon icon={faRotateLeft} />
            <span>Reset</span>
          </button>
        </div>

        {/* Merchant UPI Configuration Drawer */}
        {showConfig && (
          <div className={styles.upiConfigBox}>
            <div className={styles.configField}>
              <label>Your Merchant UPI ID (Required)*</label>
              <input 
                type="text" 
                value={upiId} 
                onChange={(e) => setUpiId(e.target.value)} 
                placeholder="e.g. yourname@okaxis or mobile@upi"
                className={!upiId.trim() ? styles.inputWarning : ''}
              />
            </div>
            {/* <div className={styles.configField}>
              <label>Business / Merchant Name (Optional)</label>
              <input 
                type="text" 
                value={merchantName} 
                onChange={(e) => setMerchantName(e.target.value)} 
                placeholder="e.g. My Store / My Service"
              />
            </div> */}
          </div>
        )}

        {/* Base Price Input */}
        <div className={styles.amountInputGroup}>
          <label className={styles.amountLabel}>Base Price / Fare Amount</label>
          <div className={styles.inputContainer}>
            <FontAwesomeIcon icon={faIndianRupeeSign} className={styles.rupeeIcon} />
            <input
              type="number"
              min="0"
              step="any"
              value={basePrice}
              onChange={(e) => setBasePrice(e.target.value)}
              className={styles.amountInput}
              placeholder="Enter value"
            />
          </div>
        </div>

        {/* 2-Column Core Layout (Breakdown + QR Box) */}
        <div className={styles.coreGrid}>
          
          {/* Left Column: Breakdown */}
          <div className={styles.detailsCol}>
            {result.isZero ? (
              <div className={styles.neutralBanner}>
                <FontAwesomeIcon icon={faCircleCheck} />
                <span>Enter an amount above to calculate customer bill</span>
              </div>
            ) : result.isFree ? (
              <div className={styles.freeBanner}>
                <FontAwesomeIcon icon={faCircleCheck} />
                <span>Under ₹2,000: No bank fee applies (₹0.00 added)</span>
              </div>
            ) : result.isCapped ? (
              <div className={styles.capBanner}>
                <FontAwesomeIcon icon={faShieldHalved} />
                <span>Government Cap Applied: Fee restricted to ₹300</span>
              </div>
            ) : (
              <div className={styles.feeBanner}>
                <FontAwesomeIcon icon={faCoins} />
                <span>0.4% bank fee (+₹{result.feeAdded.toFixed(2)}) added to customer bill</span>
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
                <span>Your Net Settlement:</span>
                <strong>₹{result.originalAmount.toFixed(2)}</strong>
              </div>
              <div className={styles.summaryItem}>
                <span>Bank MDR Fee (0.4%):</span>
                <span className={styles.feeHighlight}>
                  {result.feeAdded === 0 ? '₹0.00' : `+ ₹${result.feeAdded.toFixed(2)}`}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic QR Code */}
          <div className={styles.qrCol}>
            <div className={styles.qrFrame}>
              {qrCodeUrl ? (
                <>
                  <img 
                    src={qrCodeUrl} 
                    alt="UPI Payment QR Code" 
                    className={styles.qrImage}
                    width="145"
                    height="145"
                  />
                  <div className={styles.scanLabel}>
                    <FontAwesomeIcon icon={faQrcode} />
                    <span>Scan with any UPI App</span>
                  </div>
                  <div className={styles.vpaDisplay}>{upiId}</div>
                </>
              ) : (
                <div className={styles.qrPlaceholder}>
                  <FontAwesomeIcon icon={faCircleExclamation} className={styles.alertIcon} />
                  <p>
                    {!upiId.trim()
                      ? 'Please enter your Merchant UPI ID in "Edit UPI Setup" above'
                      : 'Please enter base amount to generate payment QR code'}
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}