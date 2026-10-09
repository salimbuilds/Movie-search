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
      loadBox.innerHTML = `<div role="alert" class="alert alert-error">
  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  <span>${data.Error}</span>
</div>`;
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




