import { questions } from './questions.js';
import { init_chat, ask_mixtral, USER } from './ai_chat.js';

const qList = document.querySelector('#q-list');

for (const [i, question] of Object.entries(questions)) {
    const qContainer = document.createElement('li');
    qContainer.dataset.qIndex = i;

    const questionNumber = document.createElement('h2');
    const qn = +i + 1;
    questionNumber.innerText = `Question n°${qn}`;
    qContainer.appendChild(questionNumber);

    const qWrapper = document.createElement('div');
    qWrapper.classList.add('q-wrap');

    const questionText = document.createElement('div');
    questionText.classList.add('question');
    questionText.innerText = question.question;
    qWrapper.appendChild(questionText);

    const answersContainer = document.createElement('div');
    answersContainer.classList.add('answers');

    switch (question.responseType) {
        case 0: { // radio
            for (let answer of question.answers) {
                let answerElement = document.createElement('div');
                answerElement.classList.add('answer');
                const input = document.createElement('input');
                input.type = 'radio';
                input.name = `q${qn}`;
                input.id = `q${qn}-${answer}`;
                answerElement.appendChild(input);
                const label = document.createElement('label');
                label.innerText = answer;
                label.htmlFor = input.id;
                answerElement.appendChild(label);
                answersContainer.appendChild(answerElement);
            }
            break;
        }
        case 1: { // checkbox
            for (let answer of question.answers) {
                let answerElement = document.createElement('div');
                answerElement.classList.add('answer');
                const input = document.createElement('input');
                input.type = 'checkbox';
                input.name = `q${qn}`;
                input.id = `q${qn}-${answer}`;
                answerElement.appendChild(input);
                const label = document.createElement('label');
                label.innerText = answer;
                label.htmlFor = input.id;
                answerElement.appendChild(label);
                answersContainer.appendChild(answerElement);
            }
            break;
        }
        case 2: { // select
            const answerElement = document.createElement('div');
            answerElement.classList.add('answer');
            const selectWrapper = document.createElement('div');
            selectWrapper.classList.add('select-wrapper');
            const select = document.createElement('select');
            select.name = `q${qn}`;
            select.id = ``
            for (let answer of question.answers) {
                const option = document.createElement('option');
                option.value = answer;
                option.innerText = answer;
                select.appendChild(option);
            }
            selectWrapper.appendChild(select);
            answerElement.appendChild(selectWrapper);
            answersContainer.appendChild(answerElement);
            break;
        }
        case 3: { // number
            const answerElement = document.createElement('div');
            answerElement.classList.add('answer');
            const input = document.createElement('input');
            input.type = 'number';
            input.name = `q${qn}`;
            answerElement.appendChild(input);
            answersContainer.appendChild(answerElement);
            break;
        }
    }

    qWrapper.appendChild(answersContainer);

    qContainer.appendChild(qWrapper);
    qList.appendChild(qContainer);
}

// chat
let current_chat = init_chat;
const chat_container = document.querySelector('#chat-body').querySelector('ul');
const chat_field = document.querySelector('#chat-write').querySelector('input');
document.querySelector('#chat-write').querySelector('button').addEventListener('clic', async () => {
    console.log('Here!');
    let input_txt = chat_field.value;
    chat_field.value = '';
    let new_chat = document.createElement('li');
    new_chat.innerText = input_txt;
    chat_field.appendChild(new_chat);
    // add to chat history
    current_chat.add({
        "agent": USER,
        "text": input_txt
    });
    current_chat, resp = await ask_mixtral(current_chat);
    let new_chat_resp = document.createElement('li');
    new_chat_resp.innerText = resp;
    chat_field.appendChild(new_chat_resp);
});
