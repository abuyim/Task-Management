import axiosClient from 'axios';

const apiClient = axiosClient.create({
    baseURL: "https://localhost:7254/api",
    headers: {
    'Content-Type': 'application/json',
  }
    
})

apiClient.interceptors.request.use((config)=>{
    const token= localStorage.getItem('token');
    if(token)
    {
        config.headers['Authorization']=`Bearer ${token}`;
    }
    return config;
},
(error)=>{
    return Promise.reject(error);
})

apiClient.interceptors.response.use((reponse)=>{
return reponse;},
(error)=>{
    if(error.response){
        console.error('Error: ', error.response.status,error.response.data);
    }else{
        console.error("Network error", error.message);
    }
    return Promise.reject(error);
}
)

export default apiClient;