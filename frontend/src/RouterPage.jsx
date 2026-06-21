import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// User Pages
import Home from "./User/HomePage/Home";
import About from "./User/AboutPage/About";
import Map from "./User/Map/Map";
import MeetTheTeam from "./User/MeetTheTeam/MeetTheTeam";
import Login from "./User/Login/LoginForm";
import RegisterForm from "./User/Register/RegisterForm";
import ContactUs from "./User/ContactUs/ContactUs";
import Faq from "./User/frequentlyAskedQuestion/Faq";
import ResetPassword from "./User/ResetPass/ResetPass";
import RequestPasswordReset from "./User/ResetPass/RequestPasswordReset ";
// Admin Pages
import AdminPanel from "./Admin/AdminPanel/AdminPanel";
import Feedback from "./Admin/Feedback/Feedback";
import ContactUsTable from "./Admin/ContactUsTable/ContactUsTable";
import UserTableView from "./Admin/UserTableView/UserTable";
import AdminUserTable from "./Admin/AdminTable/AdminUserTable";

// Auth Components
import PrivateRoute from "./PrivateRoute";

const RouterPage = () => {
  return (
  
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/frequently-asked-question" element={<Faq />} />
        <Route path="/meet-the-team" element={<MeetTheTeam />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/request-password-reset" element={<RequestPasswordReset />} />


        {/* Protected Route for Map */}
        <Route path="/map" element={<Map />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin-panel"
          element={
            <PrivateRoute adminOnly={true}>
              <AdminPanel />
            </PrivateRoute>
          }
        />
        <Route
          path="/feedback-view-table"
          element={
            <PrivateRoute adminOnly={true}>
              <Feedback />
            </PrivateRoute>
          }
        />
        <Route
          path="/contact-us-table-view"
          element={
            <PrivateRoute adminOnly={true}>
              <ContactUsTable />
            </PrivateRoute>
          }
        />
        <Route
          path="/user-table-view"
          element={
            <PrivateRoute adminOnly={true}>
              <UserTableView />
            </PrivateRoute>
          }
        />
         <Route
          path="/admin-user-table"
          element={
            <PrivateRoute adminOnly={true}>
              <AdminUserTable />
            </PrivateRoute>
          }
        />
      </Routes>
      
      

  );
};

export default RouterPage;
