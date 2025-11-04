import React from "react";

const AuthInfoMessage = ({
  type,
  message,
}: {
  type: "error" | "success" | "";
  message: string;
}) => {
  return (
    <div
      className={`w-full h-fit p-2 rounded-none border ${
        type === "error"
          ? "bg-red-300 border-red-700"
          : "bg-green-300 border-green-700"
      }`}
    >
      {message}
    </div>
  );
};

export default AuthInfoMessage;
