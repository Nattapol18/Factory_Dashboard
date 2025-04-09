import React, { useState, useEffect } from 'react';
import GaugeChart from './GaugeChart';

const FactoryCard = ({ machine }) => {
  const [weightTrend, setWeightTrend] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate weight data updates
  useEffect(() => {
    // Initial loading state
    if (machine.weightUpdating) {
      setIsLoading(true);
      
      const timer = setTimeout(() => {
        setIsLoading(false);
        
        // Compare with previous weight to set trend
        const oldWeight = parseFloat(machine.previousWeight || 0);
        const newWeight = parseFloat(machine.weight || 0);
        
        if (newWeight > oldWeight) {
          setWeightTrend('increasing');
        } else if (newWeight < oldWeight) {
          setWeightTrend('decreasing');
        } else {
          setWeightTrend(null);
        }
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [machine.weight, machine.previousWeight, machine.weightUpdating]);

  const getStatusClass = (status) => {
    switch (status) {
      case 'ทำงาน':
        return 'status-working';
      case 'หยุดทำงาน':
        return 'status-stopped';
      case 'รอการซ่อมบำรุง':
        return 'status-maintenance';
      default:
        return '';
    }
  };

  return (
    <div className="card" data-material={machine.materialType}>
      <img 
        src={machine.image || './images/machine-placeholder.jpg'} 
        alt={machine.name}
        className="machine-image"
      />

      <div className="machine-header">
        <h3 className="machine-title">{machine.name}</h3>
        <div className="machine-info">
          <span className={`status-indicator ${getStatusClass(machine.status)}`}></span>
          <span>{machine.status}</span>
        </div>
      </div>

      <div className="machine-details">
        <div className="machine-info">
          <span className="info-label">รุ่น:</span>
          <span>{machine.model}</span>
        </div>
        
        <div className="machine-info">
          <span className="info-label">รายละเอียด:</span>
          <span>{machine.description}</span>
        </div>

        {machine.materialType && (
          <div className="machine-info">
            <span className="info-label">วัสดุ:</span>
            <span>{machine.materialType}</span>
          </div>
        )}
      </div>

      {machine.storageData && (
        <div className="storage-info-grid">
          <div className="storage-info-item">
            <div className="gauge-label">วัตถุดิบคงเหลือ</div>
            <div className={`info-value ${isLoading ? 'loading' : ''}`}>
              {machine.storageData.rawMaterial} กก.
            </div>
          </div>
          
          <div className="storage-info-item">
            <div className="gauge-label">ความจุสูงสุด</div>
            <div className="info-value">{machine.storageData.maxCapacity} กก.</div>
          </div>
          
          <div className="storage-info-item">
            <div className="gauge-label">น้ำหนักสินค้า</div>
            <div className={`info-value weight-value ${weightTrend}`}>
              {machine.weight} 
            </div>
          </div>
          
          <div className="storage-info-item">
            <div className="gauge-label">อัตราการผลิต</div>
            <div className="info-value">{machine.productionRate}/ชม.</div>
          </div>
        </div>
      )}

      <div className="gauge-container">
        <div className="gauge-label">ความเร็วในการทำงาน</div>
        <GaugeChart value={machine.speed} maxValue={machine.maxSpeed} />
      </div>
    </div>
  );
};

export default FactoryCard;