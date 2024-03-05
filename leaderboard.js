function ask_mixtral(chat_history) {
    for (let i = 0; i < chat_history.length; i++) {
        //
    }
    let prompt = "";
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
    fetch(req)
    .then((response) => {
        if (response.status == 200) {
            // TODO : ok
        } else {
            // TODO : pas ok
        }
    });
    return chat_history, response
}
