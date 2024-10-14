import { Dispatch, SetStateAction } from "react";

export interface Data {
  id: string;
  category?: string;
  title: string;
  price: number;
  length?: number;
  weight?: number;
  waistline?: string;
  material?: string;
  imageUrls: string;
  imageDetails?: string;
  imageWidth?: number;
  imageHeight?: number;
  quantity?: number;
}

export interface ProductDetailsProps {
  datas: Data;
  setIsShoppingOpen: (value: boolean) => void;
  filteredDataById: Data[];
  addToCart: (value: Data) => void;
}

export interface CardProps {
  title: string;
  description: string;
}

export interface TransitionLinkProps {
  href: string;
  label?: string;
  children?: React.ReactNode;
  setIsClicked?: Dispatch<SetStateAction<boolean>>;
}
