export interface Participant {
    id: number;
    firstName: string;
    lastName: string;
    // Add other relevant participant properties
    status?: number; // Optional status property (0: Deactivated, 1: Active)
  }