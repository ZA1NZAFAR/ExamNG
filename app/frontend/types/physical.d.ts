// Physical person
export interface Person {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    city: string;
    country: string;
}

// Instructor of the course
export interface Instructor extends Person {
    id: number;
    occupation: string;
    courses?: Array<Course>;
}
