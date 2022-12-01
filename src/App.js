import {Layout} from './components/layout/Layout'
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Register } from './components/auth/register/Register';
import { UsersList } from './components/User/users-list/UsersList';
import { User } from './components/User/user/User';
import { UserForm } from './components/User/user-form/UserForm';
import { Login } from './components/auth/login/Login';
import { AuthenticatedRoute } from './utils/guards/AuthenticatedRoute';
import { NonAuthenticatedGuard } from './utils/guards/NonAuthenticatedGuard';
import { VehiclesList } from './components/vehicles/vehiclesList/VehiclesList';
import { Vehicle } from './components/vehicles/vehicle/Vehicle';
import { Vehicleform } from './components/vehicles/vehicle-form/VehicleForm';
import { RentalsList } from './components/rentals/rentals-list/RentalsList';
import { RentalForm } from './components/rentals/rental-form/RentalForm';
import { EditForm } from './components/rentals/rental-form/EditForm';
import { Rental } from './components/rentals/rental/Rental';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/register" element={<NonAuthenticatedGuard><Register/></NonAuthenticatedGuard> }/>
        <Route exact path="/login" element={<NonAuthenticatedGuard><Login/></NonAuthenticatedGuard>}/>
        <Route exact  path="/" element={<AuthenticatedRoute><Layout/></AuthenticatedRoute>}>
          <Route path="/users-list" element={<UsersList/>}/>
          <Route path="/user/:id" element={<User/>}/>
          <Route path="/user/create" element={<UserForm/>}/>
          <Route path="/user/edit/:id" element={<UserForm/>}/>

          <Route path="/vehicles-list" element={<VehiclesList/>}/>
          <Route path="/vehicle/:id" element={<Vehicle/>}/>
          <Route path="/vehicle/create" element={<Vehicleform/>}/>
          <Route path="/vehicle/edit/:id" element={<Vehicleform/>}/>

          <Route path="/rentals-list" element={<RentalsList/>}/>
          <Route path="/rental/:id" element={<Rental/>}/>
          <Route path="/rental/create/:vehicleId" element={<RentalForm/>}/>
          <Route path="/rental/edit/:id" element={<EditForm/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
