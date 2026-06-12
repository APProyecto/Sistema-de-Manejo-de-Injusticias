import type { User, PostCardData } from "../types";
import { authApi } from './api';


interface LoginResponse {
  success: boolean
  message: string;
  user: User;
  token?: string;
}

interface ProfileResponse {
  success: boolean
  data: User
}

export interface AccountState {
  AccountStateID : number,
  StateName :  string,
}
interface UpdateUserProfileData {
  firstName?: string;
  lastName?: string;
  userName?: string;
  genderId?: number;
  countryId?: number;
}

interface UploadPictureResponse {
  message: string;
  appUserId: number;
  appUserName: string;
  mongoDocumentId: string;
  mongoFileId: string;
  fileMetadataId: string;
  picture: {
    fileName: string;
    fileSize: number;
    contentType: string;
    mongoFileId: string;
    gridFsId: string;
  };
}

interface MyVotedPostResponse {
  id: number;

  creatorId: number;
  entityId: number;
  injusticeTypeId: number;

  username: string;
  indicted: string;
  case: string;

  title: string;
  description: string;
  creation_date: string;

  is_favorite: boolean;
  votes: string;
  voted_by_user: boolean;
  coments: string;
  evidences: string;
  state: string;
}

interface UpdateProfileWithPictureResponse {
  profile: ProfileResponse;
  picture: UploadPictureResponse | null;
}

export const login = async (identifier: string, password: string): Promise<LoginResponse> => {
  const isEmail = identifier.includes('@');
  const response = await authApi.post<LoginResponse>('/api/users/login', { 
    ...(isEmail ? {email:identifier} : {nombreUsuario: identifier}), 
    password
  });
  
  if (response.data.token) {
    // Guardar token y usuario
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  console.log(response);
  return response.data;
};

export const logout = async (): Promise<void> => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getUserProfile = async (id: number): Promise<ProfileResponse> => {
  const response = await authApi.get<ProfileResponse>(`/api/users/${id}`)
  return response.data
}

export const getAllAccountStates = async () : Promise<AccountState[]> => {
  const response = await authApi.get<AccountState[]>(`/api/users/AccountStates`);
  return response.data
}


export const getAllNormalUsers = async () : Promise<User[]> => {
  const response = await authApi.get<User[]>(`/api/users/AllNormalUsers`);
  return response.data
}

export const getAllAdmins = async () : Promise<User[]> => {
  const response = await authApi.get<User[]>(`/api/users/AllAdmins`);
  return response.data
}

export const postConvertUserToAdmin = async (id: number): Promise<ProfileResponse> =>{
  const response = await authApi.post<ProfileResponse>("/api/users/toAdmin", 
    {
      ID: {
        UserID: id,
      }
    });

    return response.data;
}

export const postConvertAdminToUser = async (id: number): Promise<ProfileResponse> =>{
  const response = await authApi.post<ProfileResponse>("/api/users/toUser", 
    {
      ID: {
        UserID: id,
      }
    });

    return response.data;
}

export const postChangeUserState = async (idUser: number, idStatus: number): Promise<ProfileResponse> =>{
  const response = await authApi.post<ProfileResponse>("/api/users/changeStatus", 
    {

        UserID: idUser,
        AccountStateID: idStatus,
      
    });

    return response.data;
}

export const getUserProfilePicture = async (id: number): Promise<ProfileResponse> => {
  const response = await authApi.get<ProfileResponse>(`/api/files/appUser/${id}/picture`)
  return response.data
}

export const postUserProfileModification = async (id: number, data: UpdateUserProfileData, file?: File | null) : Promise <UpdateProfileWithPictureResponse> => {
  const profileResponse = await authApi.post<ProfileResponse>(`/api/users/updateProfile/${id}/profile`, data);

  let pictureResponse: UploadPictureResponse | null = null;

  if(file) {
    pictureResponse = await uploadUserProfilePicture(id, file);
  }

  return {
      profile : profileResponse.data,
      picture : pictureResponse,
  };
}

export const uploadUserProfilePicture = async (id: number, file: File) : Promise<UploadPictureResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await authApi.put<UploadPictureResponse>(`/api/files/appUser/${id}/picture`, formData);

  return response.data;
}

export const getUserProfilePictureUrl = (
  id: number,
): string => {

  return `${authApi.defaults.baseURL}/api/files/appUser/${id}/picture`;
};

export const getEntityPictureUrlByBoycottId = (
  id: number,
): string => {

  return `${authApi.defaults.baseURL}/api/files/entityBoycott/${id}/picture`;
};

export const getInjusticePictureUrlByBoycottId = (
  id: number,
): string => {

  return `${authApi.defaults.baseURL}/api/files/injustice-typesBoycott/${id}/picture`;
};

export const syncAuth0User = async (
  token: string,
  email: string,
  name: string
): Promise<User> => {
  const response = await authApi.get("/api/me", {
    headers: {
      Authorization: `Bearer ${token}`,
      "x-user-email": email,
      "x-user-name": name,
    },
  });

  const backendUser = response.data;

  const user: User = {
    appUserId: backendUser.UserID,
    appUserName: backendUser.UserName,
    firstName: backendUser.FirstName,
    lastName: backendUser.LastName,
    email: backendUser.Email,
    country: String(backendUser.CountryID),
    gender: backendUser.GenderID ? String(backendUser.GenderID) : null,
    accountStatus: backendUser.AccountStateID,
    picture: backendUser.MongoDocumentID
      ? getUserProfilePictureUrl(backendUser.UserID)
      : null,
    isSuperAdmin: false,
    isAdmin: backendUser.IsAdmin ?? false,
    isNormal: !(backendUser.IsAdmin ?? false),
  };

  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));

  return user;
};

export const getMyVotedPosts = async (
  appUserId: number
): Promise<PostCardData[]> => {
  const response = await authApi.get<MyVotedPostResponse[]>(
    `/api/users/votes/${appUserId}`
  );

  return response.data.map((post) => ({
    id: post.id,
    username: post.username,

    user_picture: getUserProfilePictureUrl(post.creatorId),

    indicted: post.indicted,
    indicted_picture: getEntityPictureUrlByBoycottId(post.id),

    case: post.case,
    case_picture: getInjusticePictureUrlByBoycottId(post.id),

    title: post.title,
    description: post.description,
    creation_date: post.creation_date,

    is_favorite: post.is_favorite,
    votes: post.votes,
    voted_by_user: post.voted_by_user,
    coments: post.coments,
    evidences: post.evidences,
    state: post.state,
  }));
};