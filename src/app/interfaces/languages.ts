export interface ILanguages {
  id: string;
  name: string;
}

export interface ILanguagesLevels {
  name: string;
}

export interface ILanguagePost {
  salaryReviewId: string;
  languageId: string;
  level: string;
  comment: string;
}

export interface IPutLanguage {
  id: string;
  languageId: string;
  level: string;
  comment: string;
}
