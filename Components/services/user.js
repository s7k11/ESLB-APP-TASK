
import url from './url'
const axios = require('axios').default;
import EncryptedStorage from 'react-native-encrypted-storage';
import jwt_decode from "jwt-decode";

export const userLogin=async(formData)=>{
        return await axios.post(`${url}/login`,formData);
}

export const decodeUserJwt=async()=>{
    let encrypedTokenObj=await EncryptedStorage.getItem('user-token');
    if(encrypedTokenObj)
    {
        let decodedObj=jwt_decode(encrypedTokenObj);
        return decodedObj
    }
    else{
        return false
    }  
    
}

export const logout=async()=>{
    try {
        await EncryptedStorage.removeItem('user-token');
        return true
    } catch (error) {
        console.log(error)
    }
}