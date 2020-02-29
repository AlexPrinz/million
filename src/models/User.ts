import { computed, observable } from 'mobx';

interface ISession {
  id: number;
  refer: number;
  sessionKey: string;
}

export interface IUserRawData{
  id: number;
  email: string;
  givenName: string;
  lastName: string;
  session: ISession;
  userId: string;
  languageId: string;
}

export interface IUser extends IUserRawData {
  initials: string;
  name: string;
}

export class User implements IUser {
  @observable public email: string;
  @observable public givenName: string;
  @observable public lastName: string;
  @observable public languageId: string;

  public readonly id: number;
  public readonly userId: string;
  public readonly session: ISession;

  constructor(userData: IUserRawData) {
    this.givenName = userData.givenName;
    this.lastName = userData.lastName;
    this.id = userData.id;
    this.email = userData.email;
    this.userId = userData.userId;
    this.session = userData.session;
  }

  @computed get initials() {
    if (this.givenName && this.lastName) {
      return this.givenName.charAt(0).toUpperCase() + this.lastName.charAt(0).toUpperCase();
    }

    return '??';
  }

  @computed get name() {
    return `${this.givenName} ${this.lastName}`;
  }
}

export { };
