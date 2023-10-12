import React from 'react';

const MealList = ({ meals, onMealClick }) => {
    if (!meals) {
        return <div className="noMeals">No meals found</div>;
    }
  return (
    <div className="fullMeals">
     
      <ul className="meals">
        {meals.map((meal) => (
          <li className="mealsList" key={meal.idMeal} onClick={() => onMealClick(meal.idMeal)}>
           {meal.strMeal}
         </li>
        ))}
      </ul>
    </div>
  );
};

export default MealList;