import { API_URL } from "./config.js";

export async function registerUser(userData) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });


  const result = await response.json();


  return {
    
    ok: response.ok,
    data: result,
  };
}

// export async function loginUser(userData){
//     const response = await fetch(`${API_URL}/login`, {
//         method : "POST",
//         headers: {
//             "Content-Type":"application/json",
//         },

//         body:JSON.stringify(userData),
//     });
//         return response.json();

// }
