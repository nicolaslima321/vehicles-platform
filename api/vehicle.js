import axios from 'axios';

const vehicleApi = {
  async fetchAll(filterOptions) {
    const { apiUrl } = process.env;

    try {
      const { data: vehicles } = await axios.get(`${apiUrl}/vehicle`, { params: filterOptions });
      return vehicles;
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  async find(id) {
    const { apiUrl } = process.env;

    try {
      const { data: vehicle } = await axios.get(`${apiUrl}/vehicle/${id}`);
      return vehicle;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async create(params) {
    const { apiUrl } = process.env;

    try {
      await axios.post(`${apiUrl}/vehicle`, params);
      return true;
    } catch (error) {
      console.log(error);
      return false
    }
  },

  async update(params = { id }) {
    const { apiUrl } = process.env;

    try {
      await axios.patch(`${apiUrl}/vehicle/${id}`, { params });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async delete(id) {
    const { apiUrl } = process.env;

    try {
      await axios.delete(`${apiUrl}/vehicle/${id}`);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
}

export default vehicleApi;
