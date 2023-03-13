const addMovieModal = document.getElementById("add-modal");
// const addMovieModal = document.querySelector('#add-modal');
// const addMovieModal = document.body.children[1];
const startAddMovieBtn = document.getElementById("start-btn");
// const startAddMovieBtn = document.querySelector('header button');
// const startAddMovieBtn = document.querySelector('header').lastElementChild;
const backdrop = document.getElementById("backdrop");
const cancelAddMovieBtn = document.getElementById("cancel-btn");
const addMovieBtn = document.getElementById("add-btn");
const userInputs = addMovieModal.querySelectorAll("input");
const entryTextSection = document.getElementById("entry-text");
const deleteMovieModal = document.getElementById("delete-modal");

const movies = [];

const updateUI = () => {
    if (movies.length === 0) {
        entryTextSection.style.display = "block";
    } else {
        entryTextSection.style.display = "none";
    }
};

const deleteMovie = (movieId) => {
    let movieIndex = 0;
    for (const movie of movies) {
        if (movie.id === movieId) {
            break;
        }
        movieIndex++;
    }

    movies.splice(movieIndex, 1);
    const listRoot = document.getElementById("movie-list");
    listRoot.children[movieIndex].remove();
    closeMovieDeletionModal();
    updateUI();
};

const deleteMovieHandler = (movieId) => {
    deleteMovieModal.classList.add("visible");
    toggleBackdrop();
    const cancelDeletionBtn = deleteMovieModal.querySelector(".btn--passive");
    let confirmDeletionBtn = deleteMovieModal.querySelector(".btn--danger");

    confirmDeletionBtn.replaceWith(confirmDeletionBtn.cloneNode(true));

    confirmDeletionBtn = deleteMovieModal.querySelector(".btn--danger");

    cancelAddMovieBtn.removeEventListener('click' , closeMovieDeletionModal);

    
    cancelDeletionBtn.addEventListener("click", closeMovieDeletionModal);
    confirmDeletionBtn.addEventListener(
        "click",
        deleteMovie.bind(null, movieId)
    );
};

const closeMovieDeletionModal = () => {
    toggleBackdrop();
    deleteMovieModal.classList.remove("visible");
};

const renderNewMovie = (id, title, imageUrlValue, rating) => {
    const newMovieElement = document.createElement("li");
    newMovieElement.className = "movie-element";
    newMovieElement.innerHTML = `
    <div class="movie-element__image">
        <img src="${imageUrlValue}" alt=${title}">
    </div>
    <div class="movie-element__info">
        <h2>${title}</h2>
        <p>${rating}/5 stars</p>
    </div>
    `;
    newMovieElement.addEventListener(
        "click",
        deleteMovieHandler.bind(null, id)
    );
    const listRoot = document.getElementById("movie-list");
    listRoot.append(newMovieElement);
};

const toggleBackdrop = () => {
    backdrop.classList.toggle("visible");
};

const closeMovieModal = () => {
    addMovieModal.classList.remove("visible");
};

const showMovieModal = () => {
    addMovieModal.classList.add("visible");
    toggleBackdrop();
};

const clearInput = () => {
    for (const usrInput of userInputs) {
        usrInput.value = "";
    }
};

const backdropClickHandler = () => {
    closeMovieModal();
    clearInput();
    closeMovieDeletionModal();
};

const addMovieHandler = () => {
    const titleValue = userInputs[0].value;
    const imageUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;

    if (
        titleValue.trim() === "" ||
        imageUrlValue.trim() === "" ||
        ratingValue.trim() === "" ||
        +ratingValue < 1 ||
        +ratingValue > 5
    ) {
        alert("Please enter valid values (rating between 1 and 5)");
        return;
    }

    const newMovie = {
        id: Math.random().toString(),
        title: titleValue,
        image: imageUrlValue,
        rating: ratingValue,
    };
    movies.push(newMovie);
    console.log(movies);
    closeMovieModal();
    toggleBackdrop();
    clearInput();
    renderNewMovie(
        newMovie.id,
        newMovie.title,
        newMovie.image,
        newMovie.rating
    );
    updateUI();
};

startAddMovieBtn.addEventListener("click", showMovieModal);
cancelAddMovieBtn.addEventListener("click", backdropClickHandler);
backdrop.addEventListener("click", backdropClickHandler);
addMovieBtn.addEventListener("click", addMovieHandler);
