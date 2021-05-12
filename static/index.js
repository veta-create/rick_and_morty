document.addEventListener('DOMContentLoaded', () => {
  let url = 'https://rickandmortyapi.com/api/character'
  let prev = null;
  const cards = document.querySelectorAll('.card')
  const main = document.querySelector('.main')
  const next = document.querySelector('.next')
  const back = document.querySelector('.back')

  function sendRequest(method, url) {
    return fetch(url).then(response => {
      return response.json()
    })
  }

  setInterval(function() {
    if(prev === null) {
      back.classList.add('hide')
    } else {
      back.classList.remove('hide')
    }

    if(url === null) {
      next.classList.add('hide')
    } else {
      next.classList.remove('hide')
    }
  }, 100)

  function renderCard (address) {
    sendRequest('GET', address)
    .then( data => {
      console.log(data)
      let results = data.results
      let info = data.info
      for(let i = 0; i < results.length; i++) {
        cards[i].querySelector('#name').textContent = `Name: ${results[i].name}`
        cards[i].querySelector('#status').textContent = `Status: ${results[i].status}`
        cards[i].querySelector('#kind').textContent = `Species: ${results[i].species}`
        cards[i].querySelector('#gender').textContent = `Gender: ${results[i].gender}`
        cards[i].querySelector('img').src = results[i].image
    }
    url = info.next
    prev = info.prev
    })
    .catch(err => console.log(err))
    console.log(prev)
  }

  renderCard(url)

  document.addEventListener('click', function(e) {
    if(e.target.className == 'next') {

      renderCard(url)
    } else if(e.target.className == 'back') {
      renderCard(prev)
    }
     
  })



  console.log(prev)
})
