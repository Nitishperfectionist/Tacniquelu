
import './App.css';
import Homepage from './pages/Homepage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className="App">
     <ToastContainer />
      <Homepage/>
    </div>
  );
}

export default App;
