
export const init = {
    isLoggedIn: typeof window !== "undefined"?false:sessionStorage.validUser,
    user : '',
} 
