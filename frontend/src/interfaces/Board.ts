export interface Board {
  id: number;
  title?: string;
  userName?: string;
  createdDate?: string;
  modifiedDate?: string;
  viewCount?: number;
  place?: string;
  recruiteMember?: number;
  nowMember?: number[];
  isRecruited: boolean;
  imgURL?: string;
}
