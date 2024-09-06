export interface ICelebrationsButtons {
  celebrationId: string;
  shortName?: string;
  defaultText?: string;
}

export interface ICelebrationsButtonsRequest extends ICelebrationsButtons{
  buttonName: string;
  icon: string;
}
