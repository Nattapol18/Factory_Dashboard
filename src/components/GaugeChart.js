import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const GaugeChart = ({ value, maxValue }) => {
  // เพิ่ม state สำหรับเก็บค่าปัจจุบันที่แสดงในเกจ
  const [currentValue, setCurrentValue] = useState(value);
  // เพิ่ม state เพื่อติดตามทิศทางการเคลื่อนไหว
  const [trend, setTrend] = useState(null);
  
  // ใช้ useEffect เพื่อจัดการการเปลี่ยนแปลงของค่า value
  useEffect(() => {
    if (value !== currentValue) {
      // ตั้งทิศทางการเคลื่อนไหว (เพิ่มขึ้นหรือลดลง)
      setTrend(value > currentValue ? 'increasing' : 'decreasing');
      
      // อนิเมชั่นการเปลี่ยนแปลงค่าแบบค่อยเป็นค่อยไป
      const step = value > currentValue ? 1 : -1;
      const interval = setInterval(() => {
        setCurrentValue(prevValue => {
          // ถ้าค่าปัจจุบันใกล้ถึงค่าเป้าหมายแล้ว ให้เซ็ตเป็นค่าเป้าหมายเลย
          if ((step > 0 && prevValue + step >= value) || 
              (step < 0 && prevValue + step <= value)) {
            clearInterval(interval);
            return value;
          }
          return prevValue + step;
        });
      }, 50); // ปรับความเร็วของการเคลื่อนไหวได้ที่นี่
      
      // ล้าง interval เมื่อ component unmount
      return () => clearInterval(interval);
    }
  }, [value, currentValue]);

  // จัดการการหมดเวลาของการแสดง effect
  useEffect(() => {
    if (trend) {
      const timer = setTimeout(() => {
        setTrend(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [trend]);

  const data = [
    { name: 'Value', value: currentValue },
    { name: 'Empty', value: maxValue - currentValue }
  ];
  
  const COLORS = ['#0088FE', '#FFFFFF'];
  
  // สร้างคลาสตามทิศทางการเปลี่ยนแปลง
  const gaugeValueClass = `gauge-value ${trend || ''}`;
  
  return (
    <div className="gauge-chart">
      <PieChart width={200} height={120}>
        <Pie
          data={data}
          cx={100}
          cy={100}
          startAngle={180}
          endAngle={0}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={0}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      <div className={gaugeValueClass} style={{ textAlign: 'center', marginTop: '-20px' }}>
        {currentValue} / {maxValue}
      </div>
    </div>
  );
};

export default GaugeChart;