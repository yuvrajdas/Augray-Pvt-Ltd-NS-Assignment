import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import PageNotFound from './components/PageNotFound';
import { Routes, Route } from 'react-router-dom'
import AddData from "./components/AddData";
import EditData from "./components/EditData";
import ViewData from "./components/ViewData";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/*" element={<PageNotFound />} />
        <Route path="/add-data" element={<AddData />} />
        <Route path="/edit-data/:id" element={<EditData />} />
        <Route path="/view-data/:id" element={<ViewData />} />
      </Routes>
    </>
  );
}

export default App;
