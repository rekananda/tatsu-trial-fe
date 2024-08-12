interface ConfigType {
  env: string;
  API_URL?: string;
}

const CONFIG: ConfigType = {
  API_URL: import.meta.env.MODE === 'production' ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV,
  env: import.meta.env.VITE_ENV || import.meta.env.MODE,
};

export default CONFIG;
