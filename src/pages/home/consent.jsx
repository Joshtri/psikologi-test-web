import { Button } from "flowbite-react"
import { useState } from "react"
// import Layout from "./Layout"
// import { useToast } from "../provider/ToastProvider"
import { useToast } from "../../provider/ToastProvider"
import { useNavigate } from "react-router-dom"

export default function ConsentPage({ onBack }) {
  const { showToast } = useToast()
  const [agreements, setAgreements] = useState({
    participation: false,
    risks: false,
    criteria: false,
    incentive: false,
    confidentiality: false,
    voluntary: false,
    finalConsent: false,
  })

  const navigate = useNavigate()


  const handleCheckboxChange = (key) => {
    setAgreements((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const allAgreed = Object.values(agreements).every(Boolean)

  const handleProceed = () => {
    if (allAgreed) {
      showToast({
        type: "success",
        message: "Terima kasih! Anda akan diarahkan ke tes.",
        align: "top-right",
        duration: 3000,
      })
      // Arahkan ke halaman tes sebenarnya di sini
        navigate("/test") // Uncomment this line if using react-router
    } else {
      showToast({
        type: "error",
        message: "Mohon centang semua persetujuan untuk melanjutkan.",
        align: "top-right",
        duration: 3000,
      })
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-purple-600 text-white p-6 rounded-t-lg">
            <h1 className="text-2xl font-bold">Informed Consent</h1>
          </div>

          <div className="bg-white p-8 shadow-lg">
            <div className="mb-8 space-y-6 text-gray-700 text-lg leading-relaxed">
              <p>
                Mohon untuk mengisi formulir di bawah ini setelah Saudara/i membaca lembar penjelasan penelitian dari
                peneliti mengenai penelitian yang akan dilaksanakan.
              </p>
              <p>
                Terima kasih telah mempertimbangkan untuk berpartisipasi pada penelitian ini. Mohon untuk menandai semua
                kotak di bawah ini sebagai tanda persetujuan atas pernyataan tertulis di atas.
              </p>
              <p>
                Bila Anda bersedia untuk berpartisipasi dalam penelitian ini, mohon untuk menekan tombol 'next' atau
                'selanjutnya'. Bila tidak, cukup tutup form ini.
              </p>
            </div>

            {/* Checkbox List */}
            <div className="space-y-6">
              {[
                  { key: "participation", label: "Saya memahami bahwa partisipasi saya bersifat sukarela..." },
                  { key: "risks", label: "Saya memahami potensi risiko yang mungkin terjadi..." },
                  { key: "criteria", label: "Saya memahami kriteria dan karakteristik partisipan..." },
                  { key: "incentive", label: "Saya memahami bahwa saya akan mendapatkan insentif..." },
                  { key: "confidentiality", label: "Saya memahami bahwa informasi akan dijaga kerahasiaannya..." },
                  { key: "voluntary", label: "Saya secara sukarela dan tanpa paksaan setuju..." },
                ].map((item) => (
                    <div key={item.key} className="flex items-start space-x-4">
                  <input
                    type="checkbox"
                    id={item.key}
                    checked={agreements[item.key]}
                    onChange={() => handleCheckboxChange(item.key)}
                    className="w-5 h-5 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 mt-1"
                    />
                  <label htmlFor={item.key} className="text-gray-700 text-lg leading-relaxed">
                    {item.label}
                  </label>
                </div>
              ))}

              <div className="border-t pt-6 mt-8">
                <div className="flex items-start space-x-4">
                  <span className="text-red-500 text-lg">*</span>
                  <div>
                    <input
                      type="checkbox"
                      id="finalConsent"
                      checked={agreements.finalConsent}
                      onChange={() => handleCheckboxChange("finalConsent")}
                      className="w-5 h-5 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 mt-1 mr-4"
                      />
                    <label htmlFor="finalConsent" className="text-gray-700 text-lg leading-relaxed">
                      Saya telah membaca dan memahami informasi pada Lembar Penjelasan Penelitian sebelumnya.
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-12">
              <Button color="light" size="lg" onClick={onBack} className="px-8 py-3">
                Kembali
              </Button>
              <Button
                size="lg"
                className={`px-8 py-3 ${
                    allAgreed ? "bg-purple-600 hover:bg-purple-700" : "bg-gray-400 cursor-not-allowed"
                    }`}
                    onClick={handleProceed}
                    disabled={!allAgreed}
                    >
                Selanjutnya
              </Button>
            </div>
          </div>
        </div>
      </div>
      </>
  )
}
