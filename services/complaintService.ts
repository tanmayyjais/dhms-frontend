import axios from 'axios';

const API_URL = 'http://192.168.1.102:5000/api/complaints';

interface ComplaintResponse {
  message: string;
}

const createComplaint = async (complaintText: string): Promise<ComplaintResponse> => {
  const response = await axios.post<ComplaintResponse>(API_URL, { complaintText });
  return response.data;
};

export default { createComplaint };
