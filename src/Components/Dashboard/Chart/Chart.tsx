import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface IDataPoint {
  x: number;
  y: number;
}

interface ISeries {
  name: string;
  data: IDataPoint[];
}

interface SpeedTimeChartProps {
  speeds: number[];
}

const initialVehicleCount = 4; // Number of vehicles

const chartOptions: ApexOptions = {
  chart: {
    animations: {
      enabled: true,
      easing: "linear",
      dynamicAnimation: {
        speed: 1000,
      },
    },
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    type: "line",
    height: 350,
  },
  stroke: {
    curve: "smooth",
  },
  title: {
    text: "Speed Over Time (Multiple Vehicles)",
    align: "left",
  },
  markers: {
    size: 0,
  },
  xaxis: {
    type: "datetime",
  },
  yaxis: {
    title: {
      text: "Speed (km/h)",
    },
  },
  legend: {
    show: true,
  },
};

const SpeedTimeChart: React.FC<SpeedTimeChartProps> = ({ speeds }) => {
  const [series, setSeries] = useState<ISeries[]>(
    Array.from({ length: initialVehicleCount }, (_, index) => ({
      name: `Motor ${index + 1}`,
      data: [],
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const newSeries = series.map((vehicle, index) => {
        const newSpeed = speeds[index]; // Use the provided speeds
        const newDataPoint = { x: now, y: newSpeed };
        const newData = [...vehicle.data, newDataPoint].slice(-10); // Keep the last 10 data points

        return { ...vehicle, data: newData };
      });

      setSeries(newSeries);
    }, 1000); // Update speeds every 2 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [series, speeds]);

  return (
    <div id="chart">
      <ReactApexChart
        options={chartOptions}
        series={series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default SpeedTimeChart;
