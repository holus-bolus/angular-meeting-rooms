export interface IOffice {
  id: string;
  name: string;
  photo: string;
  address: string;
  meetingRoomUrl: string;
  networks: INetwork[];
  hrs: IHR[];
  timeZone: string;
}

export interface INetwork {
  id: string;
  dns: string;
  ipv4: string;
}

export interface IHR {
  id: string;
  name: string;
  photo: string;
  skype: string;
  phone: string;
  email: string;
}
