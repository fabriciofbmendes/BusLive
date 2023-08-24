import axios from 'axios';

//const API_URL = 'http://localhost:3000';
const API_URL = 'http://10.1.12.28:3001';

export const getVehicleLocation = async (vehicleId : any) => {
  try {
    const response = await axios.get(`${API_URL}/location/${vehicleId}`);
    return response.data;
  } catch (error) {
    console.log("erro");
  }
};