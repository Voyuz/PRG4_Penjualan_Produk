import React, { useState, useEffect } from "react";
import { createProduk, updateProduk } from "../../services/ProdukService";
import "bootstrap/dist/css/bootstrap.min.css";

function FormProdukComponent({ onSave, onCancel, selectedProduk }) {
   const [produk, setProduk] = useState({
      id: "",
      nama_produk: "",
      jenis_produk: "",
      stok: "",
      harga_beli: "",
      harga_jual: "",
      status: "Aktif",
   });

   const [errors, setErrors] = useState({});

   // Jika ada data produk yang dipilih (edit mode)
   useEffect(() => {
      if (selectedProduk) {
         setProduk(selectedProduk);
      }
   }, [selectedProduk]);

   // Validasi form
   const validate = () => {
      let tempErrors = {};

      if (!produk.nama_produk.trim())
         tempErrors.nama_produk = "Nama produk wajib diisi.";
      if (!produk.jenis_produk.trim())
         tempErrors.jenis_produk = "Jenis produk wajib diisi.";
      if (!produk.stok || isNaN(produk.stok) || produk.stok < 0)
         tempErrors.stok = "Stok harus berupa angka positif.";
      if (
         !produk.harga_beli ||
         isNaN(produk.harga_beli) ||
         produk.harga_beli <= 0
      )
         tempErrors.harga_beli = "Harga beli harus berupa angka lebih dari 0.";
      if (
         !produk.harga_jual ||
         isNaN(produk.harga_jual) ||
         produk.harga_jual <= 0
      )
         tempErrors.harga_jual = "Harga jual harus berupa angka lebih dari 0.";

      setErrors(tempErrors);
      return Object.keys(tempErrors).length === 0;
   };

   const handleChange = (e) => {
      const { name, value } = e.target;
      setProduk({ ...produk, [name]: value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (!validate()) return;

      try {
         if (selectedProduk) {
            await updateProduk(produk);
            alert("Produk berhasil diperbarui!");
         } else {
            await createProduk(produk);
            alert("Produk berhasil ditambahkan!");
         }
         onSave();
      } catch (error) {
         console.error("Gagal menyimpan data:", error);
         alert("Terjadi kesalahan saat menyimpan data.");
      }
   };

   return (
      <div className="card mt-4 shadow-sm">
         <div className="card-header bg-primary text-white">
            {selectedProduk ? "Edit Produk" : "Tambah Produk"}
         </div>
         <div className="card-body">
            <form onSubmit={handleSubmit}>
               <div className="mb-3">
                  <label className="form-label">Nama Produk</label>
                  <input
                     type="text"
                     name="nama_produk"
                     className={`form-control ${
                        errors.nama_produk ? "is-invalid" : ""
                     }`}
                     value={produk.nama_produk}
                     onChange={handleChange}
                  />
                  <div className="invalid-feedback">{errors.nama_produk}</div>
               </div>

               <div className="mb-3">
                  <label className="form-label">Jenis Produk</label>
                  <input
                     type="text"
                     name="jenis_produk"
                     className={`form-control ${
                        errors.jenis_produk ? "is-invalid" : ""
                     }`}
                     value={produk.jenis_produk}
                     onChange={handleChange}
                  />
                  <div className="invalid-feedback">{errors.jenis_produk}</div>
               </div>

               <div className="mb-3">
                  <label className="form-label">Stok</label>
                  <input
                     type="number"
                     name="stok"
                     className={`form-control ${
                        errors.stok ? "is-invalid" : ""
                     }`}
                     value={produk.stok}
                     onChange={handleChange}
                  />
                  <div className="invalid-feedback">{errors.stok}</div>
               </div>

               <div className="mb-3">
                  <label className="form-label">Harga Beli</label>
                  <input
                     type="number"
                     name="harga_beli"
                     className={`form-control ${
                        errors.harga_beli ? "is-invalid" : ""
                     }`}
                     value={produk.harga_beli}
                     onChange={handleChange}
                  />
                  <div className="invalid-feedback">{errors.harga_beli}</div>
               </div>

               <div className="mb-3">
                  <label className="form-label">Harga Jual</label>
                  <input
                     type="number"
                     name="harga_jual"
                     className={`form-control ${
                        errors.harga_jual ? "is-invalid" : ""
                     }`}
                     value={produk.harga_jual}
                     onChange={handleChange}
                  />
                  <div className="invalid-feedback">{errors.harga_jual}</div>
               </div>

               <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select
                     name="status"
                     className="form-select"
                     value={produk.status}
                     onChange={handleChange}
                  >
                     <option value="Aktif">Aktif</option>
                     <option value="Tidak Aktif">Tidak Aktif</option>
                  </select>
               </div>

               <div className="d-flex justify-content-end">
                  <button
                     type="button"
                     className="btn btn-secondary me-2"
                     onClick={onCancel}
                  >
                     Batal
                  </button>
                  <button type="submit" className="btn btn-success">
                     Simpan
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
}

export default FormProdukComponent;
