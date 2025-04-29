import { IBaseEntity } from "./core/IBaseEntity";

interface UserModel extends IBaseEntity {
  firstname: string;
  lastname: string;
  email?: string;
  status?: string;
  role?: string;
  phoneNumber?: string;
  image?: string;
  age: number;
  ssnId: string;
  categories: string[];
  languageSkills: string[] | undefined;
  workExperience: string;
  currentWorkHospital: string;
  biography: string;
  avgRating: string | number;
  totalRating: string | number;
}

export default UserModel;
