export interface Exam {
    id: string;
    name: string;
    duration: number;
    startDate: Date;
    endDate: Date;
    average: number;
}

export interface Participant {
    code: string;
    name: string;
    size: number;
    description?: string;
}
