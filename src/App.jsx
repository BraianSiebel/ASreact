import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Details from "./pages/Details";
import Register from "./pages/Register";
import Edit from "./pages/Edit";
import NotFound from "./pages/NotFound";
import { CartProvider } from "./context/CartContext"; // Lembre-se de renomear o arquivo para CartContext.jsx!

export default function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <nav>
          <ul className="flex space-x-4 p-4 bg-gray-200">
            <li>
              <Link to="/" className="text-blue-500 hover:underline">Home</Link>
            </li>
            <li>
              {/* Alterado de /cart para /carrinho */}
              <Link to="/carrinho" className="text-blue-500 hover:underline">Carrinho</Link>
            </li>
            <li>
              {/* Alterado de /register para /cadastro */}
              <Link to="/cadastro" className="text-blue-500 hover:underline">Cadastro</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Alterado de /cart para /carrinho */}
          <Route path="/carrinho" element={<Cart />} />
          <Route path="/produto/:id" element={<Details />} />
          {/* Alterado de /register para /cadastro */}
          <Route path="/cadastro" element={<Register />} />
          <Route path="/editar/:id" element={<Edit />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}