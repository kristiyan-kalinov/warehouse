import axios from 'axios';

const apiUrl = 'http://localhost:3005/users';
const loggedUserKey = 'loggedUser';

export function getLoggedUser() {
    return JSON.parse(localStorage.getItem(loggedUserKey));
}

export async function logout() {
    localStorage.removeItem(loggedUserKey);
}

// .then => resolved correctly
// .catch => has error
// .finally => executed always
export function getAllUsers() {
    return axios.get(apiUrl);
}

export function getUserById(id) {
    return axios.get(`${apiUrl}/${id}`);
}

export function deleteUser(id) {
    return axios.delete(`${apiUrl}/${id}`);
}

export function saveUser(user) {

    if (user.id) {
        return axios.put(`${apiUrl}/${user.id}`, user);
    }

    return axios.post(`${apiUrl}`, user);
}

export async function registerUser(user) {
    const existingUsers = (await axios.get(`${apiUrl}?email=${user.email}`)).data;
    const existingUsers2 = (await axios.get(`${apiUrl}?username=${user.username}`)).data;
    const usernameRegex = new RegExp('^[a-zA-Z_]{5,15}$');
    const passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[@|-|_|~|\|])[a-zA-Z0-9@|_|~|\-|\|]{6,20}$');
    const emailRegex = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');
    const phoneRegex = new RegExp('^(|[\d][\d\s-]*)$');

    if (existingUsers.length > 0) {
        throw new Error('User with this email already exists');
    }

    if (existingUsers2.length > 0) {
        throw new Error('User with this username already exists');
    }

    if(!usernameRegex.test(user.username)) {
        throw new Error('Username can contain lowercase letters, uppercase letters and "_" with length between 5 and 15 characters');
    }

    if(!passwordRegex.test(user.password)) {
        throw new Error('Password should contain at least 1 lowercase letter, 1 uppercase letter and 1 of these characters - [@, -, _, ~, |] with length between 6 and 20 characters');
    }

    if(!emailRegex.test(user.email)) {
        throw new Error('Invalid email address');
    }

    if(!phoneRegex.test(user.phone)) {
            throw new Error('Phone number can contain numbers, spaces and "-"');
    }

    return saveUser(user);
}

export async function login(user) {
    const allUsers = (await getAllUsers()).data;

    const foundUser = allUsers.find(u => u.username === user.username && u.password === user.password);

    if (!foundUser)
        throw new Error('Invalid username/password');

    localStorage.setItem(loggedUserKey, JSON.stringify(foundUser));

    return foundUser;
}