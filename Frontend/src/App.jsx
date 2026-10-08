import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import ApplyJob from "./pages/ApplyJob";
import MyApplications from "./pages/MyApplications";
import EmployerDashboard from "./pages/EmployerDashboard";
import CreateJob from "./pages/CreateJob";
import EditJob from "./pages/EditJob";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Public Routes */}

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/jobs" element={<Jobs />} />

        <Route path="/jobs/:id" element={<JobDetails />} />

        {/* Job Seeker Only */}

        <Route
          path="/jobs/:id/apply"
          element={
            <ProtectedRoute allowedRoles={["jobseeker"]}>
              <ApplyJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-applications"
          element={
            <ProtectedRoute allowedRoles={["jobseeker"]}>
              <MyApplications />
            </ProtectedRoute>
          }
        />

        {/* Employer Only */}

        <Route
          path="/create-job"
          element={
            <ProtectedRoute allowedRoles={["employer"]}>
              <CreateJob />
            </ProtectedRoute>
          }
        />
                <Route
          path="/edit-job/:id"
          element={
            <ProtectedRoute allowedRoles={["employer"]}>
              <EditJob />
            </ProtectedRoute>
          }s
        />

        <Route
          path="/employer-dashboard"
          element={
            <ProtectedRoute allowedRoles={["employer"]}>
              <EmployerDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;