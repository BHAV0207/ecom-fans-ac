import React, { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 text-lg">No user data found.</p>
      </div>
    );
  }


  console.log("User data:", user);
  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center items-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-blue-800">{user.name}</h2>
        <p className="text-gray-600 mb-2">{user.email}</p>
        <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm mt-2">
          Role: {user.role}
        </span>
      </div>
    </div>
  );
}

export default Profile;
