import { FileText, BarChart, Users, Settings, Database, UserPlus } from "lucide-react";
import CustomCard from "@/components/ui/CustomCard";

import { getRespondents } from "@/services/respondent.service";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

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
    description: "Ekspor data ke Excel.",
    icon: Database,
    link: "#",
    color: "text-green-500",
    onClick: async () => {
      try {
        const respondents = await getRespondents();

        // Function to flatten nested objects
        const flattenObject = (obj, prefix = "") => {
          const flattened = {};

          // Use Object.keys() to preserve the order of keys
          const keys = Object.keys(obj);

          for (const key of keys) {
            const newKey = prefix ? `${prefix}_${key}` : key;

            if (typeof obj[key] === "object" && obj[key] !== null && !Array.isArray(obj[key])) {
              // Recursively flatten nested objects
              const nestedFlattened = flattenObject(obj[key], newKey);
              // Use Object.keys to preserve order when merging
              Object.keys(nestedFlattened).forEach((nestedKey) => {
                flattened[nestedKey] = nestedFlattened[nestedKey];
              });
            } else if (Array.isArray(obj[key])) {
              // Convert arrays to comma-separated strings
              flattened[newKey] = obj[key].join(", ");
            } else {
              flattened[newKey] = obj[key];
            }
          }

          return flattened;
        };

        // Process and flatten each respondent's data
        const flattenedData = respondents.map((respondent) => {
          const { answers, summary, ...basicInfo } = respondent;

          // Group keys by type while preserving original order within each group
          const otherKeys = [];
          const nonPdqAceKeys = [];
          const pdqKeys = [];
          const aceKeys = [];

          // Separate keys into groups while maintaining original order
          for (const key of Object.keys(answers)) {
            if (key.startsWith("pdq_4-")) {
              pdqKeys.push(key);
            } else if (key.startsWith("ace-")) {
              aceKeys.push(key);
            } else if (key.startsWith("hfs-") || key.startsWith("pwb-")) {
              nonPdqAceKeys.push(key);
            } else {
              otherKeys.push(key);
            }
          }

          // Combine in desired order: [other, non-pdq-ace, pdq, ace]
          console.log("other", otherKeys);
          console.log("nonPdqAce", nonPdqAceKeys);
          console.log("pdq", pdqKeys);
          console.log("ace", aceKeys);

          const sortedAnswers = {};
          [...otherKeys, ...nonPdqAceKeys, ...pdqKeys, ...aceKeys].forEach((key) => {
            sortedAnswers[key] = answers[key];
          });
          console.log("sortedAnswers", sortedAnswers);

          // Flatten the answers and summary objects
          const flattenedAnswers = flattenObject(sortedAnswers, "answer");
          const flattenedSummary = flattenObject(summary, "summary");

          return {
            ...basicInfo,
            ...flattenedAnswers,
            ...flattenedSummary,
          };
        });

        // Convert data to Excel format
        const worksheet = XLSX.utils.json_to_sheet(flattenedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Respondents");

        // Save Excel file
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(blob, "respondents_data_flattened.xlsx");
      } catch (error) {
        console.error("Failed to export data:", error);
      }
    },
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
              onClick={card.onClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
