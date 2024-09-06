export interface IHrInterviewList {
  id: string;
  questionIndex: number;
  questionType: string;
  questionText?: string;
  answers: IHrInterviewAnswer[];
  answerLimit?: number;
}

export interface IHrInterviewAnswer {
  id: string;
  answer: string;
  checked?: boolean;
  isOtherType?: boolean;
}
