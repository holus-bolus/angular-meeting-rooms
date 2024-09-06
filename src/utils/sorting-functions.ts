import { IOneToOne } from '@interfaces/one-to-one';
import { ICoordinates } from '@interfaces/coordinates';

export function sort(documents: IOneToOne[], descSort: boolean): IOneToOne[] {
  return documents.sort(compare(descSort));
}

function compare(descSort: boolean): (a: IOneToOne, b: IOneToOne) => number {
  return (a: IOneToOne, b: IOneToOne) => {
    const elemA = a.nextInterviewDate;
    const elemB = b.nextInterviewDate;
    const comparison = onCompare(elemA, elemB);

    return descSort ? comparison * -1 : comparison;
  };
}

export function oneToOneSort(documents: ICoordinates[], descSort: boolean): ICoordinates[] {
  return documents.sort(oneToOneCompare(descSort));
}

function oneToOneCompare(descSort: boolean): (a: ICoordinates, b: ICoordinates) => number {
  return (a: ICoordinates, b: ICoordinates) => {
    const elemA = a.nextOneToOneInterviewDate || '';
    const elemB = b.nextOneToOneInterviewDate || '';
    const comparison = onCompare(elemA, elemB);

    return descSort ? comparison * -1 : comparison;
  };
}

export function levelSort(documents: ICoordinates[], descSort: boolean): ICoordinates[] {
  return documents.sort(levelCompare(descSort));
}

function levelCompare(descSort: boolean): (a: ICoordinates, b: ICoordinates) => number {
  return (a: ICoordinates, b: ICoordinates) => {
    const elemA = a.level || '';
    const elemB = b.level || '';
    const comparison = onCompare(elemA, elemB);

    return descSort ? comparison * -1 : comparison;
  };
}

export function languageSort(documents: ICoordinates[], descSort: boolean): ICoordinates[] {
  return documents.sort(languageCompare(descSort));
}

function languageCompare(descSort: boolean): (a: ICoordinates, b: ICoordinates) => number {
  return (a: ICoordinates, b: ICoordinates) => {
    const elemA = a.language ? a.language.level : '';
    const elemB = b.language ? b.language.level : '';
    const comparison = onCompare(elemA, elemB);

    return descSort ? comparison * -1 : comparison;
  };
}

export function assessmentSort(documents: ICoordinates[], descSort: boolean): ICoordinates[] {
  return documents.sort(assessmentCompare(descSort));
}

function assessmentCompare(descSort: boolean): (a: ICoordinates, b: ICoordinates) => number {
  return (a: ICoordinates, b: ICoordinates) => {
    const elemA = a.nextAssessmentDate || '';
    const elemB = b.nextAssessmentDate || '';
    const comparison = onCompare(elemA, elemB);

    return descSort ? comparison * -1 : comparison;
  };
}

function onCompare(elA: Date | string, elB: Date | string): number {
  if (elA === elB) return 0;

  return elA < elB ? 1 : -1;
}
