// This file defines the types used in the application


// It represents a participant in the system and the structure of the data we work with
// this will be used in various components and API calls 
export interface Participant {
  id: string;
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  enrollmentDate: string;
  studyId: string;
  status: 'active' | 'completed' | 'withdrawn' | 'screening';
  notes?: string;
}

// This type is used when creating or updating a participant
// It omits the 'id' field since it is not needed when creating a new participant
export type ParticipantFormData = Omit<Participant, 'id'>;

// This interface is used for API responses
// It includes the data, loading state, and any error that may occur
// This is a generic type that can be used for any type of data
export interface ApiResponse<T> {
  data: T;
  isLoading: boolean;
  error: Error | null;
}
