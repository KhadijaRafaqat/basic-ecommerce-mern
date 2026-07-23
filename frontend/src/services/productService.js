import { API_URL } from "./config";



export async function getProduct(id) {
  const response = await fetch(`${API_URL}/products/${id}`);
  const result = await response.json();

  return {
    ok: response.ok,
    data: result,
  };
}

export async function getProducts() {
    const response = await fetch(`${API_URL}/products`);
    const result = await response.json();


    return{
        ok: response.ok,
        data:result,
    }
}

export async function addProduct(productData) {
    const response = await fetch (`${API_URL}/add-product`,{
        method:"POST",
        headers:{
            "Content-Type":'application/json',
        },
        body: JSON.stringify(productData),
    });

    const result = await response.json();
    return{
        ok: response.ok,
        data:result,
    };

}

export async function updateProduct(id, productData) {

    const response = await fetch(`${API_URL}/products/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
    });

    const result = await response.json();

    return {
        ok: response.ok,
        data: result,
    };
}

export async function deleteProduct(id) {
    const response = await fetch(`${API_URL}/product/${id}`,{
        method:"DELETE",
    });

    const result = await response.json();


    return {
        ok:response.ok,
        data:result,
    }
}

export async function searchProducts(key) {
    const response = await fetch(`${API_URL}/search/${key}`);

    const result = await response.json();

    return {
        ok: response.ok,
        data: result,
    };
}