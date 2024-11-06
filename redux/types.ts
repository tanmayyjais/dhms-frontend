// redux/types.ts
export interface HostelDetails {
    roomNumber: string;
    block: string;
  }
  
  export interface User {
    id: string;
    role: string;
    name: string;
    email: string;
    phonenumber: number;
    hostelDetails: HostelDetails;
    idnumber: number;
    enrollmentnumber: string;
  }
  
  // types.ts (or wherever you define types)
export interface SignupData {
    name: string;
    email: string;
    phonenumber: number;
    password: string;
    hostelDetails: {
      roomNumber: string;
      block: string;
    };
    idnumber: number;
    enrollmentnumber: string;
    role: string;
  }
  