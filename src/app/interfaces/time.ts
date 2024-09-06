export interface ICountries {
  UA: ICity[];
  RU: ICity[];
  BY: ICity[];
}

export interface ICity {
  name: string;
  timeZone: string;
}
