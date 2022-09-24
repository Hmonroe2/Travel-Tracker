function fetchData(repo) {
    return fetch(`http://localhost:3001/api/v1/${repo}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Not a 200 status');
          }
          // console.log(response.json())
          return response.json();
        })
        .catch(error => {
          // alert('Oops, something went wrong. Try refreshing your page.');
        });
  }
  function postData(repo, userData) {
    const requestData = {
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      };
  
    return fetch(`http://localhost:3001/api/v1/${repo}`, requestData)
      .then(response => {
        if (!response.ok) {
          throw new Error('Not a 200 status');
        }
        alert('Information submitted');
        return response.json();
      })
      .catch(error => {
        alert('Oops, something went wrong. Try again later');
      });
    }
  export { fetchData, postData }