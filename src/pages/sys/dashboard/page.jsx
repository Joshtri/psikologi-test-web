import { FileText, BarChart, Users, Settings, Database, UserPlus } from "lucide-react";
import CustomCard from "@/components/ui/CustomCard";

const cards = [
  {
    title: "Data Master",
    description: "Lihat semua skala penelitian.",
    icon: FileText,
    link: "/sys/master",
    color: "text-purple-500",
  },
  {
    title: "Data Responden",
    description: "Lihat dan kelola semua data responden.",
    icon: Users,
    link: "/sys/respondents",
    color: "text-amber-500",
  },
  {
    title: "Hasil Pengisian",
    description: "Lihat rekap hasil pengisian skala dari semua responden.",
    icon: BarChart,
    link: "/sys/respondents-results",
    color: "text-blue-500",
  },
  {
    title: "Ekspor Data",
    description: "Ekspor data ke Excel atau CSV.",
    icon: Database,
    link: "/sys/export",
    color: "text-green-500",
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-6 text-gray-800">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold mb-8 text-purple-800">Dashboard Admin Penelitian Psikologi 2025</h1>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => (
            <CustomCard
              key={index}
              title={card.title}
              description={card.description}
              icon={card.icon}
              link={card.link}
              color={card.color}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
