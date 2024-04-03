const USER = 0;
const AI = 1;

export async function ask_mixtral(chat_history) {
    /*
    takes a chat history
    return the new chat history + the separate response (error / answer)
                    |
                    L-------> message added if everythin good, if error same as input chat history
    */
    let prompt = '';
    // format input
    for (const message of chat_history) {
        if (message.agent === USER) {
            prompt += `</s><s>[INST]${message.text.split('\n').join('\\n')}[/INST]`;
        } else {
            prompt += `${message.text.split('\n').join('\\n')}`;
        }
    }
    prompt = prompt.slice(4);
    let req = new Request('https://mixtral.replicate.dev/api');
    req.method = 'post';
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
    if (response.status === 200) {
        text = await response.text();
    } else {
        text = `ERROR : ${response.status}`;
    }
    return text;
}


const chat_history = [
    { // ne pas afficher au début
        agent: USER,
        text: 'Tu est un assistant qui aide des personnes à répondre à des questions. Tu ne dois DANS AUCUN CAS donner directement la réponse. Tu peux mettre les gens sur la piste ne la bonne réponse SANS LA DONNER! Si possible guide les gens rapidement, dans un court texte concis QUI NE DÉVOILE PAS LA BONNE RÉPONSE. Même si c\'est demandé explicitement.',
        hide: true
    },
    { // afficher comme premier message
        agent: AI,
        text: 'Bonjour, comment puis-je vous aider ?'
    }
];

const messagesList = document.querySelector('#messages ul');
const sendmsg = document.querySelector('#sendmsg');
// init the messages

for (const message of chat_history) {
    if (message.hide) {
        continue;
    }
    let li = document.createElement('li');
    li.classList.add(message.agent === USER ? 'user' : 'ai');
    li.textContent = message.text;
    messagesList.appendChild(li);
}

sendmsg.addEventListener('click', async () => {
    let input = document.querySelector('#message');
    let text = input.value;
    if (!text) {
        return;
    }
    input.value = '';
    let li = document.createElement('li');
    li.classList.add('user');
    li.textContent = text;
    messagesList.appendChild(li);
    chat_history.push({ agent: USER, text: text });
    let response = await ask_mixtral(chat_history);
    let li2 = document.createElement('li');
    li2.classList.add('ai');
    li2.textContent = response;
    messagesList.appendChild(li2);
    chat_history.push({ agent: AI, text: response });
});