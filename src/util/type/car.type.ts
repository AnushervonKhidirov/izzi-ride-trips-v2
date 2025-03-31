import type { TAutocompleteOption } from './form.type';

export type TCar = {
  car_id: number;
  number_of_seats: number;
  model: string;
  manufacturer: string;
  auto_number: string;
  color?: string;
  year: string | number;
  preferences: TCarPreferences;
  image?: string;
};

export type TCarFormBody = Omit<TCar, 'car_id' | 'model' | 'manufacturer'> & {
  role_id: number;
  manufacturer_id: number;
  model_id: number;
};

export type TCarFormEntries = {
  image?: string;
  manufacturer: string;
  model: string;
  number_of_seats: number;
  year: string | number;
  auto_number: string;
  color: string;
  animals?: string;
  child_car_seat?: string;
  luggage?: string;
  smoking?: string;
};

export type TCarPreferences = {
  smoking: boolean;
  child_car_seat: boolean;
  animals: boolean;
  luggage: boolean;
};

export type TCarManufacturer = {
  id: number;
  country: string;
  name: string;
};

export type TCarModel = {
  id: number;
  manufacturer_id: number;
  name: string;
};

export type TCarModelOption = TAutocompleteOption & {
  manufacturer_id: number;
};

export type TCarType =
  | 'Off-road vehicles'
  | 'Minivans'
  | 'Luxury saloon / Full-size luxury'
  | 'City car / Minicompact'
  | 'Supermini / Subcompact'
  | 'Executive / Full-size'
  | 'Small family / Compac'
  | 'Large family / Mid-size'
  | 'Sports';
