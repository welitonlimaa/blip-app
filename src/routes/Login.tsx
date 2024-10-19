import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateUUID } from '../utils/generateUUID';
import { BodyReq } from '../types/BodyReq';
import { fetchData } from '../utils/fetchData';

const Login: React.FC = () => {
  const [apiKey, setApiKey] = useState<string>('');
  const navigate = useNavigate();

  const validateApiKey = async (key: string): Promise<boolean> => {
    try {
      const bodyReq: BodyReq = { 
        "id": `${generateUUID()}`,
        "to": "postmaster@crm.msging.net",
        "method": "get",
        "uri": "/contacts?$skip=0&$take=1"
    }
      
      const response = await fetchData(apiKey, bodyReq)
      return response.ok;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await validateApiKey(apiKey);
    if (isValid) {
      localStorage.setItem('apiKey', apiKey);
      navigate('/');
    } else {
      alert('Chave inválida!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-600 flex flex-col justify-center sm:py-12">
        <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
          <img 
            src="https://www.blip.ai/wp-content/uploads/2023/06/logotipo.svg" 
            className="attachment-full size-full wp-image-17306 ls-is-cached lazyloaded" 
            alt="blip logo" 
            data-src="https://www.blip.ai/wp-content/uploads/2023/06/logotipo.svg" 
          />
          <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
            <form className="px-5 py-7" onSubmit={handleSubmit}>
              <label className="font-semibold text-sm text-gray-600 pb-1 block">Sua ApiKey</label>
              <input
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Insira a chave da API"
              />
              <button
                className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                type="submit"
              >
                <span className="inline-block mr-2">Login</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
