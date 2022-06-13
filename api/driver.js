import axios from 'axios';

const driverApi = {
  async fetchAll() {
    const { apiUrl } = process.env;

    try {
      const { data: drivers } = await axios.get(`${apiUrl}/driver`);
      return drivers;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
};

export default driverApi;
