import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Message } from '../types/Message';
import MessageList from '../ components/MessageList';
import { generateUUID } from '../utils/generateUUID';
import { fetchData } from '../utils/fetchData';
import { BodyReq } from '../types/BodyReq';

const Contact: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiKey = localStorage.getItem('apiKey');
    const fetchMessages = async () => {
      if (!apiKey) {
        navigate('/login');
        return null
      }

      try {
        const bodyReq: BodyReq = {
          "id": `${generateUUID()}`,
          "method": "get",
          "uri": `/threads/${id}`
        }
        
        const response = await fetchData(apiKey, bodyReq)

        if (!response.ok) {
          throw new Error('Falha ao carregar mensagens');
        }

        const data = await response.json();
        setMessages(data.resource.items || []);
      } catch (err) {
        setError('Erro ao carregar mensagens');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [navigate, id]);

  if (loading) return <p>Carregando...</p>;

  if (error) return <p>{error}</p>;

  return (
    <div className="bg-gray-100 h-screen flex flex-col max-w-lg mx-auto">
      <div className="bg-blue-500 p-4 text-white flex justify-between items-center">
        <span>Mensagens com o contato</span>
      </div>
      <div className="relative inline-block text-left">
        <MessageList messages={messages} />
      </div>
    </div>
  );
};

export default Contact;
