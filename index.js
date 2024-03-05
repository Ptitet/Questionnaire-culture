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
        answers: [
            'Russie',
            'Canada',
            'Chine',
            'USA'
        ]
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

    for (let answer of question.answers) {
        let answerElement = document.createElement('div');
        answerElement.classList.add('answer');

        switch(question.responseType) {
            case 0: {
                const input = document.createElement('input');
                input.type = 'radio';
                input.name = `q${qn}`;
                input.id = `q${qn}-${answer}`;
                answerElement.appendChild(input);
                const label = document.createElement('label');
                label.innerText = answer;
                label.htmlFor = input.id;
                answerElement.appendChild(label);
                break;
            }
            case 1: {
                break;
            }
            case 2: {
                // select menu
            }
        }

        answersContainer.appendChild(answerElement);
    }

    qWrapper.appendChild(answersContainer);

    qContainer.appendChild(qWrapper);
    qList.appendChild(qContainer);
}