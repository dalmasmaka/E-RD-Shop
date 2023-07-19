import './App.css';
import Home from './Pages/Home/Home';
import Header from './Pages/Header/Header'
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Routes,
} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
