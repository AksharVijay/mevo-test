import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter } from 'react-router-dom';
import HomeZone from './Components/HomeZone/HomeZone';

function App() {
  return (
    <BrowserRouter>
        <div className="App">
          <Navbar/>
          <HomeZone/>
        </div>
    </BrowserRouter>

  );
}

export default App;
