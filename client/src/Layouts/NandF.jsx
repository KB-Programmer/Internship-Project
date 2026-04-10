import React, { useState } from "react";
import { Outlet, useParams } from "react-router-dom";

const NandF = () => {
  const {header} = useParams()
  return (
    <div>
      <div className="flex flex-col-reverse md:flex-row px-2 pt-2">
        {/* Navigation Part */}
        <div className="bg-blue-500 p-2 w-full md:static fixed bottom-0 z-60 backdrop-blur-md md:w-64 md:min-h-screen">
          h
        </div>
        {/* Main Part */}
        <div className="bg-green-500 p-2 flex-1">
          <div className="flex flex-col gap-2">
            {/* Header Section */}
            <div className="">
              <h1>
                {header || 'Dashboard'}
              </h1>
            </div>
            {/* Body Section */}
            <div className="">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NandF;
