import { API_URL } from "./config";

export async function getProducts() {}

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

export async function updateProduct() {}

export async function deleteProduct() {}

export async function searchProducts() {}