import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);

    // Atualiza o total sempre que o carrinho muda
    useEffect(() => {
        const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        setCartTotal(total);
    }, [cart]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);
            
            if (existingItem) {
                // Bloqueia se já atingiu o estoque
                if (existingItem.quantity >= product.stock) {
                    alert("Estoque máximo atingido para este produto!");
                    return prevCart;
                }
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const increaseQuantity = (id, stock) => {
        setCart((prevCart) =>
            prevCart.map((item) => {
                if (item.id === id) {
                    if (item.quantity >= stock) {
                        alert("Estoque máximo atingido!");
                        return item;
                    }
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            })
        );
    };

    const decreaseQuantity = (id) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    return (
        <CartContext.Provider value={{ cart, cartTotal, addToCart, increaseQuantity, decreaseQuantity, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
}