export enum EventParticipantStatus {
  PENDING = 'PENDING',
  DECLINED = 'DECLINED',
  ACCEPTED = 'ACCEPTED',
}

export interface EventParticipant {
  id: number;
  eventId: number;
  userId: number;
  assignedAt: Date;
  status?: EventParticipantStatus;
}
