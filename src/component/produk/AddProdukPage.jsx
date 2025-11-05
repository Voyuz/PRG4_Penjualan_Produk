import React from "react";
import FormProdukComponent from "./FormProdukComponent";
import { useNavigate } from "react-router-dom";

function AddProdukPage() {
   const navigate = useNavigate();
   return (
      <div className="container mt-4">
         <FormProdukComponent
            onSave={() => navigate("/list-produk")}
            onCancel={() => navigate("/list-produk")}
         />
      </div>
   );
}

export default AddProdukPage;
