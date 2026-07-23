import { useEffect, useState } from 'react';
import { getProducts } from '../services/productService';

function ProductList() {

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


    return(
  <div>
    <h1>Product List</h1>

    {products.map((item) => (
      <div key={item._id}>
        <h2>{item.name}</h2>
        <p>{item.price}</p>
        <p>{item.category}</p>
        <p>{item.company}</p>
        <hr />
      </div>
    ))}
  </div>
    )
}
export default ProductList;