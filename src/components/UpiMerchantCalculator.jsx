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
  faXmark,
  faLayerGroup,
  faCheck
} from '@fortawesome/free-solid-svg-icons';
import styles from './UpiMerchantCalculator.module.css';

export default function UpiMerchantCalculator({ onClose }) {
  const [basePrice, setBasePrice] = useState('');
  const [upiId, setUpiId] = useState('');
  const [merchantName, setMerchantName] = useState('');
  const [showConfig, setShowConfig] = useState(false);
  const [splitMode, setSplitMode] = useState(false); // Toggle between Single & Split
  const [activeSplitIndex, setActiveSplitIndex] = useState(0);
  const [paidParts, setPaidParts] = useState({});

  const handleReset = () => {
    setBasePrice('');
    setUpiId('');
    setMerchantName('');
    setActiveSplitIndex(0);
    setPaidParts({});
  };

  const calculation = useMemo(() => {
    const originalAmount = Math.max(0, Number(basePrice) || 0);

    if (originalAmount === 0) {
      return {
        originalAmount: 0,
        feeAdded: 0,
        finalCustomerBill: 0,
        isZero: true,
        isFree: true,
        splits: []
      };
    }

    // Split Engine: Chunks of ₹1,999 to guarantee 0% MDR
    const splits = [];
    let remaining = originalAmount;
    let partNum = 1;

    while (remaining > 0) {
      const chunk = Math.min(remaining, 1999);
      splits.push({
        part: partNum,
        amount: Number(chunk.toFixed(2)),
        fee: 0 // Always 0% MDR since <= 1999
      });
      remaining = Number((remaining - chunk).toFixed(2));
      partNum++;
    }

    // Single Pay 0.4% Fee logic
    let singleFee = 0;
    let isCapped = false;

    if (originalAmount > 2000) {
      singleFee = originalAmount * 0.004;
      if (singleFee > 300) {
        singleFee = 300;
        isCapped = true;
      }
    }

    return {
      originalAmount,
      feeAdded: singleFee,
      finalCustomerBill: originalAmount + singleFee,
      isZero: false,
      isFree: originalAmount <= 2000,
      isCapped,
      splits
    };
  }, [basePrice]);

  // Determine current active amount for QR generation
  const activeQrAmount = useMemo(() => {
    if (calculation.isZero) return 0;
    if (!splitMode) {
      return calculation.finalCustomerBill;
    }
    const currentPart = calculation.splits[activeSplitIndex];
    return currentPart ? currentPart.amount : 0;
  }, [calculation, splitMode, activeSplitIndex]);

  // Standard NPCI UPI URI string
  const upiUri = useMemo(() => {
    const cleanUpi = upiId.trim();
    if (!cleanUpi || activeQrAmount <= 0) return '';

    const formattedAmount = activeQrAmount.toFixed(2);
    const encodedName = encodeURIComponent(merchantName.trim() || 'Merchant');
    const note = splitMode 
      ? encodeURIComponent(`Part ${activeSplitIndex + 1} of ${calculation.splits.length}`)
      : 'Invoice%20Payment';

    return `upi://pay?pa=${cleanUpi}&pn=${encodedName}&am=${formattedAmount}&cu=INR&tn=${note}`;
  }, [activeQrAmount, upiId, merchantName, splitMode, activeSplitIndex, calculation.splits.length]);

  const qrCodeUrl = upiUri 
    ? `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(upiUri)}&margin=1`
    : null;

  const togglePartPaid = (idx, e) => {
    e.stopPropagation();
    setPaidParts(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className={styles.calculatorCard}>
      {/* Header */}
      <div className={styles.cardHeader}>
        <div className={styles.headerLeft}>
          <FontAwesomeIcon icon={faCalculator} className={styles.headIcon} />
          <div>
            <h3 className={styles.title}>UPI Bill & Dynamic QR</h3>
            <p className={styles.subtitle}>Smart MDR calculation & ₹1,999 zero-fee splitter</p>
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
        {/* Action Controls */}
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
            title="Reset"
          >
            <FontAwesomeIcon icon={faRotateLeft} />
            <span>Reset</span>
          </button>
        </div>

        {/* UPI Setup Drawer */}
        {showConfig && (
          <div className={styles.upiConfigBox}>
            <div className={styles.configField}>
              <label>Your Merchant UPI ID (Required)*</label>
              <input 
                type="text" 
                value={upiId} 
                onChange={(e) => setUpiId(e.target.value)} 
                placeholder="e.g. mobile@upi or name@bank"
                className={!upiId.trim() ? styles.inputWarning : ''}
              />
            </div>
            <div className={styles.configField}>
              <label>Business / Merchant Name</label>
              <input 
                type="text" 
                value={merchantName} 
                onChange={(e) => setMerchantName(e.target.value)} 
                placeholder="e.g. Nearby Drivers"
              />
            </div>
          </div>
        )}

        {/* Amount Input */}
        <div className={styles.amountInputGroup}>
          <label className={styles.amountLabel}>Total Bill / Fare Amount</label>
          <div className={styles.inputContainer}>
            <FontAwesomeIcon icon={faIndianRupeeSign} className={styles.rupeeIcon} />
            <input
              type="number"
              min="0"
              step="any"
              value={basePrice}
              onChange={(e) => {
                setBasePrice(e.target.value);
                setActiveSplitIndex(0);
                setPaidParts({});
              }}
              className={styles.amountInput}
              placeholder="Enter value (e.g. 5000)"
            />
          </div>
        </div>

        {/* Mode Selector Toggle (Single vs Split ₹1,999) */}
        {Number(basePrice) > 2000 && (
          <div className={styles.modeTabs}>
            <button
              type="button"
              className={`${styles.tabBtn} ${!splitMode ? styles.activeTab : ''}`}
              onClick={() => setSplitMode(false)}
            >
              <span>Single Pay (+0.4% Fee)</span>
            </button>
            <button
              type="button"
              className={`${styles.tabBtn} ${splitMode ? styles.activeTab : ''}`}
              onClick={() => {
                setSplitMode(true);
                setActiveSplitIndex(0);
              }}
            >
              <FontAwesomeIcon icon={faLayerGroup} />
              <span>Split in ₹1,999 (0% Free)</span>
              <span className={styles.saveBadge}>Save ₹{calculation.feeAdded.toFixed(2)}</span>
            </button>
          </div>
        )}

        {/* Core Display Grid */}
        <div className={styles.coreGrid}>
          
          {/* Left Details Column */}
          <div className={styles.detailsCol}>
            {calculation.isZero ? (
              <div className={styles.neutralBanner}>
                <FontAwesomeIcon icon={faCircleCheck} />
                <span>Enter total amount above to generate payment</span>
              </div>
            ) : splitMode ? (
              <div className={styles.freeBanner}>
                <FontAwesomeIcon icon={faCircleCheck} />
                <span>Divided in ₹1,999 parts: 100% Free (₹0 MDR Bank Fee)</span>
              </div>
            ) : calculation.isFree ? (
              <div className={styles.freeBanner}>
                <FontAwesomeIcon icon={faCircleCheck} />
                <span>Under ₹2,000: Zero bank fee applies</span>
              </div>
            ) : (
              <div className={styles.feeBanner}>
                <FontAwesomeIcon icon={faCoins} />
                <span>+0.4% (+₹{calculation.feeAdded.toFixed(2)}) passed to customer</span>
              </div>
            )}

            {/* Split Breakdown List or Single Big Box */}
            {splitMode && calculation.splits.length > 1 ? (
              <div className={styles.splitListBox}>
                <span className={styles.splitListTitle}>
                  Select Part to Display QR ({calculation.splits.length} parts):
                </span>
                <div className={styles.splitCardsWrap}>
                  {calculation.splits.map((s, idx) => {
                    const isPaid = paidParts[idx];
                    const isSelected = activeSplitIndex === idx;
                    return (
                      <div
                        key={s.part}
                        className={`${styles.splitCard} ${isSelected ? styles.splitActive : ''} ${isPaid ? styles.splitPaid : ''}`}
                        onClick={() => setActiveSplitIndex(idx)}
                      >
                        <div className={styles.splitCardInfo}>
                          <strong>Part {s.part}: ₹{s.amount.toFixed(2)}</strong>
                          <span className={styles.feeZeroTag}>0% Fee</span>
                        </div>
                        <button 
                          type="button"
                          className={`${styles.checkCircle} ${isPaid ? styles.checkedCircle : ''}`}
                          onClick={(e) => togglePartPaid(idx, e)}
                          title="Mark as paid"
                        >
                          {isPaid && <FontAwesomeIcon icon={faCheck} />}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className={styles.finalBillBox}>
                <span className={styles.billTag}>Final Amount to Collect</span>
                <div className={styles.bigAmount}>
                  ₹{calculation.finalCustomerBill.toFixed(2)}
                </div>
                <div className={styles.singleSubText}>
                  Your settlement: ₹{calculation.originalAmount.toFixed(2)} | Bank Fee: ₹{calculation.feeAdded.toFixed(2)}
                </div>
              </div>
            )}
          </div>

          {/* Right QR Column */}
          <div className={styles.qrCol}>
            <div className={styles.qrFrame}>
              {qrCodeUrl ? (
                <>
                  <div className={styles.qrTargetAmount}>
                    {splitMode && calculation.splits.length > 1 && (
                      <span className={styles.partIndicator}>Part {activeSplitIndex + 1} of {calculation.splits.length}:</span>
                    )}
                    <strong>₹{activeQrAmount.toFixed(2)}</strong>
                  </div>

                  <img 
                    src={qrCodeUrl} 
                    alt="UPI QR Code" 
                    className={styles.qrImage}
                    width="140"
                    height="140"
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
                      ? 'Please enter your UPI ID in "Edit UPI Setup" to generate QR'
                      : 'Enter bill amount above to show QR code'}
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