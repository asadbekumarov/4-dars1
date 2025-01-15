import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Hero = () => {
  const notify = () => toast("Oddiy xabar!");
  const dismiss = () => toast.dismiss();
  const [buttonText, setButtonText] = useState("Edit");
  const showError = () => {
    toast.error("Ma'lumot muvaffaqiyatli o'chirildi!", {
      position: "bottom-right",
      autoClose: 3000,
      theme: "light",
    });
  };

  const showEdit = () => {
    toast.info("Ma'lumot muvaffaqiyatli tahrirlandi!", {
      position: "bottom-right",
      autoClose: 3000,
      theme: "light",
    });
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchData,
  });

  async function fetchData() {
    const response = await fetch("https://dummyjson.com/users");
    if (!response.ok) {
      throw new Error("eror");
    }
    const result = await response.json();
    return result;
  }

  if (isLoading) return <p className="text-center text-blue-500">loading...</p>;

  if (error)
    return <p className="text-center text-red-500">Xato: {error.message}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Users List
      </h1>
      <ul className="space-y-4">
        {data?.users?.map((user) => (
          <li
            key={user.id}
            className="p-4 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition duration-300"
          >
            <h2 className="text-xl font-semibold text-gray-700">
              FirstName: <span className="text-gray-900">{user.firstName}</span>
            </h2>
            <h2 className="text-xl font-semibold text-gray-700">
              LastName: <span className="text-gray-900">{user.lastName}</span>
            </h2>
            <p className="text-gray-600">Age: {user.age}</p>
            <div className="flex gap-4 mt-4">
              <button
                onClick={showError}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 active:scale-95 transition duration-300 transform"
              >
                Delete
              </button>
              <button
                onClick={showEdit}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 active:scale-95 transition duration-300 transform"
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
      <ToastContainer />
    </div>
  );
};

export default Hero;
