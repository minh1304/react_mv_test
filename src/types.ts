// types.ts
export interface ContactInfo {
    contactInfoID: string;
    contactType: string;
    contactDetail: string;
  }
  
  export interface Address {
    addressID: string;
    addressType: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  }
  
  export interface Patient {
    patientId: string;
    firstName: string;
    lastName: string;
    gender: string;
    dateOfBirth: string;
    isActive: boolean;
    contactInfos: ContactInfo[];
    addresses: Address[];
  }
  
  export interface FetchPatientsResponse {
    patients: Patient[];
    totalRecords: number;
  }
  