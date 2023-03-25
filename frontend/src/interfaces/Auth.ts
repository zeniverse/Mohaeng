export interface userData {
  id: number;
  userId: string;
  userNickname: string;
  userEmail: string;
  profileUrl: string;
}
export interface User {
  result: string;
  status: number;
  data: userData;
}

export interface Session {
  user: {
    id: string;
    email: string;
  };
}
