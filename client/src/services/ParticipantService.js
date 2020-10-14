import axios from 'axios';

const PARICIPANT_API_BASE_URL = "http://localhost:8000/api/main/getRecord";

class ParticipantService {

  getParticipants(){
  return axios.get(PARICIPANT_API_BASE_URL);
}
}

export default new ParticipantService();