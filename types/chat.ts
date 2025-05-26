type UUID = string;
type ISODate = string;

export interface UserProfile {
  avatar?: {
    secureUrl?: string;
    publicId?: string;
  };
  firstName?: string;
  lastName?: string;
}

export interface User {
  _id: UUID;
  profile: UserProfile;
  emails: {
    address: string;
    verified: boolean;
  }[];
}

// Archivos (Cloudinary)
export interface CloudinaryFile {
  secure_url: string;
  public_id: string;
  url: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
  created_at: string;
}

// Adjuntos internos
export interface MessageFile {
  _id: string | null;
  uiId?: string;
  cloudinary: CloudinaryFile;
  createdAt: ISODate | null;
  createdBy: UUID;
}

// Mensaje individual
export interface Message {
  _id: UUID;
  associatedId: UUID | null;
  createdAt: ISODate;
  createdBy: UUID;
  rawText: string;
  text: string;
  ts: number;
  updatedBy: UUID;
  mentions: UUID[];
  files: MessageFile[];
  views: UUID[];
  data: {
    files: MessageFile[];
  };
  likes?: UUID[];
  important?: UUID[];
  fun?: UUID[];
  helpful?: UUID[];
  insightful?: UUID[];
  done?: UUID[];
  seen?: UUID[];
}

export interface PaginatedMessages {
  pageNumber: number;
  pageSize: number;
  total: number;
  hasNextPage: boolean;
  data: Message[];
}

export interface Chat {
  _id: UUID;
  title: string;
  createdBy: UUID;
  members: UUID[];
  isAIEnabled: boolean;
  createdAt: ISODate;
  data: {
    members: User[];
    messages: PaginatedMessages;
  };
}

export interface ChatListResponse {
  pageNumber: number;
  pageSize: number;
  total: number;
  hasNextPage: boolean;
  data: Chat[];
}
