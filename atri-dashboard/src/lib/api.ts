
import { Participant, ParticipantFormData } from '@/types';
import { toast } from '@/components/ui/use-toast';

// Mock data
const mockParticipants: Participant[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    dob: '1980-05-15',
    gender: 'Male',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    address: '123 Main St',
    city: 'San Francisco',
    state: 'CA',
    zip: '94105',
    enrollmentDate: '2023-01-15',
    studyId: 'ADNI-2023-001',
    status: 'active',
    notes: 'Participant is responding well to treatment.'
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    dob: '1975-09-22',
    gender: 'Female',
    email: 'jane.smith@example.com',
    phone: '(555) 987-6543',
    address: '456 Oak Ave',
    city: 'Los Angeles',
    state: 'CA',
    zip: '90001',
    enrollmentDate: '2023-02-01',
    studyId: 'ADNI-2023-002',
    status: 'active',
    notes: 'Patient has history of hypertension.'
  },
  {
    id: '3',
    firstName: 'Michael',
    lastName: 'Johnson',
    dob: '1968-11-30',
    gender: 'Male',
    email: 'michael.j@example.com',
    phone: '(555) 456-7890',
    address: '789 Pine St',
    city: 'San Diego',
    state: 'CA',
    zip: '92101',
    enrollmentDate: '2023-01-20',
    studyId: 'ADNI-2023-003',
    status: 'completed',
    notes: 'Completed all study visits.'
  },
  {
    id: '4',
    firstName: 'Sarah',
    lastName: 'Williams',
    dob: '1982-03-12',
    gender: 'Female',
    email: 'sarah.w@example.com',
    phone: '(555) 234-5678',
    address: '101 Cedar Blvd',
    city: 'Sacramento',
    state: 'CA',
    zip: '95814',
    enrollmentDate: '2023-02-10',
    studyId: 'ADNI-2023-004',
    status: 'withdrawn',
    notes: 'Withdrew due to relocation.'
  },
  {
    id: '5',
    firstName: 'Robert',
    lastName: 'Brown',
    dob: '1971-07-24',
    gender: 'Male',
    email: 'robert.b@example.com',
    phone: '(555) 345-6789',
    address: '202 Maple Dr',
    city: 'San Jose',
    state: 'CA',
    zip: '95113',
    enrollmentDate: '2023-01-25',
    studyId: 'ADNI-2023-005',
    status: 'active',
    notes: 'No significant findings to date.'
  },
  {
    id: '6',
    firstName: 'Emily',
    lastName: 'Davis',
    dob: '1985-12-03',
    gender: 'Female',
    email: 'emily.d@example.com',
    phone: '(555) 567-8901',
    address: '303 Birch St',
    city: 'Oakland',
    state: 'CA',
    zip: '94612',
    enrollmentDate: '2023-02-05',
    studyId: 'ADNI-2023-006',
    status: 'screening',
    notes: 'Currently in screening process.'

    // generate more participants as needed
    },
    {
      id: '7',
      firstName: 'David',
      lastName: 'Miller',
      dob: '1990-08-14',
      gender: 'Male',
      email: 'david.m@example.com',
      phone: '(555) 678-9012',
      address: '404 Elm St',
      city: 'Fresno',
      state: 'CA',
      zip: '93722',
      enrollmentDate: '2023-03-01',
      studyId: 'ADNI-2023-007',
      status: 'active',
      notes: 'No adverse events reported.'
    },
    {
      id: '8',
      firstName: 'Laura',
      lastName: 'Wilson',
      dob: '1988-02-19',
      gender: 'Female',
      email: 'laura.w@example.com',
      phone: '(555) 789-0123',
      address: '505 Spruce St',
      city: 'Bakersfield',
      state: 'CA',
      zip: '93309',
      enrollmentDate: '2023-03-10',
      studyId: 'ADNI-2023-008',
      status: 'active',
      notes: 'Participant has mild allergies.'
    },
    {
      id: '9',
      firstName: 'James',
      lastName: 'Anderson',
      dob: '1979-11-25',
      gender: 'Male',
      email: 'james.a@example.com',
      phone: '(555) 890-1234',
      address: '606 Willow St',
      city: 'Long Beach',
      state: 'CA',
      zip: '90805',
      enrollmentDate: '2023-03-15',
      studyId: 'ADNI-2023-009',
      status: 'completed',
      notes: 'Completed study with no issues.'
    },
    {
      id: '10',
      firstName: 'Olivia',
      lastName: 'Martinez',
      dob: '1992-06-30',
      gender: 'Female',
      email: 'olivia.m@example.com',
      phone: '(555) 901-2345',
      address: '707 Redwood St',
      city: 'Anaheim',
      state: 'CA',
      zip: '92801',
      enrollmentDate: '2023-03-20',
      studyId: 'ADNI-2023-010',
      status: 'withdrawn',
      notes: 'Withdrew due to personal reasons.'
    }
  
];

// Simulate API delay
// Here we simulate a delay for API calls,
// this is just for demonstration purposes.
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Get all participants
// This function fetches all participants from the mock data from the above
export const getParticipants = async (): Promise<Participant[]> => {
  try {
    // Simulate API call
    await delay(800);
    return [...mockParticipants];
  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to fetch participants",
      variant: "destructive",
    });
    throw error;
  }
};

// Get a participant by ID
export const getParticipantById = async (id: string): Promise<Participant | undefined> => {
  try {
    // Simulate API call
    await delay(600); // Set a delay for the API call 0.6 seconds
    return mockParticipants.find(p => p.id === id);
  } catch (error) {
    toast({
      title: "Error",
      description: `Failed to fetch participant with ID: ${id}`,
      variant: "destructive",
    });
    throw error;
  }
};

// Let's create a new participant and add to the mock data
export const createParticipant = async (participant: ParticipantFormData): Promise<Participant> => {
  try {
    // Simulate API call to create a new participant
    await delay(1000);
    
    const newParticipant: Participant = {
      ...participant,
      id: String(mockParticipants.length + 1),
    };
    
    mockParticipants.push(newParticipant);
    
    // Notify the user of success or failure
    toast({
      title: "Success",
      description: "Participant added successfully",
    });
    
    return newParticipant;
  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to add participant",
      variant: "destructive",
    });
    throw error;
  }
};

// Update a participant
export const updateParticipant = async (id: string, participant: ParticipantFormData): Promise<Participant> => {
  try {
    // Simulate API call
    await delay(1000);
    
    const index = mockParticipants.findIndex(p => p.id === id);
    if (index === -1) { // Check if participant exists
      throw new Error(`Participant with ID ${id} not found`);
    }
    
    const updatedParticipant: Participant = {
      ...participant,
      id,
    };
    
    mockParticipants[index] = updatedParticipant;
    
    toast({
      title: "Success",
      description: "Participant updated successfully",
    });
    
    return updatedParticipant;
  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to update participant",
      variant: "destructive",
    });
    throw error;
  }
};

// Delete a participant
export const deleteParticipant = async (id: string): Promise<void> => {
  try {
    // Simulate API call
    await delay(1000);
    
    const index = mockParticipants.findIndex(p => p.id === id);
    if (index === -1) { // Check if participant exists and if not, throw an error
      throw new Error(`Participant with ID ${id} not found`);
    }
    // Delete the participant from the mock data 
    mockParticipants.splice(index, 1);
    
    toast({
      title: "Success",
      description: "Participant deleted successfully",
    });
  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to delete participant",
      variant: "destructive",
    });
    throw error;
  }
};
