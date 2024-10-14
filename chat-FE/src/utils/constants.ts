export interface EnvVariables {
    apiBaseURL: string;
    socketBaseUrl: string;
  }
  
  const env: EnvVariables = {
    apiBaseURL: process.env.REACT_APP_API_BASE || 'http://localhost:4200',
    socketBaseUrl: process.env.REACT_APP_SOKET_BASE || 'http://localhost:8001'
  };
  
  export default env;
  