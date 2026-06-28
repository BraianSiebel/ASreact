import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    const nameRef = useRef();
    const descRef = useRef();
    const priceRef = useRef();
    const stockRef = useRef();
    const urlRef = useRef();

    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const newErrors = {};
        
        if (!nameRef.current.value.trim()) {
            newErrors.name = "O nome é obrigatório";
        }
        if (!descRef.current.value.trim()) {
            newErrors.desc = "A descrição é obrigatória";
        }

        const priceVal = Number(priceRef.current.value);
        if (priceRef.current.value.trim() === "" || priceVal < 0) {
            newErrors.price = "O preço deve ser maior ou igual a zero";
        }

        const stockVal = Number(stockRef.current.value);
        if (stockRef.current.value.trim() === "" || stockVal < 0) {
            newErrors.stock = "O estoque deve ser maior ou igual a zero";
        }

        if (!urlRef.current.value.trim()) {
            newErrors.url = "A URL da imagem é obrigatória";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            
            if (newErrors.name) nameRef.current.focus();
            else if (newErrors.desc) descRef.current.focus();
            else if (newErrors.price) priceRef.current.focus();
            else if (newErrors.stock) stockRef.current.focus();
            else if (newErrors.url) urlRef.current.focus();
            
            return;
        }

        setErrors({});

        const newProduct = {
            name: nameRef.current.value,
            description: descRef.current.value,
            price: priceVal,
            stock: stockVal,
            url: urlRef.current.value
        };

        try {
            const response = await fetch("http://localhost:3001/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newProduct)
            });

            if (response.ok) {
                navigate("/");
            }
        } catch (error) {
            console.error("Erro ao cadastrar produto:", error);
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-xl">
            <h2 className="text-2xl font-bold mb-6 text-center">Cadastro de Produto</h2>
                <form onSubmit={handleSubmit} noValidate className="bg-white p-6 border rounded shadow-sm">                
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Nome do Produto</label>
                    <input ref={nameRef} type="text" className={`w-full border rounded px-3 py-2 ${errors.name ? 'border-red-500 focus:outline-red-500' : ''}`} />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Descrição</label>
                    <textarea ref={descRef} className={`w-full border rounded px-3 py-2 ${errors.desc ? 'border-red-500 focus:outline-red-500' : ''}`} rows="3"></textarea>
                    {errors.desc && <p className="text-red-500 text-sm mt-1">{errors.desc}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Preço</label>
                        <input ref={priceRef} type="number" step="0.01" min="0" className={`w-full border rounded px-3 py-2 ${errors.price ? 'border-red-500 focus:outline-red-500' : ''}`} />
                        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Estoque</label>
                        <input ref={stockRef} type="number" min="0" className={`w-full border rounded px-3 py-2 ${errors.stock ? 'border-red-500 focus:outline-red-500' : ''}`} />
                        {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2">URL da Imagem</label>
                    <input ref={urlRef} type="text" className={`w-full border rounded px-3 py-2 ${errors.url ? 'border-red-500 focus:outline-red-500' : ''}`} />
                    {errors.url && <p className="text-red-500 text-sm mt-1">{errors.url}</p>}
                </div>

                <button type="submit" className="w-full bg-blue-500 text-white font-bold px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                    Cadastrar Produto
                </button>
            </form>
        </div>
    );
}