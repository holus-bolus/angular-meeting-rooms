import { IOffice } from '@interfaces/office';


export const officeMock: IOffice = {
  id: 'd7c27bf2-8a6b-42d6-8aef-c48d8990fb80',
  name: 'Warsaw',
  photo: `https://www.starhub.com/content/dam/starhub/2017/business/cloud-and-data-centre/
    smartbusiness/smartbusiness-saas/office-365/content-office-365-word-one.jpg`,
  address: 'Grzybowska 60, Warsaw, Mazowieckie 00-844, PL',
  meetingRoomUrl: 'meeting-rooms', // mocked data
  networks: [],
  hrs: [
    {
      id: 'bd6f353d-9598-4cac-803a-8e6163b4289a',
      name: 'Bukata Eduard',
      skype: 'live:.cid.563177135ad81397',
      phone: '+48 732 730 428',
      photo: '',
      email: 'e.bukata@andersenlab.com',
    },
  ],
  timeZone: 'Europe/Warsaw',
};
