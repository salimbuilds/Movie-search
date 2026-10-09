    import './style.css';

    const loadBox = document.getElementById("loadBox");
    const details = document.getElementById("details");
    const API_KEY =import.meta.env.VITE_OMDB_KEY;

    const id = new URLSearchParams(window.location.search).get("id");



    async function getMovie() {

        if(!id){

            loadBox.innerHTML = `<div role="alert" class="alert alert-error">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span>No movie selected</span>
    </div>`;
            return;
        }

        try{

            const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${encodeURIComponent(id)}&plot=full`);

            if(!res.ok){
                throw new Error("server error: " +res.status );
                
                    }

                    const movies = await  res.json();


                    if(movies.Response==="False"){
                        loadBox.innerHTML = `<div role="alert" class="alert alert-error">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span>${movies.Error}</span>
    </div>`;
    return;
                    }

                    loadBox.textContent = "";
                    showMovies(movies);


        }

    catch(e){
        loadBox.textContent = "something went wrong: " +e.message;
    }
        
    }

    function   showMovies(movies){
        let poster;
        if(movies.Poster==="N/A"){
            poster = "https://placehold.co/300x445?text=No+Poster";
        }
        else{
            poster = movies.Poster;}
            details.innerHTML = ` <div class="flex flex-col md:flex-row gap-8">
        <img
            src="${poster}"
            alt="${movies.Title}"
            onerror="this.onerror=null; this.src='https://placehold.co/300x445?text=No+Poster';"
            class="rounded-xl w-full md:w-72 aspect-2/3 object-cover" />

        <div class="flex flex-col gap-3">
            <h1 class="text-3xl font-bold">${movies.Title} <span class="font-normal">(${movies.Year})</span></h1>

            <div class="flex flex-wrap gap-2">
            <span class="badge badge-primary">⭐ ${movies.imdbRating}</span>
            <span class="badge badge-outline">${movies.Rated}</span>
            <span class="badge badge-outline">${movies.Runtime}</span>
            <span class="badge badge-outline">${movies.Genre}</span>
            </div>

            <p>${movies.Plot}</p>

            <p><strong>Director:</strong> ${movies.Director}</p>
            <p><strong>Cast:</strong> ${movies.Actors}</p>
            <p><strong>Released:</strong> ${movies.Released}</p>
            <p><strong>Language:</strong> ${movies.Language}</p>
            <p><strong>Awards:</strong> ${movies.Awards}</p>
        </div>
        </div>`;
        
    }


    getMovie();