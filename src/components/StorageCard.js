import React, { useMemo, useState, useEffect, useRef } from 'react';
import {
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, Area, AreaChart
} from 'recharts';
import { getStorageHistoryById, formatDateTime } from '../data/storageData';

const StorageCard = ({ storageData }) => {
  // เพิ่ม state สำหรับ animation การเปลี่ยนแปลงน้ำหนัก
  const [weightChange, setWeightChange] = useState('');
  const [prevWeight, setPrevWeight] = useState(storageData.Act_Weight);
  
  // เพิ่ม state เพื่อเก็บข้อมูลที่จะแสดงในกราฟ
  const [chartData, setChartData] = useState([]);
  
  // เพิ่ม state และ ref สำหรับการอัพเดตแบบเรียลไทม์
  const [isUpdating, setIsUpdating] = useState(false);
  const updateIntervalRef = useRef(null);
  
  // ตรวจจับการเปลี่ยนแปลงน้ำหนัก
  useEffect(() => {
    if (prevWeight !== storageData.Act_Weight) {
      setWeightChange(storageData.Act_Weight > prevWeight ? 'increasing' : 'decreasing');
      
      // Reset animation class หลังจาก 2 วินาที
      const timer = setTimeout(() => {
        setWeightChange('');
      }, 2000);
      
      setPrevWeight(storageData.Act_Weight);
      return () => clearTimeout(timer);
    }
  }, [storageData.Act_Weight, prevWeight]);

  // เตรียมข้อมูลสำหรับกราฟเมื่อ component โหลด
  useEffect(() => {
    // ดึงข้อมูลประวัติจาก storageData
    const history = getStorageHistoryById(storageData.Id_pk);
    
    // แปลงรูปแบบข้อมูลให้เหมาะกับการแสดงในกราฟ
    const formattedData = history.map(item => ({
      value: item.value,
      time: item.time,
      originalDateTime: item.time,
      formattedTime: formatDate(item.time)
    }));
    
    setChartData(formattedData);
    
    // เริ่มการจำลองการอัพเดตข้อมูลกราฟแบบเรียลไทม์
    startChartSimulation();
    
    // เมื่อ component unmount ให้ล้าง interval
    return () => {
      if (updateIntervalRef.current) {
        clearInterval(updateIntervalRef.current);
      }
    };
  }, [storageData.Id_pk]);

  // ฟังก์ชันจำลองการอัพเดตข้อมูลกราฟแบบเรียลไทม์
  const startChartSimulation = () => {
    // ล้าง interval เดิมถ้ามี
    if (updateIntervalRef.current) {
      clearInterval(updateIntervalRef.current);
    }
    
    // สร้าง interval สำหรับการอัพเดตข้อมูลทุก 15 วินาที
    updateIntervalRef.current = setInterval(() => {
      // สร้างการเปลี่ยนแปลงแบบสุ่ม
      setIsUpdating(true);
      
      // จำลองการเพิ่มข้อมูลใหม่ในกราฟ
      setTimeout(() => {
        setChartData(prevData => {
          // สร้างข้อมูลใหม่
          const lastData = prevData[prevData.length - 1];
          const lastValue = lastData ? parseFloat(lastData.value) : 0;
          
          // สร้างการเปลี่ยนแปลงแบบสุ่ม (มีโอกาสเพิ่มขึ้นมากกว่าลดลง)
          const weightChange = (Math.random() - 0.4) * 2;
          const newValue = Math.max(0, lastValue + weightChange).toFixed(2);
          
          // สร้างเวลาปัจจุบัน
          const now = new Date();
          const formattedNow = now.toLocaleString();
          
          // อัพเดตน้ำหนักใน storageData ด้วย
          setPrevWeight(parseFloat(newValue));
          
          // เพิ่มข้อมูลใหม่เข้าไปในอาร์เรย์
          const newData = [
            ...prevData,
            {
              value: parseFloat(newValue),
              time: formattedNow,
              originalDateTime: formattedNow,
              formattedTime: formatDate(formattedNow)
            }
          ];
          
          // ถ้ามีข้อมูลมากเกินไป ให้ตัดข้อมูลเก่าออกเพื่อแสดงเฉพาะข้อมูลล่าสุด 10 จุด
          if (newData.length > 10) {
            return newData.slice(newData.length - 10);
          }
          
          return newData;
        });
        
        setIsUpdating(false);
      }, 1000);
      
    }, 15000); // อัพเดตทุก 15 วินาที
  };

  // แปลงวันเวลาให้อ่านง่ายสำหรับกราฟ
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    try {
      // แปลง dateTimeStr เป็นรูปแบบที่ JS รองรับ
      let date;
      if (dateString.includes(":000")) {
        // ถ้า dateString มาจาก history จะมีรูปแบบเช่น "Jul 10 2024 11:02:29:000AM"
        const formatted = dateString.replace(/:(\d{3})(AM|PM)$/, ' $2'); // ลบ milliseconds
        date = new Date(formatted);
      } else {
        // ถ้าเป็นรูปแบบอื่น (เช่น จาก Date.toLocaleString())
        date = new Date(dateString);
      }
      
      if (isNaN(date.getTime())) return '';
      
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      
      return `${day}/${month} ${hours}:${minutes}`;
    } catch (error) {
      console.error("Error formatting date:", error);
      return '';
    }
  };

  // Format น้ำหนักให้แสดงทศนิยม 2 ตำแหน่ง
  const formatWeight = (weight) => {
    return parseFloat(weight).toFixed(2);
  };

  // สีวัสดุตามประเภท
  const getMaterialColor = (material) => {
    const colorMap = {
      'SESHE06': '#3b82f6',
      'SESDM21': '#10b981',
      'SESDG28': '#f59e0b',
    };
    return colorMap[material] || '#64748b';
  };

  const materialColor = getMaterialColor(storageData.Material);

  // คำนวณการเปลี่ยนแปลงน้ำหนักเป็นเปอร์เซ็นต์เทียบกับค่าแรก (ถ้ามีข้อมูล)
  const weightChangePercent = useMemo(() => {
    if (chartData.length >= 2) {
      const firstWeight = chartData[0].value;
      const lastWeight = chartData[chartData.length - 1].value;
      
      // ป้องกันการหารด้วย 0 และจัดการกรณีที่ค่าน้อยมาก
      if (firstWeight !== 0) {
        const changePercent = ((lastWeight - firstWeight) / Math.abs(firstWeight)) * 100;
        return changePercent.toFixed(1);
      } else if (lastWeight > 0) {
        // ถ้าค่าแรกเป็น 0 แต่ค่าสุดท้ายมากกว่า 0 ให้แสดงเป็น +100%
        return "100.0";
      }
    }
    return null;
  }, [chartData]);

  // กำหนดค่า domain สำหรับแกน Y ให้เหมาะสมกับข้อมูล
  const getYAxisDomain = () => {
    if (chartData.length === 0) return [0, 5]; // ค่าเริ่มต้น
    
    // หาค่าสูงสุดในข้อมูล
    const maxValue = Math.max(...chartData.map(d => d.value));
    
    // ถ้าค่าสูงสุดเป็น 0 หรือน้อยมาก
    if (maxValue === 0 || maxValue < 1) {
      return [0, 5]; // กำหนดช่วงค่าเริ่มต้น
    }
    
    // ค่าสูงสุดบวกเพิ่ม 10% สำหรับความสวยงาม
    const upperBound = maxValue * 1.1;
    return [0, upperBound];
  };
  
  // แสดงสถานะการอัพเดตกราฟแบบเรียลไทม์
  useEffect(() => {
    if (isUpdating) {
      // ตั้ง timer เพื่อรีเซ็ตสถานะการอัพเดต
      const timer = setTimeout(() => {
        setIsUpdating(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isUpdating]);

  return (
    <div className="card" data-material={storageData.Material}>
      <h3 style={{ color: materialColor, display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: '8px' }}>พื้นที่เก็บข้อมูล:</span>
        <span style={{ 
          background: materialColor, 
          color: 'white', 
          padding: '4px 10px', 
          borderRadius: '6px', 
          fontSize: '0.9em' 
        }}>
          {storageData.Tagname}
        </span>
        {/* เพิ่มตัวแสดงสถานะการอัพเดต */}
        {isUpdating && (
          <span style={{
            marginLeft: '10px',
            fontSize: '0.8em',
            color: '#10b981',
            animation: 'pulse 1s infinite',
          }}>
            กำลังอัพเดต...
          </span>
        )}
      </h3>

      <div className="storage-info-grid">
        <div className="storage-info-item">
          <div>วัสดุ</div>
          <div className="info-value">{storageData.Material}</div>
        </div>
        <div className="storage-info-item">
          <div>รหัสพื้นที่เก็บข้อมูล</div>
          <div className="info-value">{storageData.SemiBatch}</div>
        </div>
        <div className="storage-info-item">
          <div>พื้นที่เก็บข้อมูลปัจจุบัน</div>
          <div className={`info-value weight-value ${weightChange}`}>
            {formatWeight(chartData.length > 0 ? chartData[chartData.length - 1].value : storageData.Act_Weight)} 
            {weightChangePercent && (
              <span style={{ 
                fontSize: '0.75em', 
                marginLeft: '8px', 
                color: weightChangePercent > 0 ? 'var(--success-color)' : 'var(--danger-color)',
                padding: '2px 6px',
                borderRadius: '4px',
                background: weightChangePercent > 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'
              }}>
                {weightChangePercent > 0 ? '+' : ''}{weightChangePercent}%
              </span>
            )}
          </div>
        </div>
        <div className="storage-info-item">
          <div>อัปเดตล่าสุด</div>
          <div className="info-value" style={{ fontSize: '0.9rem' }}>
            {chartData.length > 0 ? formatDateTime(chartData[chartData.length - 1].originalDateTime) : formatDateTime(storageData.DateTime)}
          </div>
        </div>
      </div>

      <div style={{ height: '250px', marginTop: '20px' }} className={isUpdating ? 'chart-updating' : ''}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
          >
            <defs>
              <linearGradient id={`colorGradient-${storageData.Id_pk}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={materialColor} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={materialColor} stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="formattedTime"
              tick={{ fontSize: 10, fill: '#64748b' }}
              stroke="#cbd5e1"
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis
              tick={{ fontSize: 10, fill: '#64748b' }}
              stroke="#cbd5e1"
              domain={getYAxisDomain()}
            />
            <Tooltip
              formatter={(value) => [`${formatWeight(value)} `, 'พื้นที่เก็บข้อมูล']}
              labelFormatter={(label, payload) => {
                try {
                  // ใช้ originalDateTime เพื่อแสดงเวลาที่สมบูรณ์
                  if (payload?.[0]?.payload?.originalDateTime) {
                    return `เวลา: ${formatDateTime(payload[0].payload.originalDateTime)}`;
                  }
                  return `เวลา: ไม่มีข้อมูล`;
                } catch (e) {
                  return `เวลา: ไม่มีข้อมูล`;
                }
              }}
              contentStyle={{
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              isAnimationActive={true}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="value"
              stroke={materialColor}
              strokeWidth={2}
              fillOpacity={1}
              fill={`url(#colorGradient-${storageData.Id_pk})`}
              activeDot={{ 
                r: 8, 
                strokeWidth: 0, 
                fill: materialColor,
                stroke: 'white',
              }}
              dot={{ 
                r: 3, 
                strokeWidth: 0, 
                fill: materialColor,
                stroke: 'white',
              }}
              name="ปริมาณพื้นที่เก็บข้อมูล"
              isAnimationActive={true}
              animationDuration={500}
              animationEasing="ease-in-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      {/* เพิ่มส่วนแสดงสรุปข้อมูล */}
      {chartData.length > 1 && (
        <div style={{ 
          marginTop: '15px',
          padding: '10px',
          borderRadius: '8px',
          backgroundColor: 'rgba(243, 244, 246, 0.5)',
          fontSize: '0.9em',
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <div>
            <span style={{ fontWeight: 'bold', color: materialColor }}>พื้นที่เก็บข้อมูลเริ่มต้น:</span> {formatWeight(chartData[0].value)} กก.
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontWeight: 'bold', color: materialColor }}>พื้นที่เก็บข้อมูลล่าสุด:</span> {formatWeight(chartData[chartData.length - 1].value)} กก.
          </div>
        </div>
      )}
    </div>
  );
};

export default StorageCard;