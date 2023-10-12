import { rest } from 'msw';

export const handlers = [
  rest.get('https://www.themealdb.com/api/json/v1/1/categories.php', (req, res, ctx) => {
    return res(ctx.json({ categories: ['Pasta', 'Seafood', 'Dessert'] }));
  }),
  // Add more handlers as needed
];