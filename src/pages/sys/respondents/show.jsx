import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRespondentById } from "@/services/respondent.service";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";

export default function RespondentShowPage() {
    const { id } = useParams();
    const [respondent, setRespondent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const data = await getRespondentById(id);
                setRespondent(data);
            } catch (error) {
                console.error("Gagal memuat detail responden:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetail();
    }, [id]);

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-pulse text-gray-600">Memuat detail...</div>
        </div>
    );
    
    if (!respondent) return (
        <div className="flex justify-center items-center h-64">
            <div className="text-red-500 font-medium">Data tidak ditemukan</div>
        </div>
    );

    return (
        <div className="mx-auto max-w-4xl p-6">
            <PageBreadcrumb
                items={[
                    { label: "Data Responden", href: "/sys/respondents" },
                    { label: "Detail Responden" },
                ]}
            />
            
            <div className="bg-white shadow-md rounded-lg p-6 mt-4">
                <h1 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
                    Detail Responden
                </h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-md">
                            <p className="text-sm text-gray-500">Nama</p>
                            <p className="font-medium text-gray-800">{respondent.name}</p>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-md">
                            <p className="text-sm text-gray-500">Usia</p>
                            <p className="font-medium text-gray-800">{respondent.age} tahun</p>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-md">
                            <p className="text-sm text-gray-500">Jenis Kelamin</p>
                            <p className="font-medium text-gray-800">{respondent.gender}</p>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-md">
                            <p className="text-sm text-gray-500">Pendidikan</p>
                            <p className="font-medium text-gray-800">{respondent.educationLevel}</p>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-md">
                            <p className="text-sm text-gray-500">No. HP</p>
                            <p className="font-medium text-gray-800">{respondent.phoneNumber}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
