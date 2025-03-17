import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // animation library
import { z } from 'zod'; // library for schema validation https://zod.dev/
import { useForm } from 'react-hook-form'; // Hook Form
import { zodResolver } from '@hookform/resolvers/zod'; // Hook Form Zod Resolver
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { ArrowLeft, Save } from 'lucide-react';
import Header from '../components/Header';
import LoadingState from '../components/LoadingState';
import { getParticipantById, createParticipant, updateParticipant } from '../lib/api';
import { Participant, ParticipantFormData } from '../types';

// Form schema
// All fields are required except notes and the default status is 'screening'
const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  dob: z.string().min(1, 'Date of birth is required'),
  gender: z.string().min(1, 'Gender is required'),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  phone: z.string().min(1, 'Phone number is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zip: z.string().min(1, 'ZIP code is required'),
  enrollmentDate: z.string().min(1, 'Enrollment date is required'),
  studyId: z.string().min(1, 'Study ID is required'),
  status: z.enum(['active', 'completed', 'withdrawn', 'screening']),
  notes: z.string().optional(),
});

// ParticipantForm component
const ParticipantForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;
  
  const [isLoading, setIsLoading] = useState(isEditMode);
  const [isSaving, setIsSaving] = useState(false);
  

  // Creating UseForm hook with Zod resolver for validation
  const form = useForm<ParticipantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      dob: '',
      gender: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      enrollmentDate: new Date().toISOString().split('T')[0],
      studyId: '',
      status: 'screening',
      notes: '',
    },
  });

  useEffect(() => {
    const fetchParticipant = async () => {
      if (!isEditMode) {
        setIsLoading(false);
        return;
      }
      
      try {
        const data = await getParticipantById(id);
        if (data) {
          // Format date strings for form inputs
          const formattedData = {
            ...data,
            dob: new Date(data.dob).toISOString().split('T')[0],
            enrollmentDate: new Date(data.enrollmentDate).toISOString().split('T')[0],
          };
          form.reset(formattedData);
        } else {
          navigate('/participants', { replace: true });
        }
      } catch (error) {
        console.error('Error fetching participant:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchParticipant();
  }, [id, isEditMode, navigate, form]);


  // Callback function to handle form submission
  // It checks if it's edit mode or create mode and calls the respective API function

  const onSubmit = async (data: ParticipantFormData) => {
    setIsSaving(true);
    
    try {
      if (isEditMode && id) {
        await updateParticipant(id, data);
        navigate(`/participants/${id}`, { replace: true });
      } else {
        const newParticipant = await createParticipant(data);
        navigate(`/participants/${newParticipant.id}`, { replace: true });
      }
    } catch (error) {
      console.error('Error saving participant:', error);
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 pt-24 pb-16 flex items-center justify-center">
          <LoadingState variant="dots" text="Loading participant data..." />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center mb-6">
            <Button 
              asChild 
              variant="ghost" 
              size="sm" 
              className="mr-4"
            >
              <Link to={isEditMode ? `/participants/${id}` : "/participants"}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Link>
            </Button>
            
            <h1 className="text-2xl font-bold flex-1">
              {isEditMode ? 'Edit Participant' : 'Add New Participant'}
            </h1>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Form Card*/}
            <Card className="glass-card border border-border/50">
              <CardContent className="p-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="First name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Last name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="dob"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date of Birth</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Gender</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Male">Male</SelectItem>
                                <SelectItem value="Female">Female</SelectItem>
                                <SelectItem value="Non-binary">Non-binary</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="Email address" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input placeholder="Phone number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem className="col-span-full">
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Input placeholder="Street address" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="City" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-3">
                        <FormField
                          control={form.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>State</FormLabel>
                              <FormControl>
                                <Input placeholder="State" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="zip"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>ZIP Code</FormLabel>
                              <FormControl>
                                <Input placeholder="ZIP code" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="studyId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Study ID</FormLabel>
                            <FormControl>
                              <Input placeholder="Study ID" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="enrollmentDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Enrollment Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="screening">Screening</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="withdrawn">Withdrawn</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem className="col-span-full">
                            <FormLabel>Notes</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Enter any additional notes here..." 
                                className="min-h-[100px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="flex justify-end space-x-3 pt-4">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => navigate(isEditMode ? `/participants/${id}` : '/participants')}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" disabled={isSaving}>
                        <Save className="h-4 w-4 mr-2" />
                        {isSaving ? 'Saving...' : 'Save Participant'}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default ParticipantForm;
