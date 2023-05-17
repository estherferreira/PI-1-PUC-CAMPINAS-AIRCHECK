import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";

export function HalfDonutChart({ value }: { value: number }) {
  const data = {
    datasets: [
      {
        data: [value, 100 - value], // Defina o valor atual no lugar de "value"
        backgroundColor: ["#71d8ad", "#24437c50"],
        borderWidth: 0,
        arcWidth: 0,
      },
    ],
  };

  const options = {
    cutoutPercentage: 5,
    rotation: -90,
    circumference: 180,
  };

  Chart.register(ArcElement);

  return (
    <div>
      <Doughnut data={data} options={options} className="scale-75" />
    </div>
  );
}
