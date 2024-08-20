export interface StudentType {
  studentId: number;
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  email: string;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  enabled: boolean;
  imageUrl?: string | null;
  role: string;
  authorities: Authority[];
  courses: Course[];
  studentsCompleted: CompletedCourse[];
  tokens: Token[];
}

export interface Authority {
  authority: string;
}

export interface CompletedCourse {
  studentCompletedId: number;
  studentId: number;
  courseId: number;
  totalContent: number;
  completed: number;
}

export interface Token {
  id: number;
  accessToken: string;
  refreshToken: string;
  loggedOut: boolean;
}

export interface Course {
  courseId: number;
  courseName: string;
  imageUrl: string;
  courseDetails: CourseDetail[];
}

export interface CourseDetail {
  courserDetailsId: number;
  content: string;
  description: string;
  courseId: number;
}
