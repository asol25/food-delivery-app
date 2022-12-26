import axios from 'axios';

export const getCategories = async () => {
  const categories = await axios.get(
    `${process.env.REACT_APP_SERVER_URL || 'http://localhost:33714'}/categories/get/all`
  );

  return categories;
};
