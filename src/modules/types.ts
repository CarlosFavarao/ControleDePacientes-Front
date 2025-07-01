export interface Page<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    numberOfElements: number;
    empty: boolean;
    first: boolean;
    last: boolean;
    pageable?: any;
    sort?: any;
}

export interface AvailableBedDTO {
    hospitalId: number;
    hospitalName: string;
    specialty: string;
    bedId: number;
    bedCode: string;
    roomId: number;
    roomCode: string;
}

export interface LogDTO{
    patientId: number;
    patientName: string;
    roomCode: string;
    specialty: string;
    admissionDate: string;
    dischargeDate: string;
    daysAdmitted: number;
    hospitalName: string;
}

export interface BedHistoryDTO{
    patientName: string;
    admissionDate: string;
    dischargeDate: string;
}

export interface BedResponseDTO{
    hospitalId: number;
    hospitalName: string;
    id: number;
    code: string;
    BedStatus: string;
    roomId: number;
    roomCode: string;
    patientId: number;
    patientName: string;
}
