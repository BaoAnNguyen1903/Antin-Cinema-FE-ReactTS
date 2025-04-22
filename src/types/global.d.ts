export {};

declare global {
  interface IBackendRes<T> {
    error?: string | string[];
    message: string;
    statusCode: number | string;
    data?: T;
  }

  interface ILogin {
    access_token: string;
    user: {
      uid: number;
      name: string;
      dob: Date;
      gender: string;
      phone: string;
      email: string;
      username: string;
      avatar: string;
      points: number;
      status: number;
      role: string;
    };
  }

  interface IRegister {
    uid: string;
    username: string;
    name: string;
  }

  interface IUser {
    uid: number;
    name: string;
    dob: Date;
    gender: string;
    phone: string;
    email: string;
    username: string;
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

  interface IResponseImport {
    countSuccess: number;
    countError: number;
    detail: any;
  }

  interface IMovieType {
    mtid: number;
    movieTypeName: string;
  }

  interface IMovieLanguage {
    mlid: number;
    movieLanguageName: string;
  }

  interface IMovieRated {
    mrid: number;
    movieRatedName: string;
  }

  interface IMovie {
    mid: number;
    movieName: string;
    movieDescription: string;
    movieDirector: string;
    movieActor: string;
    movieType: IMovieType;
    movieTime: string;
    movieLanguage: IMovieLanguage;
    movieRated: IMovieRated;
    poster: string;
    panner: string;
    openday: Date;
    closeday: Date;
    movieStatus: number;
  }

  interface IHistory {
    _id: string;
    name: string;
    type: string;
    email: string;
    phone: string;
    userId: string;
    detail: {
      bookName: string;
      quantity: number;
      _id: string;
    }[];
    totalPrice: number;
    createdAt: Date;
    updatedAt: Date;
    paymentStatus: string;
    paymentRef: string;
  }

  interface IBookingTable extends IHistory {}

  interface IGuest {
    kid: string;
    name: string;
    email: string;
    phone: string;
  }
}
