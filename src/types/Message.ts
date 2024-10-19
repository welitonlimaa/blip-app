export interface Message {
    id: string;
    direction: 'sent' | 'received';
    type: string;
    content: string;
    date: string;
    status: string;
}
  