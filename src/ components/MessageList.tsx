import React from 'react';
import { Message } from '../types/Message';

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="flex flex-col space-y-2">
      {messages.length === 0 ? (
        <p>Nenhuma mensagem encontrada.</p>
      ) : (
        <ul>
          {messages.map((message) => (
            <div className={`flex ${message.direction === 'sent' ? 'justify-end' : ''}`}>
              <div className="bg-blue-200 text-black p-2 rounded-lg max-w-xs">
                <strong>
                  {message.direction === 'sent' ? 'Bot' : 'User'}:
                </strong> 
                {message.content}
                <br />
                <small>{new Date(message.date).toLocaleString()}</small>
                <br />
                <em>Status: {message.status}</em>
              </div>
            </div>
          ))}
        </ul>
      )}
      </div>
    </div>
  );
};

export default MessageList;

