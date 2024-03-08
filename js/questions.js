export const questions = [
    {
        question: 'Dans quel sport ne joue-t-on pas avec une balle ?',
        responseType: 0, // 0: radio | 1: checkbox | 2: select | 3: nuber
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