import { Course } from 'src/app/shared/models/course.interface';

export interface UserCourses {
    incomingCourses: Course[];
    activeCourses: Course[];
    expiredCourses: Course[];
}
