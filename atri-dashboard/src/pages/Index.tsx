import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Users, ClipboardList, PlusCircle, ChevronRight } from "lucide-react";
import Header from "../components/Header";
import { getParticipants } from "../lib/api";
import { Participant } from "../types";

const Index = () => {
  // State to hold participants data
  // First initialize state as an empty array and replace it with the fetched data
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Fetch participants data and checks for errors
    const fetchParticipants = async () => {
      try {
        const data = await getParticipants();
        setParticipants(data);
      } catch (error) {
        console.error("Error fetching participants:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchParticipants();
  }, []);

  // State to hold the number of participants in different categories
  // Filter participants based on their status
  // Count the number of participants in each category
  const activeParticipants = participants.filter(
    (p) => p.status === "active"
  ).length;
  const screeningParticipants = participants.filter(
    (p) => p.status === "screening"
  ).length;
  const completedParticipants = participants.filter(
    (p) => p.status === "completed"
  ).length;

  // Define animation variants for the container and items
  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const itemVariants = {
    hidden: {
      y: 20,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };
  // Render the main page
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 pt-24 pb-16">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Research Studies Dashboard
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto"></p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            <Card className="glass-card hover-scale">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium text-xl mb-1">
                    {isLoading ? "..." : activeParticipants}
                  </h3>
                  <p className="text-muted-foreground">Active</p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card hover-scale">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                    <ClipboardList className="h-6 w-6 text-amber-600" />
                  </div>
                  <h3 className="font-medium text-xl mb-1">
                    {isLoading ? "..." : screeningParticipants}
                  </h3>
                  <p className="text-muted-foreground">In Screening</p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card hover-scale">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <ClipboardList className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-medium text-xl mb-1">
                    {isLoading ? "..." : completedParticipants}
                  </h3>
                  <p className="text-muted-foreground">Completed</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col space-y-4 items-center"
          >
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link to="/participants">
                <Users className="mr-2 h-5 w-5" />
                View All Participants
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            {/* <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              <Link to="/participants/new">
                <PlusCircle className="mr-2 h-5 w-5" />
                Add New Participant
              </Link>
            </Button> */}
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};
export default Index;
