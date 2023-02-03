import { useSelector } from 'react-redux';
import './App.css';
import Landing from './components/Landing';
import Login from './components/Login';
import { BrowserRouter, Routes , Route, Link } from "react-router-dom";

function App() {
  // const isLoggedIn = useSelector(state => state.login.isLoggedIn)
  const isLoggedIn = false
  console.log(isLoggedIn)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element = { !isLoggedIn && <Login />} />
        <Route path="/landing" element={ <Landing />} />
        {/* <Route path="/landing" element={ isLoggedIn && <Landing />} /> */}
      </Routes>

    </BrowserRouter>
  );
}

export default App;
