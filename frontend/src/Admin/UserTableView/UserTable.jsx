import React, { useState, useEffect } from "react";
import AdminFooter from "../AdminFooter/AdminFooter";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import axios from "axios";

const UserTable = () => {
  const [users, setUsers] = useState([]); // State for storing users
  const [error, setError] = useState(null); // State for errors
  const [loading, setLoading] = useState(true); // State for loading
  const [showModal, setShowModal] = useState(false); // State for showing modal
  const [selectedUser, setSelectedUser] = useState(null); // State for the selected user to edit
  const [page, setPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total number of pages

  // Fetch users on component load or page change
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("authToken"); // Get token from localStorage
        if (!token) {
          setError("No auth token found. Please log in.");
          return;
        }

        // Fetch paginated users
        const response = await axios.get(
          `http://127.0.0.1:5000/admin/get-users?page=${page}&per_page=13`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUsers(response.data.data.users); // Set user data
        setTotalPages(response.data.meta.pages); // Set total pages
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch users.");
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page]);

  // Handle Admin Status Change
  const handleAdminToggle = async (userId, newStatus) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("No auth token found. Please log in.");
        return;
      }

      await axios.post(
        "http://127.0.0.1:5000/admin/change-admin-status",
        {
          user_id: userId,
          new_is_admin: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update UI after successful admin status change
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, is_admin: newStatus } : user
        )
      );
    } catch (err) {
      setError(err.response?.data?.error || "Failed to change admin status.");
    }
  };

  // Handle Editing User
  const handleEditUser = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("No auth token found. Please log in.");
      return;
    }

    try {
      await axios.post(
        "http://127.0.0.1:5000/admin/edit-user",
        {
          user_id: selectedUser.id,
          username: selectedUser.username,
          email: selectedUser.email,
          is_active: selectedUser.is_active,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update UI after successful user edit
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUser.id ? selectedUser : user
        )
      );

      setShowModal(false); // Close modal after successful update
    } catch (err) {
      setError(err.response?.data?.error || "Failed to edit user.");
    }
  };

  const openEditModal = (user) => {
    setSelectedUser({ ...user }); // Clone user to edit
    setShowModal(true);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  if (loading) return <p>Loading users...</p>;
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
                Admin
              </p>
            </th>
            <th className="p-4 border-b border-gray-600 bg-gray-700">
              <p className="text-sm font-normal leading-none text-gray-300">
                Active
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
                  {user.is_admin ? "Yes" : "No"}
                </p>
              </td>
              <td className="p-4 border-b border-gray-700 bg-gray-900">
                <p className="text-sm text-gray-300">
                  {user.is_active ? "Active" : "Inactive"}
                </p>
              </td>
              <td className="p-4 border-b border-gray-700 bg-gray-800">
                <button
                  className="text-blue-400 hover:underline mr-2"
                  onClick={() => handleAdminToggle(user.id, !user.is_admin)}
                >
                  {user.is_admin ? "Revoke Admin" : "Make Admin"}
                </button>
                <button
                  className="text-red-400 hover:underline"
                  onClick={() => openEditModal(user)}
                >
                  Edit User
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

      {/* Modal for Editing User */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-lg text-black w-1/3">
            <h2 className="text-lg font-bold mb-4">Edit User</h2>
            <form onSubmit={handleEditUser}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Username</label>
                <input
                  type="text"
                  value={selectedUser.username}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, username: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={selectedUser.email}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, email: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Active</label>
                <select
                  value={selectedUser.is_active}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      is_active: e.target.value === "true",
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="py-2 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    <AdminFooter/>
    </>
  );
};

export default UserTable;
