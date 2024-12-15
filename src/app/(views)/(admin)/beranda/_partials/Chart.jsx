import { getDataNoCache } from "@/app/sevices/getDataNoCache";
import LineChart from "./LineChart";
import { cookies } from "next/headers";

export default async function Chart() {
  const session = await cookies();
  const access = session.get("jalankita_auth_access").value;

  let endpoint = '';
  if (access !== 'ALL') {
    endpoint = `reports/charts?access=${access}`;
  } else {
    endpoint = 'reports/charts';
  }

  const dataReports = await getDataNoCache(`http://localhost:3000/api/${endpoint}`);
  const months = dataReports.months;
  const values = dataReports.values;

  const data = {
    labels: months,
    datasets: [
      {
        label: 'Laporan Diterima',
        data: values,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      filler: {
        propagate: false,
      },
      title: {
        display: true,
        text: 'Grafik Laporan 5 Bulan Terakhir',
      },
    },
    interaction: {
      intersect: false,
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <LineChart data={data} options={options} />
  );
}
