// File: src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import ParticipantList from "./components/ParticipantList";
import ParticipantForm from "./components/ParticipantForm";
import Dashboard from "./components/Dashboard";

function App() {
  // This is the main component that will be rendered by the index.js file
  // I'm having a Router component that will be used to define the routes for the application
  // I have a Navbar component that will be used to display the navigation bar at the top of the page
  // I have a Container component that will be used to wrap the content of the application
  return (
    <Router>
      <Navbar />
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/participants" element={<ParticipantList />} />
          <Route path="/participants/add" element={<ParticipantForm />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;