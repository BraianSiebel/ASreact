import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Card({ product }) {
    const navigate = useNavigate();
    const { addToCart, cart } = useContext(CartContext);

    const itemInCart = cart.find(item => item.id === product.id);
    const quantityInCart = itemInCart ? itemInCart.quantity : 0;
    
    const availableStock = product.stock - quantityInCart;

    return (
        <div className="border rounded p-4 flex flex-col justify-between">
            <div>
                <h3 className="text-lg font-bold">{product.name}</h3>
                <img src={product.url} alt={product.name} className="w-full h-48 object-cover mb-4 mt-2 rounded" />
                <p className="text-gray-800 font-semibold">R$ {Number(product.price).toFixed(2)}</p>
                <p className="text-gray-600">Estoque: {availableStock}</p>
            </div>
            
            <div className="mt-4 flex flex-col gap-2">
                {availableStock <= 0 ? (
                    <span className="bg-red-500 text-white px-4 py-2 rounded text-center font-bold">
                        Esgotado
                    </span>
                ) : (
                    <button
                        onClick={() => addToCart(product)}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Adicionar ao Carrinho
                    </button>
                )}
                <button
                    onClick={() => navigate(`/produto/${product.id}`)} 
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Ver Detalhes
                </button>
            </div>
        </div>
    );
}