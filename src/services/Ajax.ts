// export default class Ajax {

//     static baseUrl: string = "https://mern1-server-student.vercel.app";
//     static async post(path: string, data: object) {
//         const response = await fetch(Ajax.baseUrl + path,
//             {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                     // "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiJhZG1pbiIsImlhdCI6MTc0MDE0NjQzNH0.HxgZuQbcA-90NaJ2gV6w5Y9Hqgc0vZGuKSRwjJC9Ju4"
//                 },
//                 body: JSON.stringify(data)
//             }
//         );
//         return response;
//     }
// }


export default class Ajax {
    static baseUrl: string = "https://mern1-server-student.vercel.app";

    // Request Interceptor
    static requestInterceptor(path: string, options: RequestInit) {
        if(window !== undefined) {
        // Modify request (e.g., add auth token)
        const authToken = sessionStorage.getItem("loggedInUser");
        options.headers = {
            ...options.headers,
            Authorization: authToken ? authToken : "",
        };
    }
        return { path, options };
    }


    // Response Interceptor
    static async responseInterceptor(response: Response) {

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP Error ${response.status}`);
        }

        return response.json();
    }

    // Generic request method with interceptors
    static async request(method: string, path: string, data?: object) {
        const options: RequestInit = {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: data ? JSON.stringify(data) : undefined,
        };

        // Apply request interceptor
        const { path: modifiedPath, options: modifiedOptions } = Ajax.requestInterceptor(path, options);

        try {
            const response = await fetch(Ajax.baseUrl + modifiedPath, modifiedOptions);
            return Ajax.responseInterceptor(response);
        } catch (error) {
            console.error("Fetch Error:", error);
            throw error;
        }
    }

    // POST method
    static async post(path: string, data: object) {
        return Ajax.request("POST", path, data);
    }

    // GET method
    static async get(path: string) {
        return Ajax.request("GET", path);
    }

    // PUT method
    static async put(path: string, data: object) {
        return Ajax.request("PUT", path, data);
    }

    // DELETE method
    static async delete(path: string) {
        return Ajax.request("DELETE", path);
    }
}
