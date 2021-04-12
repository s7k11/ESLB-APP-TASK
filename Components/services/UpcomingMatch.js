
import url from './url'
const axios = require('axios').default;


export const getUpcomingMatch=async()=>{
    try {
        const {data:res}=await axios.get(`${url}/upcomingMatches`);
        return res;
    } catch (error) {
        console.log(error)
    }
}