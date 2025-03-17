
import React from "react";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ParticipantTable from "./pages/ParticipantTable";
import ParticipantDetail from "./pages/ParticipantDetail";
import ParticipantForm from "./pages/ParticipantForm";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Main App component
/*
// Wraps the application with necessary providers and routing
// QueryClientProvider for data fetching
// TooltipProvider for tooltips     
// Toaster for notifications
// Sonner for additional notifications 
// BrowserRouter for routing
// Routes for defining application routes
// Route for defining individual routes
*/

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/participants" element={<ParticipantTable />} />
          <Route path="/participants/new" element={<ParticipantForm />} />
          <Route path="/participants/:id" element={<ParticipantDetail />} />
          <Route path="/participants/:id/edit" element={<ParticipantForm />} />
          <Route path="*" element={<NotFound />} /> {/* Fallback route for 404 Not Found */}  
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
