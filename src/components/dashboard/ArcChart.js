import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js/auto";
import { Alert } from "reactstrap";

const ArcChart = ({ files }) => {
  // Register the necessary chart components
  Chart.register(ArcElement, Tooltip, Legend);

  if (files.length === 0) {
    return (
      <Alert color='info' className='mt-3'>
        Aucun document trouvé.
      </Alert>
    );
  }

  // Calculate the total paid amount and the total amount to pay
  const totalPaidAmount = files.reduce((total, file) => total + file.avance, 0);
  const totalToPayAmount = files.reduce(
    (total, file) => total + (file.totalPrice - file.avance),
    0
  );

  // Prepare the chart data
  const data = {
    labels: ["Payé", "Restant"],
    datasets: [
      {
        data: [totalPaidAmount, totalToPayAmount],
        backgroundColor: ["#26c6da", "#FF6384"],
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Paiement",
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default ArcChart;
