const API_URL = 'https://trail-api.herokuapp.com/API';




let GetJobApplication = (id) => {
    return fetch(`${API_URL}/jobapplication/${id}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json'
        }
  }).then(res => res.json());
}

GetJobApplication = (id) => {
    return Promise.resolve({})
}

export { GetJobApplication }