import { useEffect, useState } from "react";
import ActionButtons from "@/components/ui/ActionButtons";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import Table from "@/components/ui/Table";
import {
  getRespondents,
  deleteRespondent,
} from "@/services/respondent.service"; // pastikan path sesuai
import { useNavigate } from "react-router-dom";

export default function RespondentPage() {
  const [respondents, setRespondents] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchRespondents = async () => {
    try {
      const data = await getRespondents();
      setRespondents(data);
    } catch (error) {
      console.error("Gagal memuat data responden:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { label: "No", key: "index", render: (_row, i) => i + 1 },
    { label: "Nama", key: "name" },
    { label: "Usia", key: "age" },
    { label: "Jenis Kelamin", key: "gender" },
    { label: "Pendidikan", key: "educationLevel" },
    { label: "No. HP", key: "phoneNumber" },
    {
      label: "Aksi",
      key: "actions",
      render: (row) => (
        <ActionButtons
          onDetail={() => navigate(`/sys/respondents/${row.id}`)}
          // onEdit={() => console.log("Edit:", row)}
          onDelete={async () => {
                try {
                  await deleteRespondent(row.id);
                  fetchRespondents();
                  console.log("Responden dihapus:", row.id);
                } catch (error) {
                  console.error("Gagal menghapus responden:", error);
                }
              }}
        />
      ),
    },
  ];

  useEffect(() => {
    fetchRespondents();
  }, []);

  return (
    <div className="mx-auto p-6">
      <PageBreadcrumb items={[{ label: "Data Responden" }]} />
      <h1 className="text-2xl font-bold mb-6">Daftar Responden</h1>

      {loading ? (
        <p>Memuat data...</p>
      ) : (
        <Table columns={columns} data={respondents} />
      )}
    </div>
  );
}
