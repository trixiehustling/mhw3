document.addEventListener("DOMContentLoaded", function() {
    var p1Button = document.getElementById("p1");
    var bloccoCheAppare = document.querySelector(".bloccocheappare");
    var i = 0;
    
    p1Button.addEventListener("click", function() {
        if(i%2==0)
            bloccoCheAppare.classList.add("visibile");
        else
            bloccoCheAppare.classList.remove("visibile");
        
        bloccoCheAppare.classList.add("invisibile");
        i++; 
    });
});

function changeImage() {
    const imageElement = document.getElementById('PRINCIPALE');
    imageElement.src = 'img/origine-razzista-proibizione.jpeg';
}

function resetImage() {
    const imageElement = document.getElementById('PRINCIPALE');
    imageElement.src = 'img/TBD_April2024.jpg';
}

document.addEventListener('DOMContentLoaded', function () {
    const submitButton = document.querySelector('.search button[type="submit"]');
    const searchInput = document.querySelector('.search input[type="text"]');
    const searchContainer = document.querySelector('.search');
    let errorBox = document.querySelector('.error-box');

    function showError(message) {
        if (!errorBox) {
            errorBox = document.createElement('div');
            errorBox.classList.add('error-box');
            searchContainer.appendChild(errorBox);
        }
        errorBox.textContent = message;
    }

    function hideError() {
        if (errorBox) {
            errorBox.remove();
            errorBox = null;
        }
    }

    submitButton.addEventListener('click', function (event) {
        if (searchInput.value.trim() === '') {
            showError('Il campo di ricerca non può essere vuoto!');
            event.preventDefault();
        }
    });

    searchContainer.addEventListener('submit', function (event) {
        if (searchInput.value.trim() === '') {
            showError('Il campo di ricerca non può essere vuoto!');
            event.preventDefault();
        }
    });

    searchInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter' && searchInput.value.trim() === '') {
            showError('Il campo di ricerca non può essere vuoto!');
            event.preventDefault();
        }
    });

    document.addEventListener('click', function (event) {
        if (errorBox && !searchContainer.contains(event.target)) {
            hideError();
        }
    });
});

function handleDataAttributes() {
    const elementsWithData = document.querySelectorAll('[data-info], [data-action], [data-category], [data-link]');

    elementsWithData.forEach(element => {
        element.addEventListener('mouseover', () => {
            const info = element.dataset.info;
            const action = element.dataset.action;
            const category = element.dataset.category;
            const link = element.dataset.link;

            console.log('Informazioni aggiuntive:');
            console.log('data-info:', info);
            console.log('data-action:', action);
            console.log('data-category:', category);
            console.log('data-link:', link);
        });

        element.addEventListener('mouseout', () => {
            console.log('Stato precedente:');
            console.clear();
        });
    });
}

handleDataAttributes();



function onJson(json) {
  const library = document.querySelector('#album-view');
  library.innerHTML = '';
  const results = json.albums.items;
  let num_results = results.length;
  if(num_results > 10)
    num_results = 10;
  for(let i=0; i<num_results; i++)
  {
    const album_data = results[i]
    const title = album_data.name;
    const selected_image = album_data.images[0].url;
    const album = document.createElement('div');
    album.classList.add('album');
    const img = document.createElement('img');
    img.src = selected_image;
    const caption = document.createElement('span');
    caption.textContent = title;
    album.appendChild(img);
    album.appendChild(caption);
    library.appendChild(album);
  }
}

function onResponse(response) {
  return response.json();
}

function search(event)
{
  event.preventDefault();
  const album_input = document.querySelector('#album');
  const album_value = encodeURIComponent(album_input.value);
  fetch("https://api.spotify.com/v1/search?type=album&q=" + album_value,
    {
      headers:
      {
        'Authorization': 'Bearer ' + token
      }
    }
  ).then(onResponse).then(onJson);
}

function onTokenJson(json)
{
  token = json.access_token;
}

function onTokenResponse(response)
{
  return response.json();
}

const client_id = "39fe92aa3e7f4e10b6f24e8137ceae22";
const client_secret = "43d1d8aa53bc4aad9902bbc651f3aa35";
let token;
fetch("https://accounts.spotify.com/api/token",
    {
   method: "post",
   body: 'grant_type=client_credentials',
   headers:
   {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
   }
  }
).then(onTokenResponse).then(onTokenJson);
const form = document.querySelector('form');
form.addEventListener('submit', search)

function showModal(content) {
  var modal = document.getElementById("myModal");
  var modalContent = document.getElementById("modalContent");
  modalContent.innerHTML = content;
  modal.style.display = "block";
}

function closeModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
}

document.getElementById("albumForm").addEventListener("submit", function(event) {
  event.preventDefault();
  var albumName = document.getElementById("album").value;
  var content = "Hai cercato l'album: " + albumName;
  showModal(content);
});








async function translateText(text) {
  const url = 'https://google-translate1.p.rapidapi.com/language/translate/v2/detect';
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Accept-Encoding': 'application/gzip',
      'X-RapidAPI-Key': '9f229a88f7msh4338ae57363a234p1ef19ajsn0f1979251180',
      'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
    },
    body: new URLSearchParams({
      q: text
    })
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    displayTranslationResult(result.data); 
  } catch (error) {
    console.error(error);
  }
}

function displayTranslationResult(data) {
  const translationResultDiv = document.getElementById('translationResult');
  translationResultDiv.innerHTML = "<p>La lingua rilevata è: "+data.detections[0].language+" </p>";
}

document.getElementById('translationForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const textToTranslate = document.getElementById('textToTranslate').value;
  translateText(textToTranslate);
  return false; 
});



