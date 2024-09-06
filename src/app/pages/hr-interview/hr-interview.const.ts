import { IHrInterviewList } from '@interfaces/hr-interview.interface';

export const HR_INTERVIEW_MODAL_WIDTH = '496px';

export const HR_INTERVIEW_MODAL_HEIGHT = '356px';

export const HR_INTERVIEW_SINGLE_ANSWER = 'SingleAnswer';

export const HR_INTERVIEW_OTHER_ANSWER = 'OtherAnswer';

export const HR_INTERVIEW_OTHER_FIELD = 'Другое:';

export const HR_INTERVIEW_OTHER_FIELD_ENG = 'Other:';

export const KRAKOW_LOCATION_ID = 'efad4d4b-3eea-11eb-85e2-0c9d92c3d39d';

export const HR_INTERVIEW_ENGLISH_QUESTIONS_ID = '1c72651d-755a-4495-8a7e-de6032e8ae31';

export const HR_INTERVIEW_RUSSIAN_QUESTIONS_ID = '44e484d4-e1fb-40a8-b556-f70bb7a6ca07';

export const HR_INTERVIEW_OTHER_QUESTION = {
  id: 'new Question',
  questionIndex: 11,
  questionType: 'OtherAnswer',
  answers: [],
  russian: {
    questionText: 'У меня есть вопрос/предложение/пожелание (открытый вопрос):',
    placeholder: 'Мой ответ'
  },
  english: {
    questionText: 'I have a question/suggestion/wish:',
    placeholder: 'My answer'
  }
};

export const HR_INTERVIEW_QUESTIONNAIRE = {
  english: {
    hint: 'Answers for the questionnaire',
    title: 'Adaptation: after the first week in the company',
  },
  russian: {
    hint: 'Ответы на опросник',
    title: 'Адаптация: первая неделя работы',
  }
};

export const HR_INTERVIEW_MODAL = {
  english: {
    answersSend: 'Questionnaire replies have been successfully sent!',
    error: 'Error.',
    reload: 'Try reloading the page',
    thanks: 'Thank you for completing the questionnaire. Your answers are important to us.',
    buttonText: {
      close: 'Close',
      reload: 'Reload'
    }
  },
  russian: {
    answersSend: 'Ответы успешно отправлены!',
    error: 'Ошибка.',
    reload: 'Попробуйте перезагрузить страницу',
    thanks: 'Спасибо за прохождение опросника. Нам важны твои ответы.',
    buttonText: {
      close: 'Закрыть',
      reload: 'Перезагрузить'
    }
  }
};

export const MOCK_HR_INTERVIEW_LIST = [
  {
    id: '2d',
    questionIndex: 0,
    questionType: 'type',
    questionText: 'text',
    answers: [
      {
        id: '1d',
        answer: 'mock answer',
        checked: true,
        isOtherType: false
      }
    ],
  }
];

export const HR_INTERVIEW_HEADER = {
  russian: {
    title: 'Адаптация: первая неделя работы',
    text: `Поздравляем! Ты — часть компании!\n
      Первые дни — самые волнительные. Нам очень важно знать, как проходит твоя адаптация!\n
      Не стесняйся и заполни анкету. А если ты еще чего-то не знаешь, мы обязательно расскажем ;)`,
    mandatory: '* Обязательно'
  },
  english: {
    title: 'Adaptation: first week of work',
    text: `Congratulations! You are part of the company. The first days are the most exciting.` +
     `It is very important for us to know how your adaptation is going! Do not hesitate and fill ` +
     `in the form. And if you still don't know something, we will definitely tell you! ;)`,
    mandatory: '* Mandatory field'
  }
};
