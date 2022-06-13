import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StrictMode } from "react";
import Main from "./Main";

const App = () => {
  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
};

render(<App />, document.getElementById("root"));
