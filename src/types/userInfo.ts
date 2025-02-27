export type UserInfo = {
  id: string;
  email: string;
  nickname: string;
};

export type AllUsersInfoStore = {
  allUsers: UserInfo[];
  setAllUsers: (userInfo: UserInfo[]) => void;
};
