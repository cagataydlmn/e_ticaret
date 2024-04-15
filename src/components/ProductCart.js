import { useSite } from "../context/AppContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBasketShopping, faHeart } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function ProductCart({ productItem, productItemIndex, findProduct, selectProductItem }) {
    // console.log(typeof totalPrice,"total price tipi")
    const { setSelectProductItems, selectProductItems, setTotalPrice, likeItems, setLikeItems } = useSite()
    const [sizeOpen, setSizeOpen] = useState(false)
    const showToastMessage = () => {
        toast.success("Ürün Sepete Eklendi!")
     
      };
    
    const handleSizeOpen = () => {
        setSizeOpen(!sizeOpen)
    }

    const addProduct = (product) => {
        const findProduct = selectProductItems.find(item => item.id === product.id);
        // debugger;
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
        setTotalPrice(prevPrice => prevPrice += Number(product.price))
    }
    // const addProductLike = (product) => {
    //     const findProduct = likeItems.find(item => item.id === product.id);
    //     // debugger;
    //     if (findProduct) {
    //         setLikeItems(prevProducts =>
    //             prevProducts.map(product2 =>
    //                 product2.id === findProduct.id ? { ...product2 }
    //                     : product2
    //             )
    //         )
    //     } 
    //     else {
    //         const productObj = { ...product }
    //         setLikeItems([...likeItems, productObj]);
    //     }      
    // }

    // const DeletProduct = (product) => {
    //     const updatedLikeItems = likeItems.filter(item => item.id !== product);
    //     setLikeItems(updatedLikeItems);
    // };
    const likeUnLike = (product) => {
        const isLiked = likeItems.some(item => item.id === product.id)
        if (isLiked) {
            const updatedLikeItems = likeItems.filter(item => item.id !== product.id)
            setLikeItems(updatedLikeItems)
        }
        else {
            setLikeItems([...likeItems, product])
        }
    }
    


    return (
        <li key={productItemIndex}>

            <div className="products">
                <div className="products-title">
                    {productItem.title}
                </div>
                <div className="products-images">
                    <div className="">
                        <Link to={`products/${productItem.id}`}><img src={productItem.images[0].replace('[', '').replace(']', '').replaceAll('"', '')} /></Link>
                        {sizeOpen &&
                            <div className='popup-active'>
                                <button onClick={() => {addProduct(productItem) ; showToastMessage()}} >sepete ekle</button>
                            </div>
                        }
                    </div>
                    <div className="products-buttons">
                        {/* position relative */}
                        <div className="products-add-basket-button">
                            <button className="basket-shopping" onClick={() => handleSizeOpen(true)} >
                                <FontAwesomeIcon icon={faBasketShopping} />
                            </button>
                        </div>
                        <div className="products-add-like-button">
                            <button className={findProduct === true ? "active" : ""} onClick={() => likeUnLike(productItem)}>
                                <FontAwesomeIcon icon={faHeart} />
                            </button>
                        </div>
                        {/* position relative  */}
                    </div>
                </div>
                <div className="products-description">
                    {productItem.description}
                </div>
                <div className="products-price">
                    {productItem.price}TL
                </div>
            </div>        

        </li>

    )
}