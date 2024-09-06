export const enum TIME_ZONES {
  KIEV = 'Europe/Kiev',
  MINSK = 'Europe/Minsk',
  MOSCOW = 'Europe/Moscow',
  KALININGRAD = 'Europe/Kaliningrad'
}

export const enum CITIES {
  KIEV = 'Kiev',
  KYIV = 'Kyiv',
  DNIPRO = 'Dnipro',
  KHARKIV = 'Kharkiv',
  CHERKASY = 'Cherkasy',
  CHERNIHIV = 'Chernihiv',
  ODESSA = 'Odessa',
  KALININGRAD = 'Kaliningrad',
  PENZA = 'Penza',
  SAINT_PETERSBURG = 'Saint-Petersburg',
  KAZAN = 'Kazan',
  MINSK = 'Minsk',
  VITEBSK = 'Vitebsk',
  VITEBSK_LAB = 'VitebskLab',
  POLOTSK = 'Polotsk',
  MOZYR = 'Mozyr',
  GOMEL = 'Gomel'
}

const UA = [
  {name: CITIES.KIEV, timeZone: TIME_ZONES.KIEV},
  {name: CITIES.KYIV, timeZone: TIME_ZONES.KIEV},
  {name: CITIES.DNIPRO, timeZone: TIME_ZONES.KIEV},
  {name: CITIES.KHARKIV, timeZone: TIME_ZONES.KIEV},
  {name: CITIES.CHERKASY, timeZone: TIME_ZONES.KIEV},
  {name: CITIES.CHERNIHIV, timeZone: TIME_ZONES.KIEV},
  {name: CITIES.ODESSA, timeZone: TIME_ZONES.KIEV}
];
const RU = [
  {name: CITIES.KALININGRAD, timeZone: TIME_ZONES.KALININGRAD},
  {name: CITIES.PENZA, timeZone: TIME_ZONES.MOSCOW},
  {name: CITIES.SAINT_PETERSBURG, timeZone: TIME_ZONES.MOSCOW},
  {name: CITIES.KAZAN, timeZone: TIME_ZONES.MOSCOW}
];
const BY = [
  {name: CITIES.MINSK, timeZone: TIME_ZONES.MINSK},
  {name: CITIES.VITEBSK_LAB, timeZone: TIME_ZONES.MINSK},
  {name: CITIES.VITEBSK, timeZone: TIME_ZONES.MINSK},
  {name: CITIES.POLOTSK, timeZone: TIME_ZONES.MINSK},
  {name: CITIES.MOZYR, timeZone: TIME_ZONES.MINSK},
  {name: CITIES.GOMEL, timeZone: TIME_ZONES.MINSK}
];

export const OFFICES_TIMEZONES = [...UA, ...RU, ...BY];
