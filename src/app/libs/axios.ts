import axios from 'axios';

export default axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/api/'
      : 'https://pevelosa-twitter-clone.vercel.app/api',
});
