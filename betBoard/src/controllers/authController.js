import api from '../services/api';

const AuthController = {
    
    async registerUser(formData){
        try{
            const response = await api.post('user/register/', formData);
            return response.data;
        }catch(error){
            console.error('Error during registration:', error);
            throw error;
        }
    },
    
    async loginUser(formData){
        try{
            const response = await api.post('auth/login/', formData);
            if(response.data && response.data.access){
                localStorage.setItem('accessToken', response.data.access);
                localStorage.setItem('refreshToken', response.data.refresh);
            }
            return response.data;
        }catch(error){
            console.error('Error during login:', error);
            throw error;
        }
    }

}

export default AuthController;