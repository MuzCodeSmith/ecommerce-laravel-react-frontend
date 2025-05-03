export const apiUrl = 'http://localhost:8000/api';

export const adminToken = () =>{
    let adminData = JSON.parse(localStorage.getItem('adminInfo'));
    return adminData.token;
}