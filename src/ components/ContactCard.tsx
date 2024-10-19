import React from 'react';
import { Link } from 'react-router-dom';
import { Contact } from '../types/Contact';

interface ContactCardProps {
  contact: Contact;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact }) => {
  return (
    <div className="flex items-center justify-between p-4 rounded-md bg-gray-100 hover:bg-gray-300 transition duration-300">
      <Link to={`/contato/${contact.identity}`} className="flex items-center">
        <div className="contact-card">
          <h6 className="block font-sans text-base font-semibold leading-relaxed tracking-normal text-blue-gray-900 antialiased">
            { contact.name }
          </h6>
          <p className="block font-sans text-sm font-light leading-normal text-gray-700 antialiased">
            Grupo: { contact.group }
          </p>
          <p className="block font-sans text-sm font-light leading-normal text-gray-700 antialiased">
            Última mensagem: { new Date(contact.lastMessageDate).toLocaleString() }
          </p>
          <p className="block font-sans text-sm font-light leading-normal text-gray-700 antialiased">
            Última atualização: { new Date(contact.lastUpdateDate).toLocaleString() }
          </p>
          <h5 
            className="block font-sans text-base font-semibold leading-relaxed tracking-normal text-blue-gray-900 antialiased"
          >
            Clique para ver a conversa!
          </h5>
        </div>
      </Link>
    </div>
  );
};

export default ContactCard;
