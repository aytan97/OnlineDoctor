import React from "react";
import Category from "../../../network/models/Category";

export interface CategoryState {
  list: Category[] | any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  selected: Category | null;
}

export interface CategoryType {
  _id: string;
  categoryName: string;
  departmentName: string,
  description?: string;
  settings?: React.ReactNode;
  // tags: string[];
}
