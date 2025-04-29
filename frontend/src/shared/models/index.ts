import React, { SetStateAction, Dispatch } from "react";
import Category from "../../network/models/Category";

export interface ICard {
  title: string;
  description?: string;
  img?: React.ReactNode;
  icon?: string;
  className?: string;
  style?: any;
}

export interface DCard {
  id: string;
  name: string;
  photo: string;
  scpeicialities: string[];
  hospital: string;
  languageSkills: string[];
  workExperience: string;
  avgRating?: string | number;
  totalRating?: string | number;
  totalPatients?: string | number;
}

export interface AppointmentCard {
  doctorid?: string;
  patientid?: string;
  name?: string;
  photo?: string;
  scpeicialities?: string[];
  hospital?: string;
  date: string;
  time: string;
}

export interface BCard {
  id?: string | number;
  categoryId?: string | number;
  title?: string;
  description?: string;
  image?: string;
  body?: string;
  authorId?: string;
  status?: string;
  tags?: string[];
  createdAt?: Date | any;
  avgRating?: string | number;
  totalRating?: string | number;
}

export interface IToggle {
  role: string;
  toggleSwitch?: () => void;
}

export type TOverlay = {
  signIn: boolean;
  setSignIn: Dispatch<SetStateAction<boolean>>;
};

export interface DoctorSignupFormValues {
  firstname: string;
  lastname: string;
  email: string;
  ssnId: string;
  categories?: Category[] | any[];
  password: string;
  confirmPassword: string;
  role?: string;
}

export interface HeaderUserProps {
  onClose: () => void;
}

interface DateOptionsProps {
  day: "numeric" | "2-digit";
  month: "numeric" | "2-digit" | "long" | "short" | "narrow" | undefined;
  year: "numeric" | "2-digit" | undefined;
}

export const formattedDate = (createdAt: Date, options?: DateOptionsProps) => {
  const date = new Date(createdAt);
  const defaultOptions: DateOptionsProps = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };
  const mergedOptions: Intl.DateTimeFormatOptions = {
    ...defaultOptions,
    ...options,
  };
  return date.toLocaleDateString("en-GB", mergedOptions);
};
