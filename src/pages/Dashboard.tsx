import React from "react";

const Dashboard: React.FC = () => {
  function handleLogOut() {
    localStorage.removeItem("access_token"); 
    window.location.reload(); 
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Soon !</h1>
      <p className="text-lg text-gray-600 mb-10">
       We are working on it !
      </p>
      <button
        onClick={handleLogOut}
        className="bg-red-500 text-white font-medium py-2 px-6 rounded-lg hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
