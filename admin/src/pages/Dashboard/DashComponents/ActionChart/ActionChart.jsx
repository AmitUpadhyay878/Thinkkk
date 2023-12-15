import React, { useEffect, useState } from "react";
import { formatDateToMonthShortwithFormate2 } from "../../../../util/common";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import request from "../../../../util/request";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function ActionStatus({dashboardStatus}) {
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
  if(dashboardStatus){
    setGraphData(dashboardStatus?.data?.actionGraph)
  }
}, [dashboardStatus]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        onClick:()=>{},
        position: "top",
      },
      title: {
        display: false,
        text: "Action Items Status",
      },
    },
  };

  const labels = graphData?.map((da) =>
    formatDateToMonthShortwithFormate2(da?.date2)
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Total Actions",
        data: graphData?.map((da) => da.totalActions),
        backgroundColor: "#BCC1CE",
      },
      {
        label: "Completed Actions",
        data: graphData?.map((da) => da.completedActions),
        backgroundColor: "#08A87C",
      }
    ],
  };

  return  <Bar options={options} data={data} />

}

export default React.memo(ActionStatus);
