import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import { Outlet } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';


const App: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      {/* <NavigationBar /> */}
      <div className='min-h-screen'>
        <Outlet />
      </div>
    </div>
  );
}

export default App;


