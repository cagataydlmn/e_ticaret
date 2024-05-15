import { useSite } from "../context/AppContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBasketShopping, faHeart } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function ProductCart({ productItem, productItemIndex, findProduct = undefined, selectProductItem }) {
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
        if (findProduct) {
            setSelectProductItems(prevProducts =>
                prevProducts.map(product2 =>
                    product2.id === findProduct.id ? { ...product2, quantity: product2.quantity + 1 }
                        : product2
                )
            )
        } else {
            let quantity = 1;
            const productObj = { ...product, quantity }
            setSelectProductItems([...selectProductItems, productObj]);
        }
        setTotalPrice(prevPrice => prevPrice += Number(product.price))
    }
 
    const likeUnLike = (product) => {
        const isLiked = likeItems.find(item => item.id === product.id)
        if (isLiked) {
            setLikeItems(prevItems => prevItems.filter(item => item.id !== product.id))
        }
        else {
            setLikeItems([...likeItems, product])
        }
    }

    return (
        <li className="products_li" key={productItemIndex}>
            <div className="products">
                <div className="products-title">
                    {productItem.title}
                </div>
                <div className="products-images">
                    <div className="products-image">
                        <Link to={`products/${productItem.id}`}><img src={productItem.images[0].replace('[', '').replace(']', '').replaceAll('"', '')} /></Link>
                        {sizeOpen &&
                            <div className='popup-active'>
                                <button onClick={() => { addProduct(productItem); showToastMessage() }} >sepete ekle</button>
                            </div>
                        }
                    </div>
                    <div className="products-buttons">

                        {window.getCookie('is_logged_in') == 'false' ? (
                            <div className="products-add-basket-button">
                                <Link  to="/giris" className="basket-shopping" >
                                    <FontAwesomeIcon icon={faBasketShopping} />
                                </Link>
                            </div>
                        ) : <button className="basket-shopping" onClick={() => handleSizeOpen(true)} >
                            <FontAwesomeIcon icon={faBasketShopping} />
                        </button>}

                        {window.getCookie('is_logged_in') == 'false' ? (
                            <div className="products-add-like-button">
                                <Link to="/giris">
                                    <FontAwesomeIcon icon={faHeart} />
                                </Link>
                            </div>) : <div className="products-add-like-button">
                            <button className={findProduct ? "active" : ""} onClick={() => likeUnLike(productItem)}>
                                <FontAwesomeIcon icon={faHeart} />
                            </button>
                        </div>}

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