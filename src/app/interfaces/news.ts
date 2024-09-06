import { ITechnologyStackTags } from '@interfaces/employee';
import { IPageInfo } from '@interfaces/common';

export interface IRequestNewsParams {
  page: number;
  pageSize: number;
  tags?: string[];
}

export interface INewsRow {
  id: string;
  title: string;
  text?: string;
  previewText?: string;
  urlName: string;
  published: string;
  viewsCount: number;
  topic: ITopic;
  tags: ITechnologyStackTags[];
  relatedNews: INewsRow[];
}

export interface ITopic {
  id: string;
  name: string;
  icon: string;
  type: number;
  alternativeIcon: string;
}

export interface INewsResponse {
  pageInfo: IPageInfo;
  data: INewsRow[];
  tags: INewsTag[];
}

export interface INewsParams {
  search?: string;
  tags?: string;
}

export interface IPayload {
  title: string;
  text: string;
  topic: string;
  tags: string[];
}

export interface INewsTag {
  id: string;
  name: string;
  checked: boolean;
}
