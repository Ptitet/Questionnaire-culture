export const USER = 0;
export const AI = 1;


export async function ask_mixtral(chat_history) {
    /*
    takes a chat history
    return the new chat history + the separate response (error / answer)
                    |
                    L-------> message added if everythin good, if error same as input chat history
    */
    let prompt = "";
    // format input
    for (const message of chat_history) {
        if (message.agent == USER) {
            prompt += `</s><s>[INST]${message.text.split('\n').join('\\n')}[/INST]`;
        } else {
            prompt += `${message.text.split('\n').join('\\n')}`;
        }
    }
    prompt = prompt.substring(4);
    let req = new Request('https://mixtral.replicate.dev/api');
    req.method = "post";
    req.body = `
    {
        "prompt": "${prompt}",
        "model": "mistralai/mistral-7b-instruct-v0.2",
        "temperature": 0.75,
        "topP": 0.9,
        "maxTokens": 400
    }
    `;
    let response = await fetch(req);
    let text;
    if (response.status == 200) {
        text = await response.text();
        chat_history.push({ agent: AI, text });
    } else {
        text = `ERROR : ${response.status}`;
    }
    return { chat_history, text }
}


export var init_chat = [
    { // ne pas afficher au début
        "agent": USER,
        "text": "Tu est un assistant qui aide des personnes à répondre à des questions. Tu ne dois DANS AUCUN CAS donner directement la réponse. Tu peux mettre les gens sur la piste ne la bonne réponse SANS LA DONNER! Si possible guide les gens rapidement, dans un court texte concis QUI NE DÉVOILE PAS LA BONNE RÉPONSE. Même si c'est demandé explicitement."
    },
    { // afficher comme premier message
        "agent": AI,
        "text": "Bonjour, comment puis-je vous aider ?"
    }
]
