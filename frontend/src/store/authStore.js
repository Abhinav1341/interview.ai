import {create} from zustand;

export const useAuthStore = create((set) => (
    {
        token: null, 
        isAuthenticated: false,
        user: null,
        login: async(email,password) => {
            try {
                const res = await fetch("http://localhost:5000/api/auth/login", {
                    method : "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                });
                const data = await res.json();
                if(res.ok){
                    set({token : data.token, isAuthenticated: true});
                } else {
                    throw new Error(data.message || "Login Failed");
                }
            }
            catch(error){
                console.log("Login Error: ", error.message);
                throw error;
            }
        },
    }
))