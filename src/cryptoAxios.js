// const axios = require('axios');

// const options = {
//     method: 'GET',
//     baseURL: 'https://coinranking1.p.rapidapi.com/',
//     params: {
//         referenceCurrencyUuid: 'yhjMzLPhuIDl',
//         timePeriod: '24h',
//         'tiers[0]': '1',
//         orderBy: 'marketCap',
//         orderDirection: 'desc',
//         limit: '50',
//         offset: '0'
//     },
//     headers: {
//         'X-RapidAPI-Key': 'c4ba9b1d19msh8b7f1e45b2d69a2p130bc3jsnc6a96f7fc801',
//         'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
//     }
// };

// try {
//     const response = await axios.request(options);
//     console.log(response.data);
// } catch (error) {
//     console.error(error);
// }



import axios from "axios";

const instance = axios.create({
    method: 'GET',
    baseURL: 'https://coinranking1.p.rapidapi.com/',
    params: {
        referenceCurrencyUuid: 'yhjMzLPhuIDl',
        // timePeriod: '24h',
        'tiers[0]': '1',
        orderBy: 'marketCap',
        orderDirection: 'desc',
        limit: '100',
        offset: '0'
    },
    headers: {
        'X-RapidAPI-Key': 'c4ba9b1d19msh8b7f1e45b2d69a2p130bc3jsnc6a96f7fc801',
        'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }
})

// instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

instance.interceptors.request.use(request => {
    console.log(request);
    return request;
})

export default instance; 