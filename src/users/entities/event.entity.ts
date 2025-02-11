import { EventOccurrence } from '@prisma/client';

export interface Event {
  id: number;
  creatorId: number;
  participantIds?: number[];
  locationId: number | null;
  dateTime: Date;
  occurrence: EventOccurrence;
  title: string;
  description: string | null;
  createdAt?: Date;
}
