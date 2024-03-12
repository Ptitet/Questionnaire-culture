import { questions } from './questions.js';

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
                    let answer = chosen.id.split('-').slice(1).join('-');
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
                        answers.push(c.id.split('-').slice(1).join('-'));
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