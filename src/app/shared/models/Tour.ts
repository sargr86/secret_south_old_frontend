export interface Tour {
  id?: number;
  name?: string;
  address?: string;
  lat?: number;
  lng?: number;
  partner_id?: number;
  tours_type_id?: number;
  type_name?: string;
  type?: string;
  images?: any;
  tour_locations?: any[];
  start_date?: string;
  max_participants_count?: string;
  tours_dailies?: string;
}
