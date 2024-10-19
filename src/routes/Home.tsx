import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Contact } from '../types/Contact';
import ContactCard from '../ components/ContactCard';
import { generateUUID } from '../utils/generateUUID';
import { BodyReq } from '../types/BodyReq';
import { fetchData } from '../utils/fetchData';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [page, setPage] = useState(1);
  const [contactsPerPage, setcontactsPerPage] = useState(4);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handlecontactsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const num = Number(event.target.value);

    if (num >= 1) {
      setcontactsPerPage(num);
    }
  };

  useEffect(() => {
    const apiKey = localStorage.getItem('apiKey');
    
    const fetchContacts = async () => {
      if (!apiKey) {
        navigate('/login');
        return null
      }

      try {
        const bodyReq: BodyReq = { 
          "id": `${generateUUID()}`,
          "to": "postmaster@crm.msging.net",
          "method": "get",
          "uri": "/contacts?$skip=0&$take=100"
        }
        
        const response = await fetchData(apiKey, bodyReq)

        if (!response.ok) {
          throw new Error('Falha ao carregar mensagens');
        }

        const data = await response.json();
        setContacts(data.resource.items || []);
      } catch (err) {
        setError('Erro ao carregar mensagens');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, [navigate, page, contactsPerPage]);

  if (loading) return <p>Carregando...</p>;

  if (error) return <p>{error}</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-600">
      <div className="max-w-[720px] mx-auto">
        <div className="flex justify-center items-center flex-wrap p-6 bg-gray-50">
          <label
            className="font-semibold text-base text-gray-700 pr-2 block"
          >
            Número de contatos por página:
          </label>
          <input
            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-20"
            type="number"
            id="takeInput"
            value={contactsPerPage}
            onChange={handlecontactsPerPage}
            min="1"
          />
        </div>
        <div className="relative flex w-96 flex-col rounded-sm bg-white bg-clip-border text-gray-700 shadow-md">
          <div className="p-6">
            <div className="mb-4 flex items-center justify-between">
                <h5 className="block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                    Contatos
                </h5>
            </div>
            <div className="divide-y divide-gray-200">
              {contacts
                .slice((page - 1) * contactsPerPage, page * contactsPerPage)
                .map((contact) => (
                  <ContactCard key={contact.identity} contact={contact} />
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center flex-wrap p-6">
          <button 
            className="text-base rounded-r-none hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer hover:bg-gray-200  bg-gray-100 text-gray-700 border duration-200 ease-in-out border-gray-600 transition"
            disabled={page === 1} 
            onClick={() => setPage(page - 1)}
          >
            <div className="flex leading-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-chevron-left w-5 h-5 ml-1">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                Anterior
            </div>
          </button>
          <button
            className="text-base rounded-l-none border-l-0 hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer hover:bg-teal-200 bg-teal-100 text-teal-700 border duration-200 ease-in-out border-teal-600 transition"
            onClick={() => setPage(page + 1)}
          >
            <div className="flex leading-5">
              Próximo
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-chevron-right w-5 h-5 ml-1">
                  <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
