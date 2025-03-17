
import React from 'react';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { ArrowLeft } from "lucide-react";
import Header from "../components/Header";


// NotFound component to display when a page is not found
const NotFound = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-16 flex items-center justify-center">
        {/* Animate the card appearance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="glass-card border border-border/50">
            <CardContent className="p-8 text-center">
              <h1 className="text-7xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">404</h1>
              <h2 className="text-2xl font-medium mb-6">Page Not Found</h2>
              <p className="text-muted-foreground mb-8">
                The page you are looking for might have been removed or is temporarily unavailable.
              </p>
              <Button asChild>
                <Link to="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Return to Home
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default NotFound;
