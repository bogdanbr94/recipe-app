import React from 'react';
import { useState, useEffect } from "react";
import SearchForm from './SearchForm';
import MealList from './MealList';
import MealByIngredients from './MealByIngredients';
import CategorySelection from './CategorySelection';
import MealDetails from './MealDetails';


import './App.css';

const App = () => {
  const [meals, setMeals] = useState([]);
  const [searchQueryByName, setSearchQueryByName] = useState('');
  const [searchQueryByIngredient, setSearchQueryByIngredient] = useState ('');
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeAccordion, setActiveAccordion] = useState(null);

  const handleAccordionClick = (index) => {
    if (index === activeAccordion) {
      setActiveAccordion(null);
    } else {
      setActiveAccordion(index);
    }
  };

  useEffect(() => {
    if (searchQueryByName) {
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQueryByName}`)
        .then(
          response => response.json()
          )
        .then(
          data => setMeals(data.meals)
          )
        .catch(
          error => console.error('Error fetching meals:', error)
          );
    }
  }, [searchQueryByName]);

   useEffect(() => {
     if(searchQueryByIngredient){
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchQueryByIngredient}`)
        .then(
          response => response.json()
        )
        .then(
          data => setMeals(data.meals)
        )
        .catch(
          error => console.error('Error fetching meals:',error)
        )
     }
   },[searchQueryByIngredient]);

   useEffect(() => {
    if(selectedMeal){
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${selectedMeal}`)
      .then(
        response => response.json()
      )
      .then(
        data => setSelectedMeal(data.meals[0])
      )
      .catch(
        error => console.error('Error fetching the details for meals',error)
      )
    }
   },[selectedMeal])

   useEffect(() => {
    if(selectedCategory){
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`)
      .then(
        response => response.json()
      )
      .then(
        data => setMeals(data.meals)
      )
      .catch(
        error => console.error('Error fetching the details for meals',error)
      )
    }
   },[selectedCategory])

   const closeMealDetails = () => {
    setSelectedMeal(null);
   }

   const accordionItems = [
    { title: 'Type your favorite meal', content: <SearchForm onSearch={setSearchQueryByName} onClose={closeMealDetails}/> },
    { title: 'Search by Ingredient', content: <MealByIngredients onSearch={setSearchQueryByIngredient} onClose={closeMealDetails}/> },
    { title: 'Meals Categories', content: <CategorySelection onCategorySelect={setSelectedCategory} onClose={closeMealDetails}/> },
  ];
  return (
    
    <div className="container">
     <div className="data">
     
     {accordionItems.map((item, index) => (
      <div key={index} className={`accordion-item ${index === activeAccordion ? 'active' : ''}`}>
        <div className={`accordion-title ${index === activeAccordion ? 'active' : ''}`} onClick={() => handleAccordionClick(index)} >
          {item.title}
        </div>
      </div>
    ))}
  </div>

  <div className="accordion-content">
    {accordionItems[activeAccordion] && accordionItems[activeAccordion].content}
  </div>

  <MealList meals={meals} onMealClick={setSelectedMeal} />
  <MealDetails selectedMeal={selectedMeal} onClose={closeMealDetails}/>
 
</div>
  
  );
};

export default App;
