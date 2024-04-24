// index.js

const handleClick = (ramen) => {
  const ramenDetail = document.getElementById('ramen-detail');
  ramenDetail.innerHTML = `
    <img src = '${ramen.image}'/>
    <h2>${ramen.name}</h2>
    <h3> ${ramen.restaurant}</h3>
  `;
  const rating = document.getElementById('rating-display');
 const comment = document.getElementById('comment-display');
 rating.textContent = ramen.rating;
 comment.textContent = ramen.comment;
};


const addSubmitListener = () => {
  const newRamenForm = document.getElementById('new-ramen');
  newRamenForm.addEventListener('submit', event => {
    event.preventDefault();

    const name = document.getElementById('new-name').value;
    const image = document.getElementById('new-image').value;
    const rating = document.getElementById('new-rating').value;
    const comment = document.getElementById('new-comment').value;

    const ramen = { name, image, rating, comment };

    displayNewRamen(ramen);
  });
};

const displayRamens = () => {
  const ramenMenu = document.getElementById('ramen-menu');

  fetch('http://localhost:3000/ramens')
    .then(response => response.json())
    .then(ramens => {
      ramens.forEach(ramen => {
        const ramenImg = document.createElement('img');
        ramenImg.src = ramen.image;
        ramenImg.alt = ramen.name;
        ramenImg.addEventListener('click', () => handleClick(ramen));
        ramenMenu.appendChild(ramenImg);
      });
    })
    .catch(error => console.error('Error fetching ramens:', error));
};

const main = () => {
  displayRamens();
  addSubmitListener();
};

// Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  main();
});

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};