export const respondentFormFields = [
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
  { 
    name: "schoolName", 
    label: "Nama Sekolah / Perguruan Tinggi", 
    type: "text",
    required: true
  },
  { name: "livingWith", label: "Tinggal Dengan", type: "text" },
  { name: "address", label: "Alamat", type: "text" },
  { name: "parentOccupation", label: "Pekerjaan Orang Tua", type: "text" },
  { name: "birthOrder", label: "Anak Ke-", type: "text" },
  { name: "ethnicity", label: "Suku / Etnis", type: "text" },
];