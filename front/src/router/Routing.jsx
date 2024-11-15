import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Inicio from "../components/inicio";

const Routing = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default Routing;
