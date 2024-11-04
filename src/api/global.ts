import axios from 'axios';

class Global {
  /**  CONFIG  **/ 

  async getServerConfig(): Promise<void> {
    await axios.get(`/server/config`); // global config??
  }
  
  async getDefaultServerConfig(): Promise<void> {
    await axios.put(`/server/config`); 
  }
}

export default new Global;
