

function fetchData(repo) {
    return fetch(`http://localhost:3001/api/v1/${repo}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Not a 200 status');
          }
          return response.json();
        })
        .catch(error => {
          alert('Oops, something went wrong. Try refreshing your page.');
        });
  }
  function postData(repo, travelerData) {
    const requestData = {
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(travelerData)
      };
  
    return fetch(`http://localhost:3001/api/v1/${repo}`, requestData)
      .then(response => response.json())
       .then(data => console.log(data))
      }
      
    
  export { fetchData, postData }