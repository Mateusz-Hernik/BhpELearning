import { ActivityDescrption } from './activity-description.interface';

export interface UserCourse {
    id: number;
    name: string;
    edition: number;
    startDate: Date;
    endDate: Date;
    photo: string;
    activities: ActivityDescrption[];
}
