import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
    const { cart, cartTotal, increaseQuantity, decreaseQuantity, removeFromCart } = useContext(CartContext);

    if (cart.length === 0) {
        return (
            <div className="container mx-auto p-4 text-center mt-10">
                <h2 className="text-2xl font-bold mb-4">Seu carrinho está vazio!</h2>
                <Link to="/" className="text-blue-500 underline">Voltar para a Home</Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Carrinho de Compras</h2>
            <div className="flex flex-col gap-4">
                {cart.map((item) => (
                    <div key={item.id} className="border rounded p-4 flex justify-between items-center bg-white shadow-sm">
                        <div className="flex items-center gap-4">
                            <img src={item.url} alt={item.name} className="w-16 h-16 object-cover rounded" />
                            <div>
                                <h3 className="font-bold">{item.name}</h3>
                                <p className="text-sm text-gray-600">Unitário: R$ {Number(item.price).toFixed(2)}</p>
                                <p className="text-xs text-red-500">Estoque máximo: {item.stock}</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <div className="flex items-center border rounded">
                                <button onClick={() => decreaseQuantity(item.id)} className="px-3 py-1 bg-gray-200 hover:bg-gray-300">-</button>
                                <span className="px-4">{item.quantity}</span>
                                <button onClick={() => increaseQuantity(item.id, item.stock)} className="px-3 py-1 bg-gray-200 hover:bg-gray-300">+</button>
                            </div>
                            <p className="font-bold min-w-[100px]">R$ {(item.price * item.quantity).toFixed(2)}</p>
                            <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 font-bold">
                                Remover
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-8 text-right bg-gray-100 p-4 rounded shadow-sm">
                <h3 className="text-xl font-bold">Total da Compra: R$ {cartTotal.toFixed(2)}</h3>
                <button className="mt-4 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 font-bold">
                    Finalizar Compra
                </button>
            </div>
        </div>
    );
}