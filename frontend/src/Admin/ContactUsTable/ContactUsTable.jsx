import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminFooter from "../AdminFooter/AdminFooter";
import AdminNavbar from "../AdminNavbar/AdminNavbar";

const ContactUsTable = () => {
  const [messages, setMessages] = useState([]); // State for storing messages
  const [page, setPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total pages
  const [error, setError] = useState(null); // Error state
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch messages on component load or page change
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("authToken");
        if (!token) {
          setError("No auth token found. Please log in.");
          setLoading(false);
          return;
        }

        // Fetch messages
        const response = await axios.get(
          `https://gcu-campus-guide-backend.onrender.com/admin/get-messages?page=${page}&per_page=10&message_type=enquiry`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMessages(response.data.data.messages);
        setTotalPages(response.data.meta.pages);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch messages.");
        setLoading(false);
      }
    };

    fetchMessages();
  }, [page]);

  // Handle read/unread toggle
  const handleSetReadStatus = async (messageId, currentReadStatus) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("No auth token found. Please log in.");
        return;
      }

      // Toggle read status
      await axios.post(
        "https://gcu-campus-guide-backend.onrender.com/admin/set-message-read",
        { message_id: messageId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update UI
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.message_id === messageId
            ? { ...msg, read: !currentReadStatus }
            : msg
        )
      );
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update message status.");
    }
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  if (loading) return <p>Loading messages...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return ( 
    <>
            <AdminNavbar/>

    <div
      className="relative flex flex-col w-full h-full overflow-scroll"
      style={{ backgroundColor: "#CCCCCC", color: "black" }}
    >
      <table className="w-full text-left table-auto min-w-max">
        <thead>
          <tr>
            <th className="p-4 border-b border-gray-600 bg-gray-700">
              <p className="text-sm font-normal leading-none text-gray-300">
                Message ID
              </p>
            </th>
            <th className="p-4 border-b border-gray-600 bg-gray-700">
              <p className="text-sm font-normal leading-none text-gray-300">
               Name
              </p>
            </th>
            <th className="p-4 border-b border-gray-600 bg-gray-700">
              <p className="text-sm font-normal leading-none text-gray-300">
                User ID
              </p>
            </th>
            <th className="p-4 border-b border-gray-600 bg-gray-700">
              <p className="text-sm font-normal leading-none text-gray-300">
                User Email
              </p>
            </th>
            <th className="p-4 border-b border-gray-600 bg-gray-700">
              <p className="text-sm font-normal leading-none text-gray-300">
                Message
              </p>
            </th>
            <th className="p-4 border-b border-gray-600 bg-gray-700">
              <p className="text-sm font-normal leading-none text-gray-300">
                Read
              </p>
            </th>
            <th className="p-4 border-b border-gray-600 bg-gray-700">
              <p className="text-sm font-normal leading-none text-gray-300">
                Action
              </p>
            </th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => (
            <tr className="hover:bg-gray-600" key={message.message_id}>
              <td className="p-4 border-b border-gray-700 bg-gray-900">
                <p className="text-sm text-gray-100 font-semibold">
                  {message.message_id}
                </p>
              </td>
              <td className="p-4 border-b border-blue-700 bg-gray-900">
                <p className="text-sm text-gray-100 font-semibold">
                  {message.username}
                </p>
              </td>
              <td className="p-4 border-b border-gray-700 bg-gray-800">
                <p className="text-sm text-gray-300">{message.user_id}</p>
              </td>
              <td className="p-4 border-b border-gray-700 bg-gray-900">
                <p className="text-sm text-gray-300">{message.email}</p>
              </td>
              <td className="p-4 border-b border-gray-700 bg-gray-800">
                <p className="text-sm text-gray-300">{message.message}</p>
              </td>
              <td className="p-4 border-b border-gray-700 bg-gray-900">
                <p className="text-sm text-gray-300">
                  {message.read ? "Read" : "Unread"}
                </p>
              </td>
              <td className="p-4 border-b border-gray-700 bg-gray-800">
                <button
                  className={`px-2 py-1 rounded hover:opacity-80 ${
                    message.read ? "bg-red-500" : "bg-blue-500"
                  } text-white`}
                  onClick={() =>
                    handleSetReadStatus(message.message_id, message.read)
                  }
                >
                  {message.read ? "Mark as Unread" : "Mark as Read"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between p-4 bg-gray-700">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-gray-300">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
      
    </div>
    <AdminFooter/>
    </>
  );
};

export default ContactUsTable;
