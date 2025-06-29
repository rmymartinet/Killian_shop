import { FILTERS } from "@/utils/constant";
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
  imageUrls: string[];
  imageDetails?: string[];
  imageWidth?: number;
  imageHeight?: number;
  quantity?: number;
  
  // Nouveaux champs d'images spécifiques
  imageFace?: string;
  imageCoteDroit?: string;
  imageCoteGauche?: string;
  imageDos?: string;
  imageDessus?: string;
  imageEnsemble?: string;
  imageDetaillee?: string;
  imageEtiquette?: string;
}

export interface ProductDetailsProps {
  datas: Data;
  filteredDataById: Data[];
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
  className?: string;
}

export interface User {
  email: string;
  addressLine1: string;
  addressLine2: string;
  addressCity: string;
  addressState: string;
  addressPostalCode: string;
  addressCountry: string;
}

export interface CustomerAddress {
  line1?: string | null;
  line2?: string | null;
  city?: string | null;
  state?: string | null;
  postal_code?: string | null;
  country?: string | null;
}

export type FilterType = (typeof FILTERS)[keyof typeof FILTERS];

export interface AccordionProps {
  isOpen: boolean; // Indique si l'accordéon est ouvert
  title: string;
  description: string;
  onClick: () => void; // Fonction appelée au clic
}

export interface ThumbnailImagesListProps {
  data: Data[];
  refs: React.RefObject<HTMLDivElement>[];
  currentImageIndex: number;
  setCurrentImageIndex: (value: number) => void;
}

export interface ProductCardProps {
  filteredDataById: Data[];
  currentImageIndex: number;
  setCurrentImageIndex: (index: number) => void;
  imageDetailsLength: number[];
  hasValidImageDetails?: boolean;
}

export interface CartContextProps {
  cart: Data[];
  setCart: React.Dispatch<React.SetStateAction<Data[]>>;
  isShoppingOpen: boolean;
  setIsShoppingOpen: (isShoppingOpen: boolean) => void;
}

export interface StripeProduct {
  id: string;
  name: string;
  active: boolean;
}
