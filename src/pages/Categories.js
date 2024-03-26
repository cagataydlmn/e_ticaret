import { useEffect, useState } from "react";

export  function Categories() {
  const [categoriesItems, setCategoriesItems] = useState([]);
  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/categories')
      .then(response =>   response.json())
      .then(data => {
        setCategoriesItems(data); 
      })
  }, []);

  return (
    <>
      <ul>
      {categoriesItems.map((categoriesItem,categoriesItemIndex)=>(
        <li key={categoriesItemIndex}>
          {categoriesItem.name}
        </li>
      ))}
      </ul>
    </>
  );
}
