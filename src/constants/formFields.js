export const respondentFormFields = [
  {
    name: "name",
    label: "Nama Lengkap",
    type: "text",
    required: true,
    validation: {
      required: "Nama wajib diisi",
      minLength: { value: 3, message: "Nama harus memiliki minimal 3 karakter" },
    },
  },
  {
    name: "dateOfBirth",
    label: "Tanggal Lahir",
    type: "date",
    required: true,
    validation: {
      required: "Tanggal lahir wajib diisi",
      validate: {
        notFutureDate: (value) => {
          const selectedDate = new Date(value);
          const today = new Date();
          return selectedDate <= today || "Tanggal lahir tidak boleh di masa depan";
        },
      },
    },
  },
  {
    name: "age",
    label: "Usia (otomatis)",
    type: "number",
    disabled: true,
  },
  {
    name: "gender",
    label: "Jenis Kelamin",
    type: "select",
    required: true,
    options: ["Laki-laki", "Perempuan"],
    validation: { required: "Jenis kelamin wajib dipilih" },
  },
  {
    name: "phoneNumber",
    label: "Nomor HP",
    type: "tel",
    required: true,
    validation: {
      required: "Nomor HP wajib diisi",
      pattern: {
        value: /^[0-9]{10,12}$/,
        message: "Nomor HP harus berupa angka dan memiliki 10-12 digit",
      },
    },
  },
  {
    name: "educationLevel",
    label: "Pendidikan Terakhir",
    type: "select",
    required: true,
    options: ["SD", "SMP", "SMA", "S1",""],
    validation: { required: "Pendidikan wajib dipilih" },
  },
  {
    name: "schoolName",
    label: "Nama Sekolah / Perguruan Tinggi",
    type: "text",
    required: true,
    validation: { required: "Nama sekolah wajib diisi" },
  },
  {
    name: "livingWith",
    label: "Saat Ini Tinggal Dengan Siapa",
    type: "text",
    required: true,
    validation: {
      required: "Tinggal dengan siapa wajib diisi",
    },
  },
  {
    name: "address",
    label: "Alamat",
    type: "text",
    required: true,
    validation: {
      required: "Alamat wajib diisi",
    },
  },
  {
    name: "parentOccupation",
    label: "Pekerjaan Orang Tua",
    type: "text",
    required: true,
    validation: {
      required: "Pekerjaan orang tua wajib diisi",
      minLength: { value: 3, message: "Pekerjaan harus memiliki minimal 3 karakter" },
    },
  },
  {
    name: "birthOrder",
    label: "Anak Ke-",
    type: "number",
    required: true,
    validation: {
      required: "Anak ke- wajib diisi dengan angka",
      min: { value: 1, message: "Anak ke- harus lebih dari 0" },
      pattern: {
        value: /^[0-9]+$/, // Regex to allow only numbers
        message: "Anak ke- hanya boleh berupa angka",
      },
    },
  },
  {
    name: "ethnicity",
    label: "Suku / Etnis",
    type: "text",
    required: true,
    validation: {
      required: "Suku / etnis wajib diisi",
    },
  },
];
