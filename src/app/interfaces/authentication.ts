import { Roles } from '@interfaces/employee';

export interface IUserDetails {
  externalId: string;
  username: string;
  photo: string;
  roles: Roles[];
}
