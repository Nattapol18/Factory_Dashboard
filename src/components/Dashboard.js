import React, { useState, useEffect } from 'react';
import FactoryCard from './FactoryCard';
import StorageCard from './StorageCard';
import { getLatestData, getAllMachines } from '../data/storageData';

const Dashboard = () => {
  const [latestData, setLatestData] = useState([]);
  const [machines, setMachines] = useState([]);
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    // ดึงข้อมูลล่าสุด
    const storageData = getLatestData();
    setLatestData(storageData);

    // ดึงข้อมูลเครื่องจักร
    const machineData = getAllMachines();
    setMachines(machineData);

    // อัปเดตเวลาล่าสุด
    setLastUpdated(new Date().toLocaleString());

    // จำลองการอัปเดตข้อมูลทุก 30 วินาที
    const intervalId = setInterval(() => {
      // ในสถานการณ์จริง เราจะเรียก API หรือดึงข้อมูลจากเซิร์ฟเวอร์ที่นี่
      setLastUpdated(new Date().toLocaleString());
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
          <h1 className="dashboard-title">Factory Dashboard</h1>
          <p className="dashboard-subtitle">อัปเดตล่าสุด: {lastUpdated}</p>
        </div>
      </header>

      <main className="main-content">
        <section className="factory-section">
          <h2 className="section-title">ข้อมูลเครื่องจักร</h2>
          <div className="grid-container">
            {machines.map((machine) => (
              <FactoryCard key={machine.id} machine={machine} />
            ))}
          </div>
        </section>

        <section className="storage-section" style={{ marginTop: '40px' }}>
          <h2 className="section-title">พื้นที่เก็บข้อมูล</h2>
          <div className="grid-container">
            {latestData.map((storage) => (
              <StorageCard key={storage.Id_pk} storageData={storage} />
            ))}
          </div>
        </section>
      </main>

      <footer className="dashboard-footer">
        <p>Factory Dashboard &copy; 2025</p>
      </footer>
    </div>
  );
};

export default Dashboard;
