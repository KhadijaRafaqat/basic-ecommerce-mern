import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProduct, updateProduct } from '../services/productService';


function UpdateProduct() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");


    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        loadProduct();
    }, []);

    const loadProduct = async () => {

        const response = await getProduct(id);

        if (response.ok) {
            console.log(response);

            setName(response.data.product.name);
            setPrice(response.data.product.price);
            setCategory(response.data.product.category);
            setCompany(response.data.product.company);

        }

    }

    const handleUpdate = async (e)=>{
        e.preventDefault();

        const response = await updateProduct(id,{
            name,
            price,
            category,
            company,
        });

        if(response.ok){
            navigate('/');
        }else {
            alert(response.data.message);
        }



        console.log(response);
    }
    return (
       <form onSubmit={handleUpdate}>
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

                    <button type="submit">Update Product</button>
                </form>
    );
}

export default UpdateProduct;