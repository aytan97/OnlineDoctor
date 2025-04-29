export interface Prescription {
  id: string;
  doctorId: string;
  patientid: string;
  dosage: string;
  items: string[];
  name: string[];
  timeofday: string[];
  toBeTakenItems: string[];
  createdAt: string;
}
