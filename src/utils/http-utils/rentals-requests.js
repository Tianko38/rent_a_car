import axios from 'axios';
import { getLoggedUser } from './user-requests';

// .then() => resolved correctly
// .catch() => has error
// .finally => executes always

const apiUrl = 'http://localhost:3005/rentals';

export function getAllRentals(){
    return axios.get(apiUrl);
}

export function getAllRentalsForUser(userId){
    return axios.get(`${apiUrl}?userId=${userId}`);
}

export function getAllRentalsForVehicle(vehicleId){
    return axios.get(`${apiUrl}?vehicleId=${vehicleId}`);
}

export function getRentalById(id){
    return axios.get(`${apiUrl}/${id}`);
}

export function deleteRental(id){
    return axios.delete(`${apiUrl}/${id}`);
}

export function saveRental(rental){
    if(rental.id){
        return axios.put(`${apiUrl}/${rental.id}`, rental);
    }

    const loggedUser = getLoggedUser();
    rental.userId = loggedUser.id;
    rental.userName= loggedUser.name;
    
    return axios.post(`${apiUrl}`, rental);
}