export {};

declare global {
  interface IBackendRes<T> {
    error?: string | string[];
    message: string;
    statusCode: number | string;
    data?: T;
  }

  interface ILogin {
    user: {
      uid: number;
      name: string;
      dob: Date;
      gender: string;
      phone: string;
      email: string;
      avatar: string;
      points: number;
      status: number;
      role: string;
    };
  }

  interface IRegister {
    uid: string;
    username: string;
    fullName: string;
  }

  interface IUser {
    uid: number;
    name: string;
    dob: Date;
    gender: string;
    phone: string;
    email: string;
    avatar: string;
    points: number;
    status: number;
    role: string;
  }

  interface IFetchAccount {
    user: IUser;
  }

  interface IModelPaginate<T> {
    meta: {
      current: number;
      pageSize: number;
      pages: number;
      total: number;
    };
    result: T[];
  }
}
