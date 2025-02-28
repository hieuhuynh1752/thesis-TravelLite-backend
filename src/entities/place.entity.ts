export interface Place {
  id: number;
  googlePlaceId: string;
  name: string | null;
  address: string | null;
  createdAt: Date;
  latitude: number;
  longtitude: number;
}
