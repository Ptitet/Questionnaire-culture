var USER = 0;
var AI = 1;


function ask_mixtral(chat_history) {
    /*
    takes a chat history
    return the new chat history + the separate response (error / answer)
                    |
                    L-------> message added if everythin good, if error same as input chat history
    */
    let prompt = "";
    // format input
    for (let i = 0; i < chat_history.length; i++) {
        if (chat_history[i]["agent"] == USER) {
            prompt += `</s><s>[INST]${chat_history[i]["text"].split('\n').join('\\n')}[/INST]`;
        } else {
            prompt += `${chat_history[i]["text"].split('\n').join('\\n')}`;
        }
    }
    prompt = prompt.substring(4);
    let req = new Request('https://mixtral.replicate.dev/api');
    req.method = "post";
    req.body = `
    {
        "prompt":
        "${prompt}",
        "model": "mistralai/mistral-7b-instruct-v0.2",
        "temperature": 0.75,
        "topP": 0.9,
        "maxTokens": 800
    }
    `;
    let response;
    fetch(req)
    .then((resp) => {
        if (resp.status == 200) {
            let message = response.body;
            chat_history.push({"agent": AI, "text": message});
            response = message;
        } else {
            response = `ERROR : ${resp.status}`;
        }
    });
    return chat_history, response
}


var init_chat = [
    { // ne pas afficher au début
        "agent": USER,
        "text": "Tu est un assistant qui aide des personnes à répondre à des questions. Tu ne dois DANS AUCUN CAS donner directement la réponse. Tu peux mettre les gens sur la piste ne la bonne réponse SANS LA DONNER!"
    },
    { // afficher comme premier message
        "agent": AI,
        "text": "Bonjour, comment puis-je vous aider ?"
    }
]
