import { createContext, useContext, useState, useEffect } from "react";

export const AppContext = createContext()
const Provider = ({ children }) => {

    const [productItems, setProductItems] = useState([]);
    const [selectProductItems, setSelectProductItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0)
    const [likeItems, setLikeItems] = useState([])

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
        if (selectProductItems?.length > 0) {
            localStorage.setItem('selectProductItems', JSON.stringify(selectProductItems));
            localStorage.setItem('totalPrice', totalPrice);
        }
    }, [selectProductItems])

    useEffect(() => {
        if (likeItems.length > 0) {
            localStorage.setItem('likeItems', JSON.stringify(likeItems))
        }
    }, [likeItems])

    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then(response => response.json())
            .then(data => {
                data.products.forEach(element => {
                    element.quantity = 1
                    element.toplamFiyat = element.price * element.quantity
                });
                setProductItems(data.products);
            })
        const savedProduct = JSON.parse(localStorage.getItem('selectProductItems'));
        const totalPriceStorage = Number(localStorage.getItem('totalPrice'));
        const liked = JSON.parse(localStorage.getItem('likeItems'));

        if (liked?.length > 0) {
            setLikeItems(liked)
        }
        if (savedProduct) {
            setSelectProductItems(savedProduct);
            setTotalPrice(prevPrice => prevPrice += totalPriceStorage)
        }

    }, []);
    return (
        <AppContext.Provider value={data}>
            {children}
        </AppContext.Provider>
    )
}

export const useSite = () => useContext(AppContext)
export default Provider
