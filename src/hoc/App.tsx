import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ContextProvider } from "../context/AppContext";
import Routing from "./Routing";

function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <Routing />
      </ContextProvider>
    </BrowserRouter>
  );
}

export default App;
