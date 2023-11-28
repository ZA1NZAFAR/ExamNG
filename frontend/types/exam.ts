// Exam type
export interface Exam {
    id: string;
    name: string;
    duration?: number;
    startDate: Date;
    endDate: Date;
    average?: number;
    participants: Array<Participant>;
}

// Student group having an access to exam
export interface Participant {
    code: string;
    name: string;
    size: number;
    description?: string;
}

// Course for which the exam is made
export interface Course {
    code: string;
    name: string;
    description?: string;
}
