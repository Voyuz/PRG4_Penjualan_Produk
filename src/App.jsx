import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListProdukComponent from "./component/produk/ListProdukComponent";
import AddProdukPage from "./component/produk/AddProdukPage";
import EditProdukPage from "./component/produk/EditProdukPage";
import HeaderComponent from "./component/templates/HeaderComponent";
import FooterComponent from "./component/templates/FooterComponent";

function App() {
   return (
      <Router>
         <div className="d-flex flex-column min-vh-100">
            <HeaderComponent />
            <div className="flex-grow-1">
               <Routes>
                  <Route
                     path="/list-produk"
                     element={<ListProdukComponent />}
                  />
                  <Route path="/tambah-produk" element={<AddProdukPage />} />
                  <Route path="/edit-produk/:id" element={<EditProdukPage />} />
               </Routes>
            </div>
            <FooterComponent />
         </div>
      </Router>
   );
}

export default App;
