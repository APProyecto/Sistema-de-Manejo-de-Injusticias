// Definir los roles posibles
export type UserRole = 'user' | 'admin' | 'master';

export interface User {
  appUserId: number
  appUserName: string
  firstName: string
  lastName: string
  email: string
  country: string | number;
  picture?: string | null;
  gender?: string | number | null;
  accountStatus: number
  isSuperAdmin?: boolean | null;
  isAdmin?: boolean | null;
  isNormal?: boolean | null;
  role? : UserRole;
}

export interface simpleEntity {
  id: number;
  categoryId: number; // 1: Company, 2: Organization, 3: Person, 4: Institution, 5: Government, 6: Other
  name: string;
  picture: string | null;
}

export const entityCategories = {
  Company: 1,
  Organization: 2,
  Person: 3,
  Institution: 4,
  Government: 5,
  Other: 6
};

export interface Category {
  id: number,
  name: string,
}

export interface FilterValues {
  countryId: number | null;
  industryId: number | null;
  injusticeId: number | null;
  orderById: number | null;
}

export interface SimpleUser {
  id: number,
  username: string,
  profilePicture?: string,
}

export interface SearchResult {
  status: number,
  data: PostCardData[],
}

export interface PostCardData {
  id: number;
  username: string;
  user_picture: string;
  indicted: string;
  indicted_picture: string;
  case: string;
  case_picture: string;
  title: string;
  description: string;
  creation_date: string;
  is_favorite?: boolean;
  votes: string;
  voted_by_user?: boolean | null;
  coments: string;
  evidences: string;
  state: string;
  caseNumber?: string;
}

// src/types/index.ts

export type CreateBoycottData = {
  title: string;
  description: string;
  entityId: number;
  injusticeTypeId: number;
  countryId: number;
  createdBy: number; // Este se mapeará a creatorId
  creatorUsername?: string; // Opcional
  caseNumber?: number; // Opcional
  industryId?: number;
  evidence?: File[];
};

export interface Indicted {
  id: number;
  name: string;
  picture: string;
  description: string;
  category: string;
  cases: string[]; //las injusticias en las que ha estado involucrado
}

export interface Evidence {
  id: number;
  name: string;
  type: 'pdf' | 'image' | 'video' | 'file'
  extension: string;
  weight: string;
}

export interface DetailedPostData {
  id: number;
  user: SimpleUser;
  indicted: Indicted;
  type: string;
  country: string;
  caseNumber?: string; // número de expediente en denuncia
  case: string;
  case_picture: string;
  title: string;
  description: string;
  creation_date: string;
  last_updated: string;
  is_favorite?: boolean;
  votes: string;
  voted_by_user?: boolean | null;
  comment_amount: string;
  comments: Comment[];
  state: string;
  evidences: Evidence[];
}

export interface Comment {
  id: number;
  user: SimpleUser;
  content: string;
  creation_date: string;
  votes: string;
  voted_by_user: boolean | null;
}

export interface CreateCommentReport {
  UserDescription: string;
  MotiveReportID: number;
  ReportedBy: number;
  commentId: number;
  Subject: string;
}

export interface CommentReport {
  ReportID?: number;
  UserDescription: string;
  ReportedAt: Date;
  ReportState: {
    StateName: string;
  };
  MotiveReport: {
    MotiveName: string;
  };
  ReportComment: {
    CommentBoycott: {
      Description: string;
    };
  };
}
export interface FilterCategories {
  countries: Category[],
  industries: Category[],
  injustices: Category[],
  orderOptions: Category[],
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
export interface Gender { 
  GenderID: number, 
  GenderName: String, 
  CreatedAt: String | null, 
  CreatedBy: String | null, 
  ModifiedAt: String | null, 
  ModifiedBy: String | null, 
}

export interface Country {
  CountryID: number;
  CountryName: string;
}