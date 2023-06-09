import React from "react";

interface BodyProps {
  children: React.ReactNode;
}
const Body: React.FC<BodyProps> = ({ children }) => {
  return (
    <div className="min-h-screen ml-[25%] mr-0 ">
        {children}
    </div>
  );
};

export default Body;
