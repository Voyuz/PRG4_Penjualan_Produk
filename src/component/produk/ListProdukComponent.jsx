import React, { useEffect, useState } from "react";
import { listProduk, deleteProduk } from "../../services/ProdukService";
import FormProdukComponent from "./FormProdukComponent";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function ListProdukComponent() {
   const [produkList, setProdukList] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [showForm, setShowForm] = useState(false);
   const [selectedProduk, setSelectedProduk] = useState(null);

   useEffect(() => {
      fetchProduk();
   }, []);

   const fetchProduk = async () => {
      try {
         const response = await listProduk();
         setProdukList(response.data);
      } catch (err) {
         console.error("Error fetching produk:", err);
         setError("Gagal mengambil data produk.");
      } finally {
         setLoading(false);
      }
   };

   const handleDelete = async (id) => {
      if (window.confirm("Yakin ingin menghapus produk ini?")) {
         try {
            await deleteProduk(id);
            alert("Produk berhasil dihapus.");
            fetchProduk();
         } catch (err) {
            alert("Gagal menghapus produk.");
            console.error(err);
         }
      }
   };

   const handleEdit = (produk) => {
      setSelectedProduk(produk);
      setShowForm(true);
   };

   const handleAdd = () => {
      setSelectedProduk(null);
      setShowForm(true);
   };

   const handleFormClose = () => {
      setShowForm(false);
      setSelectedProduk(null);
      fetchProduk();
   };

   if (loading) return <div className="text-center mt-5">Loading...</div>;
   if (error) return <div className="alert alert-danger mt-4">{error}</div>;

   return (
      <div className="container mt-4">
         <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Daftar Produk</h2>
            <div>
               <button className="btn btn-success me-2" onClick={handleAdd}>
                  Tambah
               </button>
               {/* <Link to="/tambah-produk" className="btn btn-primary">
                  Tambah (Halaman)
               </Link> */}
            </div>
         </div>

         <table className="table table-bordered table-striped align-middle">
            <thead className="table-dark text-center">
               <tr>
                  <th>ID</th>
                  <th className="text-start">Nama Produk</th>
                  <th className="text-start">Jenis</th>
                  <th>Stok</th>
                  <th>Harga Beli</th>
                  <th>Harga Jual</th>
                  <th>Status</th>
                  <th>Aksi</th>
               </tr>
            </thead>
            <tbody>
               {produkList.length > 0 ? (
                  produkList.map((p) => (
                     <tr key={p.id}>
                        <td className="text-center">{p.id}</td>
                        <td className="text-start">{p.nama_produk}</td>
                        <td className="text-start">{p.jenis_produk}</td>
                        <td className="text-end">{p.stok}</td>
                        <td className="text-end">
                           {parseInt(p.harga_beli).toLocaleString("id-ID")}
                        </td>
                        <td className="text-end">
                           {parseInt(p.harga_jual).toLocaleString("id-ID")}
                        </td>
                        <td className="text-center">
                           <span
                              className={`badge ${
                                 p.status === "Aktif"
                                    ? "bg-success"
                                    : "bg-secondary"
                              }`}
                           >
                              {p.status}
                           </span>
                        </td>
                        <td className="text-center">
                           <button
                              className="btn btn-sm btn-warning me-2"
                              onClick={() => handleEdit(p)}
                           >
                              Edit
                           </button>
                           {/* <Link
                              to={`/edit-produk/${p.id}`}
                              className="btn btn-sm btn-info me-2"
                           >
                              Edit (Page)
                           </Link> */}
                           <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDelete(p.id)}
                           >
                              Hapus
                           </button>
                        </td>
                     </tr>
                  ))
               ) : (
                  <tr>
                     <td colSpan="8" className="text-center">
                        Tidak ada produk ditemukan.
                     </td>
                  </tr>
               )}
            </tbody>
         </table>

         {/* Modal Bootstrap */}
         {showForm && (
            <div
               className="modal show d-block"
               tabIndex="-1"
               style={{ background: "rgba(0,0,0,0.5)" }}
            >
               <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                     <div className="modal-body">
                        <FormProdukComponent
                           selectedProduk={selectedProduk}
                           onSave={handleFormClose}
                           onCancel={handleFormClose}
                        />
                     </div>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}

export default ListProdukComponent;
