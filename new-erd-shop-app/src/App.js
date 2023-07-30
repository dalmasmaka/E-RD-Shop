import './App.css';
import Home from './Pages/Home/Home';
import Header from './Pages/Header/Header'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Dashboard from './Pages/Management/Components/Dashboard';


function App() {
  return (
    <>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/dashboard/*" element={<Dashboard/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
