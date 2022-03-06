export enum AdType {
    PartTime = 'Part Time',
    FullTime = 'Full Time',
    Remote = 'Remote'
}

export enum AdCategory {
    OFFICE_ADM = 'Office Administration',
    DEV = 'Development'
}

export interface Ad {
    id?: number;
    creator?: number;
    title?: string;
    description?: string;
    likes?: number[];
    type?: AdType;
    category?: AdCategory;
    pendingApplicants?: number[];
    approvedApplicants?: number[];
    rejectedApplicants?: number[]
}
