export interface ISurveyButton {
  id: string;
  text: string;
  icon: string;
  isCompleted: boolean;
  showResults?: boolean;
  resultDate?: Date;
}

export interface IQuestion {
  id: string;
  questionType: string;
  questionText: string;
  questionIndex: number;
  answersLimit: number;
  answers: IAnswer[];
  checked: boolean;
}

export interface IAnswer {
  id: string;
  answer: string;
  checked: boolean;
}

export interface INgClassParams {
  [key: string]: boolean;
}

export interface ISurveyResults {
  questionnaireId: string;
  questionnaireAnswers: IAnswer[];
}

export interface IQuestionnaireEmployee {
  employeeFullName: string;
  employeeId: string;
  employeeStatus: string;
  value: number;
}

export interface IQuestionnaireResults {
  maxValue: number;
  employees: IQuestionnaireEmployee[];
}
