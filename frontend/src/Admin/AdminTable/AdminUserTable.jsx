import React, { useState, useEffect } from "react";
import AdminFooter from "../AdminFooter/AdminFooter";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import axios from "axios";

const AdminUserTable = () => {
  const [users, setUsers] = useState([]); // State for storing users
  const [error, setError] = useState(null); // State for errors
  const [loading, setLoading] = useState(true); // State for loading
  const [page, setPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total number of pages

  // Fetch admin users on component load or page change
  useEffect(() => {
    const fetchAdminUsers = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("authToken"); // Get token from localStorage
        if (!token) {
          setError("No auth token found. Please log in.");
          return;
        }

        // Fetch paginated admin users
        const response = await axios.get(
          `http://127.0.0.1:5000/admin/get-users?page=${page}&per_page=13`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Filter only admin users
        const adminUsers = response.data.data.users.filter((user) => user.is_admin);

        setUsers(adminUsers); // Set user data
        setTotalPages(response.data.meta.pages); // Set total pages
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch users.");
        setLoading(false);
      }
    };

    fetchAdminUsers();
  }, [page]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      <AdminNavbar />
      <div
        className="relative flex flex-col w-full h-full overflow-scroll"
        style={{ backgroundColor: "#CCCCCC", color: "black" }}
      >
        <table className="w-full text-left table-auto min-w-max">
          <thead>
            <tr>
              <th className="p-4 border-b border-gray-600 bg-gray-700">
                <p className="text-sm font-normal leading-none text-gray-300">
                  ID
                </p>
              </th>
              <th className="p-4 border-b border-gray-600 bg-gray-700">
                <p className="text-sm font-normal leading-none text-gray-300">
                  Username
                </p>
              </th>
              <th className="p-4 border-b border-gray-600 bg-gray-700">
                <p className="text-sm font-normal leading-none text-gray-300">
                  Email
                </p>
              </th>
              <th className="p-4 border-b border-gray-600 bg-gray-700">
                <p className="text-sm font-normal leading-none text-gray-300">
                  Active
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr className="hover:bg-gray-600" key={user.id}>
                <td className="p-4 border-b border-gray-700 bg-gray-900">
                  <p className="text-sm text-gray-100 font-semibold">{user.id}</p>
                </td>
                <td className="p-4 border-b border-gray-700 bg-gray-800">
                  <p className="text-sm text-gray-300">{user.username}</p>
                </td>
                <td className="p-4 border-b border-gray-700 bg-gray-900">
                  <p className="text-sm text-gray-300">{user.email}</p>
                </td>
                <td className="p-4 border-b border-gray-700 bg-gray-800">
                  <p className="text-sm text-gray-300">
                    {user.is_active ? "Active" : "Inactive"}
                  </p>
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
      <AdminFooter />
    </>
  );
};

export default AdminUserTable;
