import React, { useState, useEffect, useRef } from 'react';
import GaugeChart from './GaugeChart';

const FactoryCard = ({ machine }) => {
  const [weightTrend, setWeightTrend] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentMachine, setCurrentMachine] = useState(machine);
  const [statusChangeTime, setStatusChangeTime] = useState(null);
  const [imageError, setImageError] = useState(false); // เปลี่ยนค่าเริ่มต้นเป็น false เพื่อพยายามโหลดรูปภาพจริงก่อน
  
  // ใช้ useRef เพื่อเก็บข้อมูล interval ID
  const intervalRef = useRef(null);
  const loadingTimerRef = useRef(null);
  const statusIntervalRef = useRef(null);
  const resupplyIntervalRef = useRef(null); // เพิ่ม ref สำหรับการเติมวัตถุดิบ

  // เริ่มการจำลองการเปลี่ยนแปลงข้อมูลแบบเรียลไทม์
  useEffect(() => {
    startMachineSimulation();
    startStatusSimulation();
    startResupplySimulation(); // เริ่มการจำลองการเติมวัตถุดิบ
    
    // เมื่อ component unmount ให้ล้าง interval
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (loadingTimerRef.current) {
        clearTimeout(loadingTimerRef.current);
      }
      if (statusIntervalRef.current) {
        clearInterval(statusIntervalRef.current);
      }
      if (resupplyIntervalRef.current) {
        clearInterval(resupplyIntervalRef.current);
      }
    };
  }, []);

  // จำลองการเติมวัตถุดิบตลอดเวลา
  const startResupplySimulation = () => {
    // ล้าง interval เดิมถ้ามี
    if (resupplyIntervalRef.current) {
      clearInterval(resupplyIntervalRef.current);
    }
    
    // สร้าง interval สำหรับการเติมวัตถุดิบทุก 15-30 วินาที
    resupplyIntervalRef.current = setInterval(() => {
      // จำลองการเติมวัตถุดิบเฉพาะเมื่อวัตถุดิบน้อยกว่า 70% ของความจุสูงสุด
      setCurrentMachine(prev => {
        if (!prev.storageData) return prev;
        
        const currentCapacity = parseFloat(prev.storageData.rawMaterial);
        const maxCapacity = prev.storageData.maxCapacity;
        
        // ตรวจสอบว่าควรเติมวัตถุดิบหรือไม่ (ถ้าน้อยกว่า 70% ของความจุสูงสุด)
        if (currentCapacity < maxCapacity * 0.7) {
          // คำนวณปริมาณการเติม (10-25% ของความจุที่ขาดไป)
          const capacityDeficit = maxCapacity - currentCapacity;
          const resupplyPercentage = Math.random() * 0.15 + 0.1; // 10-25%
          const resupplyAmount = capacityDeficit * resupplyPercentage;
          
          // เพิ่มการแสดงเหตุการณ์การเติมวัตถุดิบในคอนโซล (สำหรับการทดสอบ)
          console.log(`เติมวัตถุดิบ ${resupplyAmount.toFixed(2)} กก. ให้กับ ${prev.name}`);
          
          // อัปเดตข้อมูลวัตถุดิบคงเหลือ
          return {
            ...prev,
            storageData: {
              ...prev.storageData,
              rawMaterial: (currentCapacity + resupplyAmount).toFixed(1),
              lastResupply: new Date().toLocaleTimeString() // เก็บเวลาที่เติมล่าสุด
            }
          };
        }
        
        return prev;
      });
    }, Math.floor(Math.random() * 15000) + 15000); // สุ่มระหว่าง 15-30 วินาที
  };

  // จำลองการเปลี่ยนแปลงสถานะแบบเรียลไทม์
  const startStatusSimulation = () => {
    // ล้าง interval เดิมถ้ามี
    if (statusIntervalRef.current) {
      clearInterval(statusIntervalRef.current);
    }
    
    // สุ่มเวลาการเปลี่ยนสถานะครั้งแรก (ระหว่าง 10-30 วินาที)
    const initialStatusChangeDelay = Math.floor(Math.random() * 20000) + 10000;
    
    // ตั้งเวลาสำหรับการเปลี่ยนสถานะครั้งแรก
    setTimeout(() => {
      updateMachineStatus();
      
      // สร้าง interval สำหรับการเปลี่ยนสถานะต่อไป (ทุก 15-45 วินาที)
      statusIntervalRef.current = setInterval(() => {
        updateMachineStatus();
      }, Math.floor(Math.random() * 30000) + 15000);
    }, initialStatusChangeDelay);
  };

  // อัปเดตสถานะการทำงานของเครื่องจักร
  const updateMachineStatus = () => {
    setCurrentMachine(prev => {
      // โอกาสในการเปลี่ยนสถานะ
      const statusChangeChance = Math.random();
      let newStatus = prev.status;
      
      // กำหนดสถานะใหม่ตามความน่าจะเป็น
      if (prev.status === 'ทำงาน') {
        // ถ้ากำลังทำงาน มีโอกาส 20% ที่จะหยุดทำงาน และ 10% ที่จะต้องซ่อมบำรุง
        if (statusChangeChance < 0.2) {
          newStatus = 'หยุดทำงาน';
        } else if (statusChangeChance < 0.3) {
          newStatus = 'รอการซ่อมบำรุง';
        }
      } else if (prev.status === 'หยุดทำงาน') {
        // ถ้าหยุดทำงาน มีโอกาส 60% ที่จะกลับมาทำงาน และ 10% ที่จะต้องซ่อมบำรุง
        if (statusChangeChance < 0.6) {
          newStatus = 'ทำงาน';
        } else if (statusChangeChance < 0.7) {
          newStatus = 'รอการซ่อมบำรุง';
        }
      } else if (prev.status === 'รอการซ่อมบำรุง') {
        // ถ้ารอซ่อมบำรุง มีโอกาส 50% ที่จะกลับมาทำงาน
        if (statusChangeChance < 0.5) {
          newStatus = 'ทำงาน';
        }
      }
      
      // ถ้าสถานะเปลี่ยน ให้บันทึกเวลาที่เปลี่ยน
      if (newStatus !== prev.status) {
        setStatusChangeTime(new Date());
        
        // ปรับความเร็วเครื่องจักรตามสถานะ
        let newSpeed = prev.speed;
        if (newStatus === 'ทำงาน') {
          // เมื่อกลับมาทำงาน ให้ความเร็วเริ่มต้นอยู่ที่ 40-80% ของความเร็วสูงสุด
          newSpeed = Math.floor((Math.random() * 0.4 + 0.4) * prev.maxSpeed);
        } else if (newStatus === 'หยุดทำงาน') {
          // เมื่อหยุดทำงาน ให้ความเร็วลดลงเหลือ 0-10% ของความเร็วสูงสุด
          newSpeed = Math.floor(Math.random() * 0.1 * prev.maxSpeed);
        } else if (newStatus === 'รอการซ่อมบำรุง') {
          // เมื่อรอซ่อมบำรุง ให้ความเร็วเป็น 0
          newSpeed = 0;
        }
        
        return {
          ...prev,
          status: newStatus,
          speed: newSpeed,
          lastStatusChange: new Date().toLocaleTimeString()
        };
      }
      
      return prev;
    });
  };

  // Simulate machine data updates
  const startMachineSimulation = () => {
    // ล้าง interval เดิมถ้ามี
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = setInterval(() => {
      // สร้างการเปลี่ยนแปลงแบบสุ่ม
      setCurrentMachine(prev => {
        // หากเครื่องไม่ได้ทำงาน ไม่ควรมีการเปลี่ยนแปลงน้ำหนักและการผลิต
        const isWorking = prev.status === 'ทำงาน';
        
        // ปรับความเร็วตามสถานะการทำงาน
        let speedChange = 0;
        if (isWorking) {
          speedChange = Math.random() * 10 - 5;
        } else if (prev.status === 'หยุดทำงาน' && prev.speed > 0) {
          // ถ้าหยุดทำงานแต่ความเร็วยังไม่เป็นศูนย์ ให้ค่อยๆ ลดลง
          speedChange = -Math.max(1, prev.speed * 0.1);
        }
        
        const newSpeed = Math.min(prev.maxSpeed, Math.max(0, prev.speed + speedChange));
        
        // แสดงการโหลดข้อมูล
        setIsLoading(true);
        
        // คำนวณการเปลี่ยนแปลงน้ำหนักและอัตราการผลิตเฉพาะเมื่อเครื่องกำลังทำงาน
        let weightChange = 0;
        let productionChange = 0;
        
        if (isWorking) {
          weightChange = (Math.random() - 0.4) * 2; // มีแนวโน้มเพิ่มมากกว่าลด
          productionChange = Math.random() > 0.7 ? 1 : 0;
        }
        
        // จำลองการอัปเดตน้ำหนัก
        const oldWeight = parseFloat(prev.weight || 0);
        const newWeight = Math.max(0, oldWeight + weightChange).toFixed(2);
        
        // จำลองการเปลี่ยนแปลงอัตราการผลิต
        const newProductionRate = parseInt(prev.productionRate) + productionChange;
        
        // อัปเดตข้อมูลคงเหลือ (ถ้ามี)
        let updatedStorage = prev.storageData;
        if (updatedStorage && isWorking) {
          // ใช้วัตถุดิบในการผลิต (ลดลงตามการทำงาน)
          const usageRate = newSpeed / prev.maxSpeed; // อัตราการใช้วัตถุดิบตามความเร็ว
          const materialUsage = usageRate * (Math.random() * 4 + 1); // 1-5 หน่วยต่อการอัปเดต ขึ้นอยู่กับความเร็ว
          
          updatedStorage = {
            ...updatedStorage,
            rawMaterial: Math.max(0, (parseFloat(updatedStorage.rawMaterial) - materialUsage).toFixed(1))
          };
        }
        
        // เซ็ตการโหลดข้อมูลเป็น false หลังจากผ่านไป 1 วินาที
        loadingTimerRef.current = setTimeout(() => {
          setIsLoading(false);
          
          // เปรียบเทียบน้ำหนักเพื่อกำหนดทิศทาง
          if (newWeight > oldWeight) {
            setWeightTrend('increasing');
          } else if (newWeight < oldWeight) {
            setWeightTrend('decreasing');
          } else {
            setWeightTrend(null);
          }
          
          // Reset weightTrend หลังจาก 2 วินาที
          setTimeout(() => {
            setWeightTrend(null);
          }, 2000);
          
        }, 1000);
        
        return {
          ...prev,
          previousWeight: oldWeight,
          weight: newWeight,
          speed: Math.round(newSpeed),
          weightUpdating: true,
          productionRate: newProductionRate,
          storageData: updatedStorage
        };
      });
      
    }, 5000); // อัปเดตทุก 5 วินาที
  };

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

  // คำนวณเวลาที่เปลี่ยนสถานะล่าสุด
  const getStatusDuration = () => {
    if (!statusChangeTime) return '';
    
    const now = new Date();
    const diffMs = now - statusChangeTime;
    const diffMins = Math.floor(diffMs / 60000);
    const diffSecs = Math.floor((diffMs % 60000) / 1000);
    
    if (diffMins > 0) {
      return `${diffMins} นาที ${diffSecs} วินาที`;
    } else {
      return `${diffSecs} วินาที`;
    }
  };

  // แก้ไขฟังก์ชันนี้ให้ใช้ path ที่ถูกต้อง
  const getMachineImage = () => {
    // ถ้ามีข้อผิดพลาดในการโหลดรูปภาพ หรือยังไม่ได้พยายามโหลด
    if (imageError) {
      const colors = ['4f46e5', '10b981', 'f59e0b'];
      const colorIndex = (currentMachine.id - 1) % colors.length;
      return `https://via.placeholder.com/300x200/${colors[colorIndex]}/ffffff?text=เครื่องจักร ${currentMachine.id}`;
    } else {
      // ใช้ path ที่ถูกต้องสำหรับรูปภาพ
      return `${process.env.PUBLIC_URL}${currentMachine.image}`;
    }
  };

  // จัดการเมื่อมีข้อผิดพลาดในการโหลดรูปภาพ
  const handleImageError = () => {
    setImageError(true); // เมื่อโหลดรูปภาพล้มเหลว จะใช้ placeholder แทน
  };

  // คำนวณเปอร์เซ็นต์ของวัตถุดิบที่เหลืออยู่
  const getRawMaterialPercentage = () => {
    if (!currentMachine.storageData) return 0;
    
    const rawMaterial = parseFloat(currentMachine.storageData.rawMaterial);
    const maxCapacity = currentMachine.storageData.maxCapacity;
    
    return (rawMaterial / maxCapacity * 100).toFixed(1);
  };

  return (
    <div className="card" data-material={currentMachine.materialType}>
      <img 
        src={getMachineImage()} 
        alt={currentMachine.name}
        className="machine-image"
        onError={handleImageError}
      />

      <div className="machine-header">
        <h3 className="machine-title">{currentMachine.name}</h3>
        <div className="machine-info">
          <span className={`status-indicator ${getStatusClass(currentMachine.status)}`}></span>
          <span>{currentMachine.status}</span>
          {statusChangeTime && (
            <span className="status-time">
              {currentMachine.lastStatusChange && `ตั้งแต่ ${currentMachine.lastStatusChange}`}
            </span>
          )}
        </div>
      </div>

      <div className="machine-details">
        <div className="machine-info">
          <span className="info-label">รุ่น:</span>
          <span>{currentMachine.model}</span>
        </div>
        
        <div className="machine-info">
          <span className="info-label">รายละเอียด:</span>
          <span>{currentMachine.description}</span>
        </div>

        {currentMachine.materialType && (
          <div className="machine-info">
            <span className="info-label">วัสดุ:</span>
            <span>{currentMachine.materialType}</span>
          </div>
        )}
      </div>

      {/* แสดงระยะเวลาการทำงานในสถานะปัจจุบัน */}
      {statusChangeTime && (
        <div className="status-duration">
          <span className="info-label">ระยะเวลาในสถานะปัจจุบัน:</span>
          <span className="duration-value">{getStatusDuration()}</span>
        </div>
      )}

      {currentMachine.storageData && (
        <div className="storage-info-grid">
          <div className="storage-info-item">
            <div className="gauge-label">วัตถุดิบคงเหลือ</div>
            <div className={`info-value ${isLoading ? 'loading' : ''}`}>
              {currentMachine.storageData.rawMaterial} กก.
              <span className="material-percentage">({getRawMaterialPercentage()}%)</span>
            </div>
            {currentMachine.storageData.lastResupply && (
              <div className="resupply-info">เติมล่าสุด: {currentMachine.storageData.lastResupply}</div>
            )}
          </div>
          
          <div className="storage-info-item">
            <div className="gauge-label">ความจุสูงสุด</div>
            <div className="info-value">{currentMachine.storageData.maxCapacity} กก.</div>
          </div>
          
          <div className="storage-info-item">
            <div className="gauge-label">น้ำหนักสินค้า</div>
            <div className={`info-value weight-value ${weightTrend}`}>
              {currentMachine.weight} 
            </div>
          </div>
          
          <div className="storage-info-item">
            <div className="gauge-label">อัตราการผลิต</div>
            <div className="info-value">{currentMachine.productionRate}/ชม.</div>
          </div>
        </div>
      )}

      <div className="gauge-container">
        <div className="gauge-label">ความเร็วในการทำงาน</div>
        <GaugeChart value={currentMachine.speed} maxValue={currentMachine.maxSpeed} />
      </div>
    </div>
  );
};

export default FactoryCard;