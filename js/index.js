import { questions } from './questions.js';

// cool color function : https://www.desmos.com/calculator/oaabzhiqau

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
        case 0: {
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
        case 1: {
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
        case 2: {
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
        case 3: {
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