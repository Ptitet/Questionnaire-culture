const questions = [
    {
        question: 'Dans quel sport ne joue-t-on pas avec une balle ?',
        responseType: 0, // 0: radio | 1: checkbox | 2: select | 3: number
        answers: [
            'Basket',
            'Badminton',
            'Golf',
            'Voleyball'
        ]
    }
];

const qList = document.querySelector('#q-list');

for (const [i, question] of Object.entries(questions)) {
    const qContainer = document.createElement('li');

    const questionNumber = document.createElement('h2');
    questionNumber.innerText = `Question n°${+i + 1}`;
    qContainer.appendChild(questionNumber);

    const qWrapper = document.createElement('div');
    qWrapper.classList.add('q-wrap');

    qList.appendChild(qContainer);
}