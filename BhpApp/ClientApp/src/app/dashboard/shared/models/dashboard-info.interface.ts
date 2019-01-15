import { UserInfo } from './user-info.interface';

export interface DashboardInfo {
    activeCoursesAmount: number;
    unreadMessagesAmount: number;
    userInfo: UserInfo;
}
