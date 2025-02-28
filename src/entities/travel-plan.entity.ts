export enum TravelMode {
  DRIVING = 'DRIVING',
  TRANSIT = 'TRANSIT',
  BICYCLING = 'BICYCLING',
  WALKING = 'WALKING',
}
export interface TravelPlan {
  id: number;
  eventId: number;
  participantId: number;
  originPlaceId: number;
  destinationPlaceId: number;
  travelMode: TravelMode;
  plannedAt: Date;
}
