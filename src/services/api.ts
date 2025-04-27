import createInstanceAxios from "services/axios.customize";

const axios = createInstanceAxios(import.meta.env.VITE_BACKEND_URL);

// const axiosPayment = createInstanceAxios(
//   import.meta.env.VITE_BACKEND_PAYMENT_URL
// );

//==================================================================================================//
//===========================================API-AUTH===============================================//
//==================================================================================================//

export const loginAPI = (username: string, password: string) => {
  const urlBackend = "/api/v1/auth/login";
  return axios.post<IBackendRes<ILogin>>(urlBackend, { username, password });
};

export const registerAPI = (
  name: string,
  username: string,
  password: string,
  email: string
) => {
  const urlBackend = "/api/v1/auth/register";
  return axios.post<IBackendRes<IRegister>>(urlBackend, {
    name,
    username,
    password,
    email
  });
};

export const fetchAccountAPI = () => {
  const urlBackend = "/api/v1/auth/account";
  return axios.get<IBackendRes<IFetchAccount>>(urlBackend);
};

export const logoutAPI = () => {
  const urlBackend = "/api/v1/auth/logout";
  return axios.post<IBackendRes<IRegister>>(urlBackend);
};

//==================================================================================================//
//===========================================API-GUEST===============================================//
//==================================================================================================//

export const getGuestsAPI = (query: string) => {
  const urlBackend = `/api/v1/guest/ViewAllGuestsList?${query}`;
  return axios.get<IBackendRes<IModelPaginate<IGuest>>>(urlBackend);
};

//==================================================================================================//
//===========================================API-USER===============================================//
//==================================================================================================//

export const getUsersAPI = (query: string) => {
  const urlBackend = `/api/v1/user/ViewAllUsersList?${query}`;
  return axios.get<IBackendRes<IModelPaginate<IUser>>>(urlBackend);
};

export const createUserAPI = (
  name: string,
  username: string,
  password: string,
  email: string
) => {
  const urlBackend = "/api/v1/user/CreateUser";
  return axios.post<IBackendRes<IRegister>>(urlBackend, {
    name,
    username,
    password,
    email
  });
};

export const bulkCreateUserAPI = (
  data: {
    name: string;
    username: string;
    password: string;
    email: string;
    phone: string;
  }[]
) => {
  const urlBackend = "/api/v1/user/bulk-create";
  return axios.post<IBackendRes<IResponseImport>>(urlBackend, data);
};

export const updateUserAPI = (
  uid: number,
  name: string,
  dob: Date,
  gender: string,
  phone: string,
  email: string,
  username: string,
  points: number,
  status: number,
  role: string
) => {
  const urlBackend = "/api/v1/user/UpdateUser";
  return axios.put<IBackendRes<IRegister>>(urlBackend, {
    uid,
    name,
    dob,
    gender,
    phone,
    email,
    username,
    points,
    status,
    role
  });
};

export const deleteUserAPI = (uid: number) => {
  const urlBackend = `/api/v1/user/${uid}`;
  return axios.delete<IBackendRes<IRegister>>(urlBackend);
};

export const updateUserInfoAPI = (
  uid: number,
  name: string,
  dob: Date,
  gender: string,
  phone: string,
  avatar: string
) => {
  const urlBackend = "/api/v1/user/UpdateUserInfo";
  return axios.put<IBackendRes<IRegister>>(urlBackend, {
    uid,
    name,
    dob,
    gender,
    phone,
    avatar
  });
};

export const updateUserPasswordAPI = (
  username: string,
  oldpass: string,
  newpass: string
) => {
  const urlBackend = "/api/v1/user/change-password";
  return axios.post<IBackendRes<IRegister>>(urlBackend, {
    username,
    oldpass,
    newpass
  });
};

//==================================================================================================//
//==================================================================================================//

export const uploadFileAPI = (fileImg: any, folder: string) => {
  const bodyFormData = new FormData();
  bodyFormData.append("fileImg", fileImg);
  return axios<
    IBackendRes<{
      fileUploaded: string;
    }>
  >({
    method: "post",
    url: "/api/v1/file/upload",
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
      "upload-type": folder
    }
  });
};

//==================================================================================================//
//===========================================API-MOVIE==============================================//
//==================================================================================================//

export const getMoviesAPI = (query: string) => {
  const urlBackend = `/api/v1/movie/ViewAllMovieList?${query}`;
  return axios.get<IBackendRes<IModelPaginate<IMovie>>>(urlBackend);
};

export const createMovieAPI = (
  movieName: string,
  movieDescription: string,
  movieDirector: string,
  movieActor: string,
  movieType: IMovieType,
  movieTime: string,
  movieLanguage: IMovieLanguage,
  movieRated: IMovieRated,
  poster: string,
  banner: string,
  openday: Date,
  closeday: Date,
  movieStatus: number
) => {
  const urlBackend = "/api/v1/movie/CreateMovie";
  return axios.post<IBackendRes<IRegister>>(urlBackend, {
    movieName,
    movieDescription,
    movieDirector,
    movieActor,
    movieType,
    movieTime,
    movieLanguage,
    movieRated,
    poster,
    banner,
    openday,
    closeday,
    movieStatus
  });
};

export const bulkCreateMovieAPI = (
  data: {
    movieName: string;
    movieDescription: string;
    movieDirector: string;
    movieActor: string;
    movieType: IMovieType;
    movieTime: string;
    movieLanguage: IMovieLanguage;
    movieRated: IMovieRated;
    openday: Date;
    closedate: Date;
  }[]
) => {
  const urlBackend = "/api/v1/movie/bulk-create";
  return axios.post<IBackendRes<IResponseImport>>(urlBackend, data);
};

export const updateMovieAPI = (
  mid: number,
  movieName: string,
  movieDescription: string,
  movieDirector: string,
  movieActor: string,
  movieType: number,
  movieTime: string,
  movieLanguage: number,
  movieRated: number,
  poster: string,
  banner: string,
  openday: Date,
  closeday: Date,
  movieStatus: number
) => {
  const urlBackend = "/api/v1/movie/UpdateMovie";
  return axios.put<IBackendRes<IRegister>>(urlBackend, {
    mid,
    movieName,
    movieDescription,
    movieDirector,
    movieActor,
    movieType: { mtid: movieType },
    movieTime,
    movieLanguage: { mlid: movieLanguage },
    movieRated: { mrid: movieRated },
    poster,
    banner,
    openday,
    closeday,
    movieStatus
  });
};
