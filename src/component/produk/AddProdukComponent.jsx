import React, { useState } from "react";
import { addProduk } from "../../services/ProdukService";
import { Link } from "react-router-dom";

function AddProdukComponent() {
   const [namaProduk, setNamaProduk] = useState("");
   const [jenisProduk, setJenisProduk] = useState("");
   const [stok, setStok] = useState("");
   const [hargaBeli, setHargaBeli] = useState("");
   const [hargaJual, setHargaJual] = useState("");
   const [status, setStatus] = useState("Tersedia"); // Default status
   const [error, setError] = useState(null);
   const [successMessage, setSuccessMessage] = useState(null);

   const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);
      setSuccessMessage(null);

      try {
         // Mengirim data produk baru ke API
         const newProduct = {
            nama_produk: namaProduk,
            jenis_produk: jenisProduk,
            stok: stok,
            harga_beli: hargaBeli,
            harga_jual: hargaJual,
            status: status,
         };

         await addProduk(newProduct); // Menggunakan fungsi dari ProdukService
         setSuccessMessage("Produk berhasil ditambahkan!");

         // Reset form setelah berhasil
         setNamaProduk("");
         setJenisProduk("");
         setStok("");
         setHargaBeli("");
         setHargaJual("");
         setStatus("Tersedia");
      } catch (error) {
         console.error("Error adding product:", error);
         setError("Gagal menambahkan produk. Silakan coba lagi.");
      }
   };

   return (
      <div className="container mt-4">
         <h2>Tambah Produk</h2>
         {error && <div className="alert alert-danger">{error}</div>}
         {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
         )}

         <form onSubmit={handleSubmit}>
            {/* Nama Produk */}
            <div className="mb-3">
               <label htmlFor="namaProduk" className="form-label">
                  Nama Produk
               </label>
               <input
                  type="text"
                  className="form-control"
                  id="namaProduk"
                  value={namaProduk}
                  onChange={(e) => setNamaProduk(e.target.value)}
                  required
               />
            </div>

            {/* Jenis Produk */}
            <div className="mb-3">
               <label htmlFor="jenisProduk" className="form-label">
                  Jenis Produk
               </label>
               <input
                  type="text"
                  className="form-control"
                  id="jenisProduk"
                  value={jenisProduk}
                  onChange={(e) => setJenisProduk(e.target.value)}
                  required
               />
            </div>

            {/* Stok */}
            <div className="mb-3">
               <label htmlFor="stok" className="form-label">
                  Stok
               </label>
               <input
                  type="number"
                  className="form-control"
                  id="stok"
                  value={stok}
                  onChange={(e) => setStok(e.target.value)}
                  required
               />
            </div>

            {/* Harga Beli */}
            <div className="mb-3">
               <label htmlFor="hargaBeli" className="form-label">
                  Harga Beli
               </label>
               <input
                  type="number"
                  className="form-control"
                  id="hargaBeli"
                  value={hargaBeli}
                  onChange={(e) => setHargaBeli(e.target.value)}
                  required
               />
            </div>

            {/* Harga Jual */}
            <div className="mb-3">
               <label htmlFor="hargaJual" className="form-label">
                  Harga Jual
               </label>
               <input
                  type="number"
                  className="form-control"
                  id="hargaJual"
                  value={hargaJual}
                  onChange={(e) => setHargaJual(e.target.value)}
                  required
               />
            </div>

            {/* Status */}
            <div className="mb-3">
               <label htmlFor="status" className="form-label">
                  Status
               </label>
               <select
                  className="form-select"
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
               >
                  <option value="Tersedia">Tersedia</option>
                  <option value="Tidak Tersedia">Tidak Tersedia</option>
               </select>
            </div>

            <button type="submit" className="btn btn-primary">
               Tambah Produk
            </button>
            <Link to="/list-produk" className="btn btn-secondary ms-2">
               Kembali ke List Produk
            </Link>
         </form>
      </div>
   );
}

export default AddProdukComponent;
