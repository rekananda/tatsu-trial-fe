import CONFIG from '@/config';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCookies from './useCookies';

function useAPI<T=any, B=any>(url: string) {
  const [data, setData] = useState<T|null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [loading, setLoading] = useState(false);
  const { value: token, removeValue } = useCookies("token");
  const endpointApi = CONFIG.API_URL || "http://localhost:8000/";
  const navigate = useNavigate();

  let axiosConfig:AxiosRequestConfig = {}

  if (token) {
    axiosConfig = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  }

  const errorHandler = (err: AxiosError) => {
    if(err.response?.status === 401){
      removeValue();
      navigate("/");
    } else {
      setError(err);
    }
  }

  const GET = async (config?: AxiosRequestConfig) => {
    setLoading(true);
    try {
      const response = await axios.get<T>(`${endpointApi}${url}`, {...axiosConfig, ...config});
      setData(response.data);
    } catch (err) {
      errorHandler(err as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  const POST = async (body: B, config?: AxiosRequestConfig) => {
    setLoading(true);
    try {
      const response = await axios.post<T>(`${endpointApi}${url}`, body, {...axiosConfig, ...config});
      setData(response.data);
    } catch (err) {
      errorHandler(err as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  const PUT = async (body: B, config?: AxiosRequestConfig) => {
    setLoading(true);
    try {
      const response = await axios.put<T>(`${endpointApi}${url}`, body, {...axiosConfig, ...config});
      setData(response.data);
    } catch (err) {
      errorHandler(err as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  const DELETE = async (config?: AxiosRequestConfig) => {
    setLoading(true);
    try {
      await axios.delete(`${endpointApi}${url}`, {...axiosConfig, ...config});
      setData(null);
    } catch (err) {
      errorHandler(err as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, GET, POST, PUT, DELETE };
};

export default useAPI;