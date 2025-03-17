import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import {
  Edit,
  ArrowLeft,
  Trash,
  Calendar,
  Mail,
  Phone,
  MapPin,
  ClipboardList,
  Info,
} from "lucide-react";
import Header from "../components/Header";
import LoadingState from "../components/LoadingState";
import { getParticipantById, deleteParticipant } from "../lib/api";
import { Participant } from "../types";
import { cn } from "../lib/utils";

const ParticipantDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [participant, setParticipant] = useState<Participant | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

// Fetch participant data by ID and handle loading state
  useEffect(() => {
    const fetchParticipant = async () => {
      if (!id) return;

      try {
        const data = await getParticipantById(id);
        if (data) {
          setParticipant(data);
        } else {
          navigate("/participants", { replace: true });
        }
      } catch (error) {
        console.error("Error fetching participant:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchParticipant();
  }, [id, navigate]);

  // Handle participant deletion redirects to the participant list
  const handleDelete = async () => {
    if (!id) return;

    setIsDeleting(true);
    try {
      await deleteParticipant(id);
      navigate("/participants", { replace: true });
    } catch (error) {
      console.error("Error deleting participant:", error);
      setIsDeleting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "withdrawn":
        return "bg-red-100 text-red-800 border-red-200";
      case "screening":
        return "bg-amber-100 text-amber-800 border-amber-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Calculate age from date of birth 
  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
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


  // If participant is not found, show a not found message
  if (!participant) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 pt-24 pb-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Participant Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The participant you're looking for doesn't exist or was removed.
            </p>
            <Button asChild>
              <Link to="/participants">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Participants
              </Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <Button asChild variant="ghost" size="sm" className="mr-4">
              <Link to="/participants">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Link>
            </Button>

            <h1 className="text-2xl md:text-3xl font-bold truncate flex-1">
              {participant.firstName} {participant.lastName}
            </h1>

            <div className="flex space-x-2 ml-4">
              <Button asChild variant="outline" size="sm">
                <Link to={`/participants/${id}/edit`}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Link>
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive border-destructive/30 hover:bg-destructive/10"
                  >
                    <Trash className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete participant?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the participant record and all associated data.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      {isDeleting ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="glass-card mb-6 overflow-hidden border border-border/50">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                  <div>
                    <Badge
                      className={cn("mb-2", getStatusColor(participant.status))}
                    >
                      {participant.status.charAt(0).toUpperCase() +
                        participant.status.slice(1)}
                    </Badge>
                    <h2 className="text-lg font-medium">
                      Study ID: {participant.studyId}
                    </h2>
                  </div>

                  <div className="mt-4 sm:mt-0 flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">
                      Enrolled:{" "}
                      {new Date(
                        participant.enrollmentDate
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <Separator className="mb-6" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">
                      Personal Information
                    </h3>

                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-muted-foreground block">
                          Full Name
                        </span>
                        <span className="font-medium">
                          {participant.firstName} {participant.lastName}
                        </span>
                      </div>

                      <div>
                        <span className="text-sm text-muted-foreground block">
                          Date of Birth
                        </span>
                        <span className="font-medium">
                          {new Date(participant.dob).toLocaleDateString()}
                          <span className="text-sm text-muted-foreground ml-2">
                            ({calculateAge(participant.dob)} years)
                          </span>
                        </span>
                      </div>

                      <div>
                        <span className="text-sm text-muted-foreground block">
                          Gender
                        </span>
                        <span className="font-medium">
                          {participant.gender}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">
                      Contact Information
                    </h3>

                    <div className="space-y-3">
                      <div className="flex items-start">
                        <Mail className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                        <div>
                          <span className="text-sm text-muted-foreground block">
                            Email
                          </span>
                          <span className="font-medium">
                            {participant.email}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Phone className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                        <div>
                          <span className="text-sm text-muted-foreground block">
                            Phone
                          </span>
                          <span className="font-medium">
                            {participant.phone}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                        <div>
                          <span className="text-sm text-muted-foreground block">
                            Address
                          </span>
                          <span className="font-medium">
                            {participant.address}
                            <br />
                            {participant.city}, {participant.state}{" "}
                            {participant.zip}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {participant.notes && (
              <Card className="glass-card border border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    <ClipboardList className="h-4 w-4 mr-2 text-muted-foreground" />
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Notes
                    </h3>
                  </div>
                  <p className="whitespace-pre-line">{participant.notes}</p>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default ParticipantDetail;
