const questions = [
    {
        question: 'Dans quel sport ne joue-t-on pas avec une balle ?',
        responseType: 0, // 0: radio | 1: checkbox | 2: select | 3: number
        goodAnswer: 'Badminton',
        answers: [
            'Basket',
            'Badminton',
            'Golf',
            'Voleyball'
        ]
    },
    {
        question: 'Quel est le plus grand pays du monde ?',
        responseType: 2,
        goodAnswer: 'Russie',
        answers: [
            'Russie',
            'Canada',
            'Chine',
            'USA'
        ]
    },
    {
        question: 'Quels sont les bonnes réponses ?',
        responseType: 1,
        goodAnswer: ['Celle-ci', 'Celle-ci aussi', 'Celle-là'],
        answers: [
            'Celle-là',
            'Celle-ci',
            'Mais pas celle-là',
            'Celle-ci aussi'
        ]
    },
    {
        question: 'Quels sont les 3 premiers chiffres de la suite de Fibonacci ?',
        responseType: 0,
        goodAnswer: '0, 1, 1',
        answers: [
            '0, 1, 2',
            '0, 1, 1',
            '1, 1, 2',
            '1, 2, 3'
        ]
    },
    {
        question: 'Quel est le nombre de jours dans une année bissextile ?',
        responseType: 3,
        goodAnswer: '366'
    }
];

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

const verifyButton = document.querySelector('#verify button');

verifyButton.addEventListener('click', e => {
    e.preventDefault();
    let score = 0;
    const questionList = document.querySelectorAll('#q-list li');
    questionList.forEach(qContainer => {
        let qIndex = qContainer.dataset.qIndex;
        let question = questions[qIndex];
        switch (question.responseType) {
            case 0: { // radio
                const chosen = qContainer.querySelector('input[type="radio"]:checked');
                if (chosen) {
                    let answer = chosen.id.split('-')[1];
                    if (answer === question.goodAnswer) {
                        score++;
                    }
                }
                break;
            }
            case 1: { // checkbox
                const chosen = qContainer.querySelectorAll('input[type="checkbox"]:checked');
                if (chosen.length > 0) {
                    let answers = [];
                    chosen.forEach(c => {
                        answers.push(c.id.split('-')[1]);
                    });
                    if (arraySameValues(answers, question.goodAnswer)) {
                        score++;
                    }
                }
                break;
            }
            case 2: { // select
                const chosen = qContainer.querySelector('select');
                if (chosen.value === question.goodAnswer) {
                    score++;
                }
                break;
            }
            case 3: { // number
                const chosen = qContainer.querySelector('input[type="number"]');
                if (chosen.value === question.goodAnswer) {
                    score++;
                }
                break;
            }
        }
    });
    alert(`Score: ${score}`);
});

function arraySameValues(a1, a2) {
    if (a1.length !== a2.length) return false;
    return a1.every(v => a2.includes(v));
}