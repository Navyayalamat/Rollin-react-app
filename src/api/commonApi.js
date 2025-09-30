
const api = axios.create({
  baseURL: 'localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
