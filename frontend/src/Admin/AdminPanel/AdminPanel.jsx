import React, { useState, useEffect } from "react";
import "./AdminPanel.css";
import AdminFooter from "../AdminFooter/AdminFooter";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

const AdminPanel = () => {
  const [userCount, setUserCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);
  const [enquiryCount, setEnquiryCount] = useState({ read: 0, unread: 0 });
  const [feedbackCount, setFeedbackCount] = useState({ read: 0, unread: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setError("No auth token found. Please log in.");
          setLoading(false);
          return;
        }

        // Fetch users from the backend
        const userResponse = await axios.get(
          "http://127.0.0.1:5000/admin/get-users?page=1&per_page=100",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const users = userResponse.data.data.users;
        const normalUsers = users.filter((user) => !user.is_admin);
        const admins = users.filter((user) => user.is_admin);

        setUserCount(normalUsers.length);
        setAdminCount(admins.length);

        // Fetch messages
        const enquiryResponse = await axios.get(
          "http://127.0.0.1:5000/admin/get-messages?message_type=enquiry&page=1&per_page=100",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const feedbackResponse = await axios.get(
          "http://127.0.0.1:5000/admin/get-messages?message_type=feedback&page=1&per_page=100",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const enquiries = enquiryResponse.data.data.messages;
        const feedbacks = feedbackResponse.data.data.messages;

        const readEnquiries = enquiries.filter((msg) => msg.read).length;
        const unreadEnquiries = enquiries.length - readEnquiries;

        const readFeedbacks = feedbacks.filter((msg) => msg.read).length;
        const unreadFeedbacks = feedbacks.length - readFeedbacks;

        setEnquiryCount({ read: readEnquiries, unread: unreadEnquiries });
        setFeedbackCount({ read: readFeedbacks, unread: unreadFeedbacks });

        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch data.");
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      <AdminNavbar />
      <div className="AdminPanel grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center items-center min-h-screen bg-gray-300 p-4">
        {/* Total Users */}
        <Card
          color="white"
          variant="gradient"
          className="w-full max-w-sm mx-auto p-8 bg-gray-800 text-black"
        >
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 mb-8 rounded-none border-b border-gray-500 pb-8 text-center bg-green-300 p-4"
          >
            <Typography variant="h2" color="gray-700">
              Total Users
            </Typography>
          </CardHeader>
          <CardBody className="p-0">
            <Typography
              variant="h1"
              color="gray-100"
              className="mt-6 flex justify-center gap-1 text-7xl font-bold bg-gray-300 p-4"
            >
              {userCount}
            </Typography>
          </CardBody>
        </Card>

        {/* Total Admins */}
        <Card
          color="white"
          variant="gradient"
          className="w-full max-w-sm mx-auto p-8 bg-gray-800 text-black"
        >
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 mb-8 rounded-none border-b border-gray-500 pb-8 text-center bg-blue-300 p-4"
          >
            <Typography variant="h2" color="gray-700">
              Total Admins
            </Typography>
          </CardHeader>
          <CardBody className="p-0">
            <Typography
              variant="h1"
              color="gray-100"
              className="mt-6 flex justify-center gap-1 text-7xl font-bold bg-orange-300 p-4"
            >
              {adminCount}
            </Typography>
          </CardBody>
        </Card>

        {/* Total Enquiries */}
        <Card
          color="white"
          variant="gradient"
          className="w-full max-w-sm mx-auto p-8 bg-gray-800 text-black"
        >
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 mb-8 rounded-none border-b border-gray-500 pb-8 text-center bg-red-300 p-4"
          >
            <Typography variant="h2" color="gray-700">
              Enquiries
            </Typography>
          </CardHeader>
          <CardBody className="p-0">
            <Typography
              variant="h5"
              color="gray-100"
              className="flex justify-between mt-2 bg-green-200 p-4"
            >
              <span>Read:</span>
              <span>{enquiryCount.read}</span>
            </Typography>
            <Typography
              variant="h5"
              color="gray-100"
              className="flex justify-between mt-2 bg-red-200 p-4"
            >
              <span>Unread:</span>
              <span>{enquiryCount.unread}</span>
            </Typography>
          </CardBody>
        </Card>

        {/* Total Feedbacks */}
        <Card
          color="white"
          variant="gradient"
          className="w-full max-w-sm mx-auto p-8 bg-gray-800 text-black"
        >
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 mb-8 rounded-none border-b border-gray-500 pb-8 text-center bg-gray-400 p-4"
          >
            <Typography variant="h2" color="gray-700">
              Feedback
            </Typography>
          </CardHeader>
          <CardBody className="p-0">
            <Typography
              variant="h5"
              color="gray-100"
              className="flex justify-between mt-2 bg-green-200 p-4"
            >
              <span>Read:</span>
              <span>{feedbackCount.read}</span>
            </Typography>
            <Typography
              variant="h5"
              color="gray-100"
              className="flex justify-between mt-2 bg-red-200 p-4"
            >
              <span>Unread:</span>
              <span>{feedbackCount.unread}</span>
            </Typography>
          </CardBody>
        </Card>
      </div>
      <AdminFooter />
    </>
  );
};

export default AdminPanel;
