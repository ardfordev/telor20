"use client"

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { ChartData } from '@/types/chart';

interface BarChartProps {
  data: ChartData[];
}

const BarChart: React.FC<BarChartProps> = ({data}) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);

      // Konfigurasi chart
      const options:any = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        xAxis: {
          type: 'category',
          data: data.map((item) => item.name),
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            type: 'bar',
            data: data.map((item) => item.value),
            itemStyle: {
              color: (params: any) => {
                // Menggunakan warna yang berbeda untuk setiap bar
                const colors = ['green', 'yellow', 'red'];
                return colors[params.dataIndex];
              },
            },
            label: {
              show: true,
              position: 'top',
              formatter: '{c}', // Menggunakan formatter untuk menampilkan data value pada bar
              fontSize: 14,
            },
          },
        ],
      };

      // Mengatur konfigurasi dan render chart
      chart.setOption(options);

      const handleResize = () => {
        chart.resize();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [data]);

  return <div ref={chartRef} className='w-full h-[400px] md:py-4 md:px-2' />;
};

export default BarChart;
