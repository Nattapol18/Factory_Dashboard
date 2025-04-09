import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const GaugeChart = ({ value, maxValue }) => {
  const data = [
    { name: 'Value', value: value },
    { name: 'Empty', value: maxValue - value }
  ];
  
  const COLORS = ['#0088FE', '#FFFFFF'];
  
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
      <div className="gauge-value" style={{ textAlign: 'center', marginTop: '-20px' }}>
        {value} / {maxValue}
      </div>
    </div>
  );
};

export default GaugeChart;