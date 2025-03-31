export type TTrip = Readonly<{
  id: string;
  from: string;
  to: string;
  price: number;
  client_auto_id: string; // NOTE: possible for getting car data
  number_of_seats: number;
  departure_time: number;
  arrival_time: number;
  payment_method: string;
}>;
