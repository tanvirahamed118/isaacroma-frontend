import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useTranslation } from "react-i18next";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface Business {
  id: string;
  createdAt: string; // ISO string date
  verify?: boolean;
}

interface Types {
  business: {
    id: string;
    business: Business[];
  };
}

const DashChart = ({ business }: Types) => {
  const { t } = useTranslation();
  const now = new Date();
  const daysArray: string[] = [];

  // Create array of last 30 days as strings: 'YYYY-MM-DD'
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    daysArray.push(d.toISOString().split("T")[0]);
  }

  // Generate stats for each day
  const dailyStats = daysArray.map((dateStr) => {
    const businessesOnDate = business?.business?.filter(
      (b) => b.createdAt?.split("T")[0] === dateStr
    );
    const total = businessesOnDate?.length;
    const verified = businessesOnDate?.filter((b) => b.verify)?.length;

    const expired = businessesOnDate?.filter((b) => !b.verify)?.length;
    return { date: dateStr, total, verified, expired };
  });
  const chartData = {
    labels: dailyStats.map((d) =>
      new Date(d.date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
      })
    ),
    datasets: [
      {
        label: "Total Businesses",
        data: dailyStats.map((d) => d.total),
        backgroundColor: "#1F3B73",
        borderRadius: 4,
      },
      {
        label: "Verified",
        data: dailyStats.map((d) => d.verified),
        backgroundColor: "#00C897",
        borderRadius: 4,
      },
      {
        label: "Unverified",
        data: dailyStats.map((d) => d.expired),
        backgroundColor: "#F87171",
        borderRadius: 4,
      },
    ],
  };

  const chartOptions: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        stacked: false,
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        grid: { display: true },
      },
    },
  };

  return (
    <div className="w-full mx-auto p-6 bg-white border border-gray-200 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-gray-500">{t("businesses_Created_chart")}</p>
        </div>
      </div>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default DashChart;
