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

export interface CreateBoycottData {
  nombre_entidad: string;
  categoria: string;
  logo?: string;
  industria: string;
  pais: string;
  tipo_injusticia: string;
  descripcion: string;
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
export interface AuditFields {
  CreatedAt: string | null;
  CreatedBy: string | null;
  ModifiedAt: string | null;
  ModifiedBy: string | null;
}

export interface Gender extends AuditFields {
  GenderID: number;
  GenderName: string;
}

export interface Continent extends AuditFields {
  ContinentID: number;
  ContinentName: string;
}

export interface Country extends AuditFields {
  CountryID: number;
  CountryName: string;
  ContinentID: number;
  Continent?: Continent;
}

export interface CategoryEntity extends AuditFields {
  CategoryEntityID: number;
  CategoryEntityName: string;
}

export interface InjusticeType extends AuditFields {
  InjusticeTypeID: number;
  InjusticeTypeName: string;
  Description?: string | null;
}