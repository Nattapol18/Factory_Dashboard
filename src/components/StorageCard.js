import React, { useMemo, useState, useEffect } from 'react';
import {
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, Area, AreaChart
} from 'recharts';
import { getStorageHistoryById, formatDateTime } from '../data/storageData';

const StorageCard = ({ storageData }) => {
  // เพิ่ม state สำหรับ animation การเปลี่ยนแปลงน้ำหนัก
  const [weightChange, setWeightChange] = useState('');
  const [prevWeight, setPrevWeight] = useState(storageData.Act_Weight);

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

  // แปลงวันเวลาให้อ่านง่ายสำหรับกราฟ
  const formatDate = (dateString) => {
    if (!dateString) return '';
    // กรณีที่ dateString เป็น formatted string จาก getStorageHistoryById
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}/${month} ${hours}:${minutes}`;
  };

  // Format น้ำหนักให้แสดงทศนิยม 2 ตำแหน่ง
  const formatWeight = (weight) => Math.abs(weight).toFixed(2);

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
  const history = getStorageHistoryById(storageData.Id_pk);

  // ใช้ useMemo เพื่อ performance และเตรียมข้อมูลสำหรับกราฟ
  const formattedHistory = useMemo(() => {
    return history.map(item => ({
      ...item,
      originalDateTime: item.time,
      formattedTime: formatDate(item.time)
    }));
  }, [history]);

  // คำนวณการเปลี่ยนแปลงน้ำหนักเป็นเปอร์เซ็นต์เทียบกับค่าแรก (ถ้ามีข้อมูล)
  const weightChangePercent = useMemo(() => {
    if (formattedHistory.length >= 2) {
      const firstWeight = formattedHistory[0].value;
      const lastWeight = formattedHistory[formattedHistory.length - 1].value;
      
      if (firstWeight !== 0) {
        const changePercent = ((lastWeight - firstWeight) / Math.abs(firstWeight)) * 100;
        return changePercent.toFixed(1);
      }
    }
    return null;
  }, [formattedHistory]);

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
      </h3>

      <div className="storage-info-grid">
        <div className="storage-info-item">
          <div>วัสดุ</div>
          <div className="info-value">{storageData.Material}</div>
        </div>
        <div className="storage-info-item">
          <div>รหัส SemiBatch</div>
          <div className="info-value">{storageData.SemiBatch}</div>
        </div>
        <div className="storage-info-item">
          <div>น้ำหนักปัจจุบัน</div>
          <div className={`info-value weight-value ${weightChange}`}>
            {formatWeight(storageData.Act_Weight)} กก.
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
            {formatDateTime(storageData.DateTime)}
          </div>
        </div>
      </div>

      <div style={{ height: '250px', marginTop: '20px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={formattedHistory}
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
            />
            <Tooltip
              formatter={(value) => [`${formatWeight(value)} กก.`, 'น้ำหนัก']}
              labelFormatter={(label, payload) => {
                try {
                  // ใช้ originalDateTime เพื่อแสดงเวลาที่สมบูรณ์
                  return `เวลา: ${formatDateTime(payload?.[0]?.payload?.originalDateTime)}`;
                } catch (e) {
                  return `เวลา: ไม่มีข้อมูล`;
                }
              }}
              contentStyle={{
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
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
              name="น้ำหนัก (กก.)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      {/* เพิ่มส่วนแสดงสรุปข้อมูล */}
      {formattedHistory.length > 1 && (
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
            <span style={{ fontWeight: 'bold', color: materialColor }}>น้ำหนักเริ่มต้น:</span> {formatWeight(formattedHistory[0].value)} กก.
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontWeight: 'bold', color: materialColor }}>น้ำหนักล่าสุด:</span> {formatWeight(formattedHistory[formattedHistory.length - 1].value)} กก.
          </div>
        </div>
      )}
    </div>
  );
};

export default StorageCard;