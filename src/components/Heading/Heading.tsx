import React from "react";

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-bold text-3xl text-left my-12 ml-10">{children}</h2>
  );
}

export default Heading;
