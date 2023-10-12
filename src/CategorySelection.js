import React, { useState, useEffect } from 'react';

const CategorySelection = ({ onCategorySelect, onClose }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then(response => response.json())
      .then(data => setCategories(data.categories))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const handleCategorySelect = (selectedCategory) => {
    onCategorySelect(selectedCategory);
    onClose();
  };

  return (
    <div className="categorySelection">
      <select onChange={(e) => handleCategorySelect(e.target.value)}>
        <option value="">Select a category</option>
        {categories.map(category => (
          <option key={category.strCategory} value={category.strCategory}> {category.strCategory}</option>
        ))}
      </select>
    </div>
  );
};

export default  CategorySelection;