import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./components/Home/inde";
import { Login } from "./components/Login";
import { NewUser } from "./components/NewUser";
import { SyncWallet } from "./components/SyncWallet";

export function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/singUp" element={<NewUser />} />
          <Route path="/connectWallet" element={<SyncWallet />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

