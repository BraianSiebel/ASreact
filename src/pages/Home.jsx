import { useState, useEffect } from "react";
import Card from "../components/Card";

export default function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch("http://localhost:3001/products");
            const data = await response.json();
            setProducts(data);
        };

        fetchProducts();
    }, []);

    return (
        <>
            <div className="container mx-auto p-4">
                <h2 className="text-2xl font-bold mb-4">Bem-vindo ao Meu E-commerce!</h2>
                <p>Explore nossos produtos e aproveite as ofertas especiais.</p>
            </div>
            <section className="container mx-auto p-4">
                <h2 className="text-2xl font-bold mb-4">Produtos em Destaque</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {products.map((product) => (
                        <Card key={product.id} product={product} />
                    ))}
                </div>
            </section>
        </>

    )
}