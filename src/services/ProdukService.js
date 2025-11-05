import axios from "axios";

const REST_API_BASE_URL = "https://api.roniprsty.com/produk/";

export const listProduk = () => axios.get(REST_API_BASE_URL + "read.php");

// export const addProduk = (newProduct) => {
//    return axios.post(REST_API_BASE_URL + "create.php", newProduct);
// };

// Tambah produk
export const createProduk = (produk) =>
   axios.post(REST_API_BASE_URL + "create.php", produk);

// Update produk
export const updateProduk = (produk) =>
   axios.post(REST_API_BASE_URL + "update.php", produk);

// Hapus produk
export const deleteProduk = (id) =>
   axios.post(REST_API_BASE_URL + "delete.php", { id });
