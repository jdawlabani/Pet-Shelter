import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PetList from './Components/PetList';
import NewPet from './Components/NewPet';
import EditPet from './Components/EditPet'
import SinglePet from './Components/SinglePet';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PetList />} />
          <Route path="/pets/new" element={<NewPet />} />
          <Route path="/pets/:id/edit" element={<EditPet />} />
          <Route path="/pets/:id" element={<SinglePet />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
