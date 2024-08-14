import { Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";
import "./App.css";

export default function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthLayout />}></Route>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Index />} />
      </Route>
    </Routes>
  );
}
