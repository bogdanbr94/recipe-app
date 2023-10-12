import React from 'react';
import { useState } from "react";

const MealByIngredients = ({ onSearch, onClose }) => {
    const [ingredients, setIngredients] = useState ('');

const handleSearch = (e) =>{
    e.preventDefault();
    onSearch(ingredients);
    onClose();
    setIngredients('');
};

return (
 <div className="searchIngredient"> 
    <form onSubmit = {handleSearch}>
        <input type = "text" placeholder="Type ingredient" value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
        <button type ="submit">Search</button>
    </form>
 </div>
);
};

export default MealByIngredients;

