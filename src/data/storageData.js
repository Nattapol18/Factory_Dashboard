// ข้อมูลจาก JSON
const rawData = [
  // ข้อมูลวันที่ 10 กรกฎาคม 2024 เวลา 11:02:29
  [
    {
      "Id_pk": 1,
      "OrderNumber": "X",
      "SemiBatch": "2440006",
      "Material": "SESHE06",
      "Tagname": "LD2FST01",
      "Act_Inv": 0,
      "Act_Weight": 10365.056640625,
      "DateTime": "Jul 10 2024 11:02:29:000AM"
    },
    {
      "Id_pk": 2,
      "OrderNumber": "X",
      "SemiBatch": "2440078",
      "Material": "SESDM21",
      "Tagname": "LD2FST02",
      "Act_Inv": 0,
      "Act_Weight": 4477.3969726562,
      "DateTime": "Jul 10 2024 11:02:29:000AM"
    },
    {
      "Id_pk": 3,
      "OrderNumber": "X",
      "SemiBatch": "2440061",
      "Material": "SESDG28",
      "Tagname": "LD2FST03",
      "Act_Inv": 0,
      "Act_Weight": 19403.16796875,
      "DateTime": "Jul 10 2024 11:02:29:000AM"
    }
  ],
  // ข้อมูลวันที่ 10 กรกฎาคม 2024 เวลา 13:09:31
  [
    {
      "Id_pk": 1,
      "OrderNumber": "X",
      "SemiBatch": "2440006",
      "Material": "SESHE06",
      "Tagname": "LD2FST01",
      "Act_Inv": 0,
      "Act_Weight": 10366.4765625,
      "DateTime": "Jul 10 2024 01:09:31:000PM"
    },
    {
      "Id_pk": 2,
      "OrderNumber": "X",
      "SemiBatch": "2440078",
      "Material": "SESDM21",
      "Tagname": "LD2FST02",
      "Act_Inv": 0,
      "Act_Weight": 471.34725952148,
      "DateTime": "Jul 10 2024 01:09:31:000PM"
    },
    {
      "Id_pk": 3,
      "OrderNumber": "X",
      "SemiBatch": "2440061",
      "Material": "SESDG28",
      "Tagname": "LD2FST03",
      "Act_Inv": 0,
      "Act_Weight": 13340.837890625,
      "DateTime": "Jul 10 2024 01:09:31:000PM"
    }
  ],
  // ข้อมูลวันที่ 10 กรกฎาคม 2024 เวลา 15:04:32
  [
    {
      "Id_pk": 1,
      "OrderNumber": "X",
      "SemiBatch": "2440006",
      "Material": "SESHE06",
      "Tagname": "LD2FST01",
      "Act_Inv": 0,
      "Act_Weight": 10365.766601562,
      "DateTime": "Jul 10 2024 03:04:32:000PM"
    },
    {
      "Id_pk": 2,
      "OrderNumber": "X",
      "SemiBatch": "2440078",
      "Material": "SESDM21",
      "Tagname": "LD2FST02",
      "Act_Inv": 0,
      "Act_Weight": 376.91082763672,
      "DateTime": "Jul 10 2024 03:04:32:000PM"
    },
    {
      "Id_pk": 3,
      "OrderNumber": "X",
      "SemiBatch": "2440061",
      "Material": "SESDG28",
      "Tagname": "LD2FST03",
      "Act_Inv": 0,
      "Act_Weight": 10065.418945312,
      "DateTime": "Jul 10 2024 03:04:32:000PM"
    }
  ],
  // ข้อมูลวันที่ 10 กรกฎาคม 2024 เวลา 15:49:33
  [
    {
      "Id_pk": 1,
      "OrderNumber": "X",
      "SemiBatch": "2440006",
      "Material": "SESHE06",
      "Tagname": "LD2FST01",
      "Act_Inv": 0,
      "Act_Weight": 10365.766601562,
      "DateTime": "Jul 10 2024 03:49:33:000PM"
    },
    {
      "Id_pk": 2,
      "OrderNumber": "X",
      "SemiBatch": "2440078",
      "Material": "SESDM21",
      "Tagname": "LD2FST02",
      "Act_Inv": 0,
      "Act_Weight": 379.04138183594,
      "DateTime": "Jul 10 2024 03:49:33:000PM"
    },
    {
      "Id_pk": 3,
      "OrderNumber": "X",
      "SemiBatch": "2440061",
      "Material": "SESDG28",
      "Tagname": "LD2FST03",
      "Act_Inv": 0,
      "Act_Weight": 7225.255859375,
      "DateTime": "Jul 10 2024 03:49:33:000PM"
    }
  ],
  // ข้อมูลวันที่ 10 กรกฎาคม 2024 เวลา 16:23:33
  [
    {
      "Id_pk": 1,
      "OrderNumber": "X",
      "SemiBatch": "2440006",
      "Material": "SESHE06",
      "Tagname": "LD2FST01",
      "Act_Inv": 0,
      "Act_Weight": 11914.821601562,
      "DateTime": "Jul 10 2024 04:23:33:000PM"
    },
    {
      "Id_pk": 2,
      "OrderNumber": "X",
      "SemiBatch": "2440078",
      "Material": "SESDM21",
      "Tagname": "LD2FST02",
      "Act_Inv": 0,
      "Act_Weight": 611.04238183594,
      "DateTime": "Jul 10 2024 04:23:33:000PM"
    },
    {
      "Id_pk": 3,
      "OrderNumber": "X",
      "SemiBatch": "2440061",
      "Material": "SESDG28",
      "Tagname": "LD2FST03",
      "Act_Inv": 0,
      "Act_Weight": 6425.255859375,
      "DateTime": "Jul 10 2024 04:23:33:000PM"
    }
  ],
  // ข้อมูลวันที่ 11 กรกฎาคม 2024 เวลา 09:17:44
  [
    {
      "Id_pk": 1,
      "OrderNumber": "X",
      "SemiBatch": "2440006",
      "Material": "SESHE06",
      "Tagname": "LD2FST01",
      "Act_Inv": 0,
      "Act_Weight": 7336.0224609375,
      "DateTime": "Jul 11 2024 09:17:44:000AM"
    },
    {
      "Id_pk": 2,
      "OrderNumber": "X",
      "SemiBatch": "2440078",
      "Material": "SESDM21",
      "Tagname": "LD2FST02",
      "Act_Inv": 0,
      "Act_Weight": 58.102722167969,
      "DateTime": "Jul 11 2024 09:17:44:000AM"
    },
    {
      "Id_pk": 3,
      "OrderNumber": "X",
      "SemiBatch": "2440061",
      "Material": "SESDG28",
      "Tagname": "LD2FST03",
      "Act_Inv": 0,
      "Act_Weight": 222.83312988281,
      "DateTime": "Jul 11 2024 09:17:44:000AM"
    }
  ],
  // ข้อมูลวันที่ 12 กรกฎาคม 2024 เวลา 08:48:00
  [
    {
      "Id_pk": 1,
      "OrderNumber": "X",
      "SemiBatch": "2440006",
      "Material": "SESHE06",
      "Tagname": "LD2FST01",
      "Act_Inv": 0,
      "Act_Weight": -39.882751464844,
      "DateTime": "Jul 12 2024 08:48:00:000AM"
    },
    {
      "Id_pk": 2,
      "OrderNumber": "X",
      "SemiBatch": "2440078",
      "Material": "SESDM21",
      "Tagname": "LD2FST02",
      "Act_Inv": 0,
      "Act_Weight": 67.334136962891,
      "DateTime": "Jul 12 2024 08:48:00:000AM"
    },
    {
      "Id_pk": 3,
      "OrderNumber": "X",
      "SemiBatch": "2440061",
      "Material": "SESDG28",
      "Tagname": "LD2FST03",
      "Act_Inv": 0,
      "Act_Weight": 239.87329101562,
      "DateTime": "Jul 12 2024 08:48:00:000AM"
    }
  ]
];

// ข้อมูลเพิ่มเติมสำหรับแสดงในหน้า Dashboard
const machineData = [
  {
    id: 1,
    name: "เครื่องจักร A",
    model: "M2000X",
    status: "ทำงาน",
    speed: 75, // ความเร็วปัจจุบัน (เปอร์เซ็นต์)
    maxSpeed: 100, // ความเร็วสูงสุด
    image: "./images/machine1.jpg",
    description: "เครื่องผลิตวัสดุ SESHE06 ความเร็วสูง",
    materialType: "SESHE06",
    weight: 7336.02,
    productionRate: 42,
    storageData: {
      rawMaterial: 5200.5,
      maxCapacity: 12000
    }
  },
  {
    id: 2,
    name: "เครื่องจักร B",
    model: "M1500Y",
    status: "หยุดทำงาน",
    speed: 0, // ความเร็วปัจจุบัน (เปอร์เซ็นต์)
    maxSpeed: 100, // ความเร็วสูงสุด
    image: "./images/machine2.jpg",
    description: "เครื่องผลิตวัสดุ SESDM21 ประสิทธิภาพสูง",
    materialType: "SESDM21",
    weight: 67.33,
    productionRate: 28,
    storageData: {
      rawMaterial: 150.2,
      maxCapacity: 5000
    }
  },
  {
    id: 3,
    name: "เครื่องจักร C",
    model: "M3000Z",
    status: "ทำงาน",
    speed: 45, // ความเร็วปัจจุบัน (เปอร์เซ็นต์)
    maxSpeed: 100, // ความเร็วสูงสุด
    image: "./images/machine3.jpg",
    description: "เครื่องผลิตวัสดุ SESDG28 ประหยัดพลังงาน",
    materialType: "SESDG28",
    weight: 239.87,
    productionRate: 35,
    storageData: {
      rawMaterial: 420.8,
      maxCapacity: 8000
    }
  }
];

// ดึงข้อมูลล่าสุดจากชุดข้อมูล
const getLatestData = () => {
  return rawData[rawData.length - 1];
};

// ดึงข้อมูลเครื่องจักรทั้งหมด
const getAllMachines = () => {
  return machineData;
};

// ดึงข้อมูลเครื่องจักรตาม ID
const getMachineById = (id) => {
  return machineData.find(machine => machine.id === id);
};

// ฟังก์ชันใหม่สำหรับจัดรูปแบบวันที่เวลา
// แก้ไข formatDateTime ให้รองรับรูปแบบ "Jul 12 2024 08:48:00:000AM"
const formatDateTime = (dateTimeStr) => {
  if (!dateTimeStr) return "";

  try {
    // แปลง dateTimeStr เป็นรูปแบบที่ JS รองรับ
    const formatted = dateTimeStr.replace(/:(\d{3})(AM|PM)$/, ' $2'); // ลบ milliseconds
    const date = new Date(formatted);

    if (isNaN(date.getTime())) {
      return "ไม่มีข้อมูล";
    }

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear() + 543;
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes} น.`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return "ไม่สามารถแสดงวันที่";
  }
};

// แก้ไขฟังก์ชัน getStorageHistoryById ในไฟล์ storageData.js
const getStorageHistoryById = (id) => {
  const history = [];

  rawData.forEach(dataSet => {
    const item = dataSet.find(item => item.Id_pk === id);
    if (item?.DateTime) {
      try {
        // แปลง dateTimeStr เป็นรูปแบบที่ JS รองรับ
        const formatted = item.DateTime.replace(/:(\d{3})(AM|PM)$/, ' $2'); // ลบ milliseconds
        const date = new Date(formatted);

        if (!isNaN(date.getTime())) {
          history.push({
            value: item.Act_Weight,
            time: formatted, // เก็บค่าเวลาดิบสำหรับการแสดงผลที่สมบูรณ์
            timestamp: date.getTime(), // ใช้สำหรับการเรียงลำดับ
          });
        }
      } catch (error) {
        console.error("Error parsing date:", error, item.DateTime);
      }
    }
  });

  // เรียงลำดับข้อมูลตามเวลา (timestamp)
  return history.sort((a, b) => a.timestamp - b.timestamp);
};

const getLatestUpdateTimeById = (id) => {
  const latestData = getLatestData();
  const item = latestData.find(item => item.Id_pk === id);
  if (item && item.DateTime) {
    return formatDateTime(item.DateTime);
  }
  return "ไม่มีข้อมูล";
};

export { 
  getLatestData, 
  getAllMachines, 
  getMachineById, 
  getStorageHistoryById,
  formatDateTime,
  getLatestUpdateTimeById
};