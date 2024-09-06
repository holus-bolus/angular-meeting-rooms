import { IManager } from '@interfaces/userInfo.interface';

export class IManagerType {
  manager: IManager;
  type: string;
}

export class IProjectManagers {
  projectManager: IManagerType[];
  pc: IManagerType[];
  sdm: IManagerType[];
  deliveryManager: IManagerType[];
  adm: IManagerType[];
  dd: IManagerType[];
}
