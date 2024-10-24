import axios from 'axios';

const instance = axios.create({
    method: 'GET',
    baseURL: 'https://cryptocurrency-news2.p.rapidapi.com/v1/coindesk',
    headers: {
      'X-RapidAPI-Key': 'c4ba9b1d19msh8b7f1e45b2d69a2p130bc3jsnc6a96f7fc801',
      'X-RapidAPI-Host': 'cryptocurrency-news2.p.rapidapi.com'
    }
})


instance.interceptors.request.use(request => {
    return request;
});

export default instance;




// const axios = require('axios');

// const options = {
//     method: 'GET',
//     url: 'https://cryptocurrency-news2.p.rapidapi.com/v1/coindesk',
//     headers: {
//         'X-RapidAPI-Key': 'c4ba9b1d19msh8b7f1e45b2d69a2p130bc3jsnc6a96f7fc801',
//         'X-RapidAPI-Host': 'cryptocurrency-news2.p.rapidapi.com'
//     }
// };

// try {
//     const response = await axios.request(options);
//     console.log(response.data);
// } catch (error) {
//     console.error(error);
// }