import { API_URL } from './config';

const baseURL = API_URL;

function getData() {
  return Promise.all([
    fetch(`${baseURL}/api/projects`),
    fetch(`${baseURL}/api/issues`),
  ])
  .then(response => Promise.all(response.map(res => {
    if (!res.ok) throw new Error('Could not fetch data.');
    return res.json();
  })));
};

function addProject(newProject) {
  const token = window.sessionStorage.getItem('authToken');
  if (!token) Promise.reject(new Error('missing authorization'));
  return fetch(`${baseURL}/api/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(newProject)
  })
  .then(res => res.json());
};

function editProject(id, values) {
  const token = window.sessionStorage.getItem('authToken');
  if (!token) Promise.reject(new Error('missing authorization'));
  return fetch(`${baseURL}/api/projects/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(values)
  })
  .then(res => res.json());
};

function deleteProject(id) {
  const token = window.sessionStorage.getItem('authToken');
  return fetch(`${baseURL}/api/projects/${id}`, {
    method: 'DELETE',
    headers: {'Authorization': `Bearer ${token}`}
  });
};

function addIssue(newIssue) {
  const token = window.sessionStorage.getItem('authToken');
  if (!token) Promise.reject(new Error('missing authorization'));
  return fetch(`${baseURL}/api/issues`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(newIssue)
  })
  .then(res => res.json());
};

function editIssue(id, values) {
  const token = window.sessionStorage.getItem('authToken');
  if (!token) Promise.reject(new Error('missing authorization'));
  return fetch(`${baseURL}/api/issues/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(values)
  })
  .then(res => res.json());
};

function deleteIssue(id) {
  const token = window.sessionStorage.getItem('authToken');
  return fetch(`${baseURL}/api/issues/${id}`, {
    method: 'DELETE',
    headers: {'Authorization': `Bearer ${token}`}
  });
};

function findUsername(username) {
  const token = window.sessionStorage.getItem('authToken');
  if (!token) Promise.reject(new Error('missing authorization'));
  return fetch(`${baseURL}/api/${username}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  .then(res => res.json());
};

function getUsernames() {
  const token = window.sessionStorage.getItem('authToken');
  if (!token) Promise.reject(new Error('missing authorization'));
  return fetch(`${baseURL}/api/usernames`, {
    headers: {'Authorization': `Bearer ${token}`}
  })
  .then(res => res.json());
};

function getUsers() {
  const token = window.sessionStorage.getItem('authToken');
  // if (!token) Promise.reject(new Error('missing authorization'));
  return fetch(`${baseURL}/api/users`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  .then(res => res.json());
}

function addUser(newUser) {
  return fetch(`${baseURL}/api/users`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(newUser)
  })
  .then(res => res.json());
};

function editUser(id, values) {
  const token = window.sessionStorage.getItem('authToken');
  if (!token) Promise.reject(new Error('missing authorization'));
  return fetch(`${baseURL}/api/users/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(values)
  })
  .then(res => res.json());
};

function deleteUser(id) {
  const token = window.sessionStorage.getItem('authToken');
  return fetch(`${baseURL}/api/users/${id}`, {
    method: 'DELETE',
    headers: {'Authorization': `Bearer ${token}`}
  });
};

function getUserById(id) {
  const token = window.sessionStorage.getItem('authToken');
  return fetch(`${baseURL}/api/users/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
    .then(res => res.json())
};

function login(attempt) {
  return fetch(`${baseURL}/login`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(attempt)
  })
  .then(res => res.json());
};

function refreshToken() {
  const token = window.sessionStorage.getItem('authToken');
  return fetch(`${baseURL}/refresh`, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
  }).then(res => res.json());
};

const api = {
  getData,
  addProject,
  editProject,
  deleteProject,
  addIssue,
  editIssue,
  deleteIssue,
  findUsername,
  getUsernames,
  getUsers,
  addUser,
  editUser,
  deleteUser,
  getUserById,
  login,
  refreshToken
};

export default api;