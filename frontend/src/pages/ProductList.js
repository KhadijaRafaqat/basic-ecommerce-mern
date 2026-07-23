import {Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProducts, deleteProduct, searchProducts } from '../services/productService';


function ProductList() {
    const [searchKey, setSearchKey] = useState("");

    const [products, setProducts] = useState([]);

    useEffect(() => {
        loadProducts();

    }, []);


    const loadProducts = async () => {
        const response = await getProducts();
        if (response.ok) {
            setProducts(response.data.products);
        }
    };


    const handleDelete = async(id)=>{
        const response = await deleteProduct(id);

        if(response.ok){
            loadProducts();
        }else{
            alert(response.data.message);
        }
    }
const handleSearch = async (key) => {

    setSearchKey(key);

    if (key === "") {
        loadProducts();
        return;
    }

    const response = await searchProducts(key);

    if (response.ok) {
        setProducts(response.data.products);
    }
};
    return(
  <div>
    <input
    type="text"
    placeholder="Search products..."
    value={searchKey}
    onChange={(e) => handleSearch(e.target.value)}
/>
    <h1>Product List</h1>

    {products.map((item) => (
  <div key={item._id}>
    <h2>{item.name}</h2>
    <p>{item.price}</p>
    <Link to={`/update/${item._id}`}>
    <button>Edit</button>
</Link>
    <button onClick={() => handleDelete(item._id)}>
      Delete
    </button>
    <hr />
  </div>
))}
  </div>
    )
}
export default ProductList;