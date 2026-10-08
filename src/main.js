import './style.css';


const searchMovie = document.getElementById("search");
const loadBox = document.getElementById("loadBox");
const cardContainer = document.getElementById("containerCard");

const API_KEY = import.meta.env.VITE_OMDB_KEY;





async function getMovie(){

  const query = searchMovie.value;
    if(searchMovie.value.trim() === "") return;

     
  loadBox.innerHTML = `<span class="loading loading-dots loading-xl"></span>`;
  cardContainer.textContent = "";


  try{
    
     
    const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}`);
    
    if(!res.ok){
      throw new Error( "server connection lost" );
    }

    const data = await res.json();


    if(data.Response==="False"){
      loadBox.textContent = data.Error;
      return;
    }
    loadBox.textContent = "";
    showMovies(data.Search);
    



  }
  catch(e){
  
    loadBox.textContent = "something went wrong: " + e.message;
  }

}


function showMovies(movies){

  cardContainer.innerHTML = "";

 movies.forEach((movie) =>{

  let poster;
  if(movie.Poster ==="N/A"){
    
    poster = "https://placehold.co/300x445?text=No+Poster";


  }
  else{
    poster = movie.Poster;
  }

  cardContainer.innerHTML += `
   <div class="card bg-base-100  shadow-sm">
  <figure class="px-10 pt-10">
    <img
      src="${poster}"
      alt="${movie.Title}"
      onerror="this.onerror=null; this.src='https://placehold.co/300x445?text=No+Poster';"
      class="rounded-xl" />
  </figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title">${movie.Title}</h2>
    <p>${movie.Year}</p>
    <div class="card-actions">
    </div>
  </div>
   

    </div>
  
  
  
  `;

 });

}

searchMovie.addEventListener("keydown",(event)=>{
  if(event.key === "Enter"){
    getMovie();
  }
})




