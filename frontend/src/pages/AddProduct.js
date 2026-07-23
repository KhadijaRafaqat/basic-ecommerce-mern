import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../services/productService";


function AddProduct() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const navigate = useNavigate();

    const handleAddProduct = async (e) =>{
        e.preventDefault();

        if (!name || !price || !category || !company){
            alert("Please fill all fields.");
            return;
        }

        const user = JSON.parse(localStorage.getItem("user"));

        const response = await addProduct({
            name,
            price,
            category,
            company,
            userId: user.user._id,
        });

        if (response.ok){
            alert("Product added successfully");
            navigate('/');
        }else{
            alert(response.data.message);
        }
    }


    return (
        <div className="register-container">
            <div className="register-card">
                <h1>Add Product</h1>
                <p>Add a new product</p>

                <form onSubmit={handleAddProduct}>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Enter Product Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <input
                            type="number"
                            placeholder="Enter Product Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Enter Product Category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Enter Company Name"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                        />
                    </div>

                    <button type="submit">Add Product</button>
                </form>
            </div>
        </div>

    )

}

export default AddProduct;