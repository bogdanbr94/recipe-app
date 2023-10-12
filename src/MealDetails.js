import React from 'react';

const MealDetails = ({ selectedMeal, onClose }) => {
  if (!selectedMeal) {
    return null;
  }
  const youtubeUrl = selectedMeal.strYoutube;
  const videoId = youtubeUrl ? youtubeUrl.split('=')[1] : null;
  const embedUrl = videoId ?`https://www.youtube.com/embed/${videoId}`: null;
  const ingredients = [];
  let i = 1;
 
while (selectedMeal[`strIngredient${i}`]) {
    const ingredient = selectedMeal[`strIngredient${i}`];
    const measure = selectedMeal[`strMeasure${i}`];
    const image = `https://www.themealdb.com/images/ingredients/${ingredient}-Small.png`
    ingredients.push(
        <li key={i}><img src={image} alt={ingredient}/> {measure} {ingredient} </li>
    );
    i++;
}
let instructions = [];

if (selectedMeal.strInstructions) {
  instructions = selectedMeal.strInstructions.split('.').filter(Boolean).map((instruction, index) => (
    <div key={index}>
      <span><br></br>{index +1}. </span>
      {instruction}
    </div>
  ));
}

  return (
    <div className="mealsDetails">
      <h2>{selectedMeal.strMeal}</h2>
      <img src={selectedMeal.strMealThumb +"/preview"} alt={selectedMeal.strMeal} />
      <h3>Ingredients</h3>
      <ul className="ingredients">{ingredients}</ul>
     
      <p className="instructions">
      {instructions}
    </p><br></br>
      <iframe className="youTubeVideo" src={embedUrl} title={selectedMeal.strMeal} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
      
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default MealDetails;