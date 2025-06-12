import FormField from "@/components/ui/FormField";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Calendar,
  Globe,
  GraduationCap,
  Hash,
  Home,
  MapPin,
  Phone,
  User,
  Users,
} from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function RespondentForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dateOfBirth = watch("dateOfBirth");

  useEffect(() => {
    if (dateOfBirth) {
      const birthDate = new Date(dateOfBirth);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      setValue("age", age);
    }
  }, [dateOfBirth, setValue]);

  const onSubmit = (data) => {
    console.log("Submitted data:", data);
    navigate("/test");
  };

  const getFieldIcon = (fieldName) => {
    const iconMap = {
      name: User,
      dateOfBirth: Calendar,
      age: Calendar,
      gender: Users,
      phoneNumber: Phone,
      educationLevel: GraduationCap,
      livingWith: Home,
      address: MapPin,
      parentOccupation: Briefcase,
      birthOrder: Hash,
      ethnicity: Globe,
    };
    return iconMap[fieldName] || User;
  };

  const fields = [
    { name: "name", label: "Nama Lengkap", type: "text", required: true },
    {
      name: "dateOfBirth",
      label: "Tanggal Lahir",
      type: "date",
      required: true,
    },
    { name: "age", label: "Usia (otomatis)", type: "number", disabled: true },
    {
      name: "gender",
      label: "Jenis Kelamin",
      type: "select",
      required: true,
      options: ["Laki-laki", "Perempuan"],
    },
    { name: "phoneNumber", label: "Nomor HP", type: "tel", required: true },
    {
      name: "educationLevel",
      label: "Pendidikan Terakhir",
      type: "select",
      required: true,
      options: ["SD", "SMP", "SMA", "S1"],
    },
    { name: "livingWith", label: "Tinggal Dengan", type: "text" },
    { name: "address", label: "Alamat", type: "text" },
    { name: "parentOccupation", label: "Pekerjaan Orang Tua", type: "text" },
    { name: "birthOrder", label: "Anak Ke-", type: "text" },
    { name: "ethnicity", label: "Suku / Etnis", type: "text" },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <div className="absolute inset-0 z-0 opacity-10">
        <div
          className="absolute inset-0 bg-repeat"
          style={{
            backgroundImage:
              "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIHN0cm9rZT0iI2E3ODJmZiIgc3Ryb2tlLXdpZHRoPSIxIiBjeD0iMTAiIGN5PSIxMCIgcj0iNSIvPjxwYXRoIGQ9Ik0xMCAyMEMxNS41MjMgMjAgMjAgMTUuNTIzIDIwIDEwUzE1LjUyMyAwIDEwIDBTMCA0LjQ3NyAwIDEwczQuNDc3IDEwIDEwIDEweiIgc3Ryb2tlPSIjZTlkNWZmIiBzdHJva2Utd2lkdGg9Ii41Ii8+PC9nPjwvc3ZnPg==')",
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      <div className="relative z-10 py-8">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-t-2xl overflow-hidden shadow-xl bg-gradient-to-r from-purple-600 to-amber-600"
          >
            <div className="p-8 text-white">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Informasi Responden</h1>
                  <p className="text-white/90">
                    Mohon lengkapi data diri Anda dengan benar
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white shadow-xl rounded-b-2xl overflow-hidden"
          >
            <div className="p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {fields.map((field, idx) => (
                  <FormField
                    key={field.name}
                    field={field}
                    register={register}
                    errors={errors}
                    watch={watch}
                    getFieldIcon={getFieldIcon}
                    index={idx}
                  />
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="flex justify-end mt-12"
                >
                  <button
                    type="submit"
                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-700 hover:to-amber-700 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                  >
                    Lanjutkan ke Tes
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
