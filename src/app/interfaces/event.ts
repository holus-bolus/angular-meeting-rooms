import { SafeHtml } from '@angular/platform-browser';
import { ITopic } from './news';
import { IPageInfo } from './common';
import { IErrorDetails } from './error';

export interface IEventResponse {
  pageInfo: IPageInfo;
  data: IEvent[];
}

export interface IEvent {
  id: string;
  title: string;
  text: string;
  topic: ITopic;
  poster: string;
  posterPreview: string;
  place: string;
  date: string;
  signupUrl: string;
  urlName: string;
  relatedEvents: IEvent[];
  offices: IOffice[];
  maxParticipants?: number;
}

export interface IOffice {
  id: string;
  name: string;
  photo: string;
  address: string;
  meetingRoomUrl: string;
  timeZone: string;
  networks: INetwork[];
  hrs: IHr[];
}

export interface INetwork {
  id: string;
  dns: string;
  ipv4: string;
}

export interface IHr {
  id: string;
  name: string;
  photo: string;
  skype: string;
  phone: string;
  email: string;
}

export interface IEventIcons {
  [params: string]: SafeHtml;
}

export interface IEventRequest {
  page?: string;
  pageSize?: string;
  [params: string]: string;
}

export interface IEventPayload {
  title: string;
  text: string;
  topic: string;
  posterLoadedFileName: string;
  posterImageFile: File;
  place: string;
  date: string;
  signupUrl: string;
  offices: string[];
}

export interface IColorConfiguration {
  Element: string;
  Hover: string;
}

export interface ICreationEventResponse {
  success: boolean;
  data?: string;
  error?: IErrorDetails;
}
