import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Home from './pages/Home/Home';
import AdminLogin from './pages/Admin/AdminLogin';
import { AuthContextProvider } from './Contexts/AuthContext';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
