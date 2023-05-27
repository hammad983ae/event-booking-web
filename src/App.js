import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import WelcomePage from './Views/Welcome/Welcome';
import Dashboard from './Views/Dashboard/Dashboard';

function App() {
  return (
    <div className="bg-blue-500">
      <Routes>
        <Route path='/' element={<WelcomePage />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </div>

  );
}

export default App;
