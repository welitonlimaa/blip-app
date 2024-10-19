import { BodyReq } from "../types/BodyReq";

export const fetchData = async (apiKey: string, body: BodyReq) => {
    const response = await fetch('https://http.msging.net/commands', {
        method: 'POST',
        headers: {
          'Authorization': `Key ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })

    if (!response.ok) {
        throw new Error('Falha ao carregar mensagens');
    }

    const result = await response;

    return result;
}
