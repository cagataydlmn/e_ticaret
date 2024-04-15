import { useEffect, useState } from "react";

export function Categories() {
  const [categoriesItems, setCategoriesItems] = useState([]);
  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/categories')
      .then(response => response.json())
      .then(data => {
        setCategoriesItems(data);
      })
  }, [])

  return (
    <>
      <ul className="categories">
        {categoriesItems.map((categoriesItem, categoriesItemIndex) => (
          <li key={categoriesItemIndex}>
            <div className="categories-general">
             
              <div className="categories-image"><img className="categories-img" src={categoriesItem.image} /></div>
              <div className="categories-title">
                {categoriesItem.name}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
