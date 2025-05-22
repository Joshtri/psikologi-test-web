import { Button } from "flowbite-react";
import Layout from "../../components/Layout";
import Toaster from "../../components/ui/Toaster";
import { useToast } from "../../provider/ToastProvider";

export default function HomePage() {
  const { showToast } = useToast();

  return (
    <Layout>
      <div>HomePage</div>
      {/* <Toaster
        type="success"
        message="Item moved successfully."
        align="top-right"
      />{" "} */}

      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Halaman Utama</h1>
        <Button
          onClick={() =>
            showToast({
              type: "success",
              message: "Berhasil menampilkan notifikasi!",
              align: "top-right",
              duration: 3000,
            })
          }
        >
          Tampilkan Toast
        </Button>
      </div>
    </Layout>
  );
}
