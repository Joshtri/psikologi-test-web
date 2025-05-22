// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
import { ThemeConfig } from "flowbite-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/home/home";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <ThemeConfig dark={false} />
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
