 
import './App.css';
import Dashboard from './components/Dashboard';
import Header from "./components/Header"
import Login from './components/Login';
import Register from './components/Register';
import Error from './components/Error';
import {Route,Routes} from 'react-router-dom'
function App() {
  return (
    <div className="App">
       <Header/>
       <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/> 
          <Route path='*' element={<Error/>}/>
       </Routes>
      
      
    </div>
  );
}

export default App;
