
import url from './url'
const axios = require('axios').default;


export const getBanners=async()=>{
    try {
        const {data:res}=await axios.get(`${url}/banner`);
        return res;
    } catch (error) {
        console.log(error)
    }
}