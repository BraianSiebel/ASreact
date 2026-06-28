import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function Details() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart, cart } = useContext(CartContext);
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch(`http://localhost:3001/products/${id}`);
            if (response.ok) {
                const data = await response.json();
                setProduct(data);
            }
        };
        fetchProduct();
    }, [id]);

    if (!product) return <p className="p-4 text-center">Carregando detalhes...</p>;

    const itemInCart = cart.find(item => item.id === product.id);
    const reachedMaxStock = itemInCart && itemInCart.quantity >= product.stock;
    const isOutOfStock = product.stock === 0 || product.stock === "0";

    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">Detalhes do Produto</h2>
            <div className="border rounded p-6 shadow-lg">
                <img src={product.url} alt={product.name} className="w-full h-64 object-cover mb-4 rounded" />
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <p className="text-gray-700 mb-4">{product.description}</p>
                <p className="text-2xl text-blue-600 font-bold mb-2">R$ {Number(product.price).toFixed(2)}</p>
                <p className="text-gray-600 mb-4">Estoque disponível: {product.stock}</p>
                
                {isOutOfStock ? (
                    <button disabled className="w-full bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed">
                        Esgotado
                    </button>
                ) : (
                    <button
                        onClick={() => addToCart(product)}
                        disabled={reachedMaxStock}
                        className={`w-full px-4 py-2 rounded text-white ${reachedMaxStock ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}
                    >
                        {reachedMaxStock ? "Estoque Máximo Atingido" : "Adicionar ao Carrinho"}
                    </button>
                )}

                <div className="mt-4 flex gap-2">
                    <button onClick={() => navigate(`/editar/${product.id}`)} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 w-1/2">
                        Editar Produto
                    </button>
                    <button onClick={() => navigate("/")} className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 w-1/2">
                        Voltar
                    </button>
                </div>
            </div>
        </div>
    );
}