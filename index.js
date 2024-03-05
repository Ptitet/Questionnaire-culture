const questions = [
    {
        question: 'Dans quel sport ne joue-t-on pas avec une balle ?',
        responseType: 0, // 0: radio | 1: checkbox | 2: select | 3: number
        goodAnswer: 1,
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
        goodAnswer: 366
    }
];

const qList = document.querySelector('#q-list');

for (const [i, question] of Object.entries(questions)) {
    const qContainer = document.createElement('li');

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
            const select = document.createElement('select');
            select.name = `q${qn}`;
            for (let answer of question.answers) {
                const option = document.createElement('option');
                option.value = answer;
                option.innerText = answer;
                select.appendChild(option);
            }
            answerElement.appendChild(select);
            answersContainer.appendChild(answerElement);
            break;
        }
        case 3: {
            const answerElement = document.createElement('div');
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
