export interface UserProps {
  id: number;
  nickName: string;
  email: string;
  imageUrl: string;
}
export interface User {
  result: string;
  status: number;
  data: UserProps;
}

export interface Session {
  user: {
    id: string;
    email: string;
  };
}
