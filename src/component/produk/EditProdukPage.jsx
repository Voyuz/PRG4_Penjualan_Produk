import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { listProduk } from "../../services/ProdukService";
import FormProdukComponent from "./FormProdukComponent";

function EditProdukPage() {
   const { id } = useParams();
   const navigate = useNavigate();
   const [produk, setProduk] = useState(null);

   useEffect(() => {
      const fetchProduk = async () => {
         const response = await listProduk();
         const found = response.data.find((p) => p.id === id);
         if (found) setProduk(found);
      };
      fetchProduk();
   }, [id]);

   if (!produk) return <div className="text-center mt-5">Loading...</div>;

   return (
      <div className="container mt-4">
         <FormProdukComponent
            selectedProduk={produk}
            onSave={() => navigate("/list-produk")}
            onCancel={() => navigate("/list-produk")}
         />
      </div>
   );
}

export default EditProdukPage;
