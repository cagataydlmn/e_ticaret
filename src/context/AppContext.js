import { createContext, useContext, useState,useEffect } from "react";

export const AppContext = createContext()

const Provider =({ children })=>{

const [productItems, setProductItems] = useState([]); 
const [selectProductItems, setSelectProductItems] = useState([]);
const [totalPrice, setTotalPrice] = useState(0)
const[likeItems,setLikeItems]=useState([])


const data = {
  productItems,
  setProductItems,
  selectProductItems,
  setSelectProductItems,
  totalPrice,
  setTotalPrice,
  likeItems,
  setLikeItems
}

useEffect(() => {
    localStorage.setItem('selectProductItems', JSON.stringify(selectProductItems));
    localStorage.setItem('totalPrice', totalPrice);
}, [selectProductItems])
useEffect(() => {
  fetch('https://api.escuelajs.co/api/v1/products')
      .then(response => response.json())
      .then(data => {
          data.forEach(element => {
              element.quantity = 1
              element.toplamFiyat = element.price * element.quantity
          });
          setProductItems(data);
      })

  const savedProduct = JSON.parse(localStorage.getItem('selectProductItems'));
  const totalPriceStorage = Number(localStorage.getItem('totalPrice'))
  if (savedProduct) {
      setSelectProductItems(savedProduct);
      setTotalPrice(prevPrice=>prevPrice+=totalPriceStorage)
  }
}, []);
    return(
        <AppContext.Provider value={data}>
            {children}
        </AppContext.Provider>
    )
}

export const useSite = () => useContext(AppContext)

export default Provider
