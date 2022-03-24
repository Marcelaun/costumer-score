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
import Dashboard from './pages/Dashboard/Dashboard';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';



function App() {
  return (
    <Router>
     <AuthContextProvider>
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/dashboard" element={ <ProtectedRoute><Dashboard /></ProtectedRoute> } />
      </Routes>
     </AuthContextProvider>
    </Router>
  );
}

export default App;
