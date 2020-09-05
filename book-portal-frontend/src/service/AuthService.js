import axios from "axios";



export const login = (user) => {

    console.log(user.username + " " + user.password);
    const auth =  "username=" + user.username + "&password=" + user.password;

    return axios.post("/login", (auth)).then((response) => {
        console.log("Login response: " + response);
         return axios.get("/api/users/get" ,{
             username:user.username,
             id:2,
             password:null
         }).then(resp => {
              console.log(resp);
            return { 
                    id: resp.data.id,
                    role: resp.data.roles[0].name
                }

            });
    });
};

export const logout = () => {
    
    //console.log(sessionStorage.username + " " + sessionStorage.password);
    const auth =  "username=" + sessionStorage.username ;
    const response = axios.post("/logout", (auth));
    
    if(sessionStorage.getItem("isLogged") !== null){
        sessionStorage.setItem("isLogged",false);
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("role");
        sessionStorage.removeItem("id");
        console.log("Logout succesful");
    }
    return response;
    
};

export const isLogged = () => {
    if(sessionStorage.getItem("isLogged") !== null){
        const isLogged = sessionStorage.getItem("isLogged");
        return isLogged;
    }
    return false;

}

export const isAdmin = () => {
    
    //console.log("role: " + sessionStorage.getItem("role") + "     isAdmin: " + (isLogged() && role === "ROLE_ADMIN"));
    
    if(isLogged()){
        const role = sessionStorage.getItem("role");
        return  role === "ROLE_ADMIN";
    }
    return false;
}

export const isUser = () => {

    if(isLogged()){
        const role = sessionStorage.getItem("role");
        return  role === "ROLE_USER";
    }
    return false;
    
}