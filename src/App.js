import { Route, Routes, Link, NavLink } from 'react-router-dom'
import { Categories } from './pages/Categories';
import Nav from './components/Nav';
import { Basket } from './pages/Basket';
import { Home } from './pages/Home';
import { Contact } from './pages/Contact';
import './style/style.scss';
import { useState, useEffect } from 'react';


function App() {
  const [productItems, setProductItems] = useState([]); 
  const [selectProductItems, setSelectProductItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0)

 

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
    const totalPriceStorage = localStorage.getItem('totalPrice')
    console.log(totalPrice,"total price")
    console.log(savedProduct)
    if (savedProduct) {
      setSelectProductItems(savedProduct);
      setTotalPrice(totalPriceStorage)
    }
  }, []);
  const addProduct = (product) => {
    const findProduct = selectProductItems.find(item => item.id === product.id);
    if (findProduct) {
        setSelectProductItems(prevProducts =>
            prevProducts.map(product2 =>
                product2.id === findProduct.id ? { ...product2, quantity: product2.quantity + 1 }
                    : product2
            )
        )
        // findProduct.quantity += 1;
        // findProduct.toplamFiyat = findProduct.price * findProduct.quantity;
    } else {
        let quantity = 1;
        const productObj = { ...product, quantity }
        setSelectProductItems([...selectProductItems, productObj]);
    }
    setTotalPrice(prevPrice => prevPrice += product.price )

}
  useEffect(() => {
    localStorage.setItem('selectProductItems', JSON.stringify(selectProductItems));
    localStorage.setItem('totalPrice', totalPrice);

  }, [selectProductItems])

  return (
    <>
      <Routes>
        <Route path='/' element={<Nav />}>
          <Route path='/' element={<Home productItems={productItems} setProductItems={setProductItems} setSelectProductItems={setSelectProductItems} selectProductItems={selectProductItems} totalPrice={totalPrice} setTotalPrice={setTotalPrice} addProduct={addProduct}/>}/>
          <Route path='/categories' element={<Categories />} />
          <Route path='/basket' element={<Basket selectProductItems={selectProductItems} setSelectProductItems={setSelectProductItems} totalPrice={totalPrice} setTotalPrice={setTotalPrice}/>}/>
          <Route path='contact' element={<Contact/>}/>
        </Route>
      </Routes>
    </>
  );
}
export default App;