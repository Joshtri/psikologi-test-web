// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "flowbite-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
        </Route> */}
      </Routes>

      {/* Contoh tombol Flowbite tetap bisa dipakai di mana saja */}
      <div className="fixed bottom-4 right-4">
        <Button color="default">Floating Button</Button>
      </div>
    </BrowserRouter>
    </>

  
  );
}

export default App;
