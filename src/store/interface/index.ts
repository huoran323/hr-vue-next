// 用户信息
export interface IUserInfo {
    token: string;
    name: string;
    avatar: string;
    userInfos: object;
}

export interface RootStateTypes {
    user: IUserInfo;
}
