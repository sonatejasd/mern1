export default class Ajax {
    
    static baseUrl: string = "https://mern1-server-student.vercel.app";
    static async post(path: string, data: object) {
        let response;
        try {
            response = await fetch(Ajax.baseUrl+path,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }
            );
        } catch (e: any) {
            console.error(e?.message);
        }
        finally {
            return response;
        };
    }
}
