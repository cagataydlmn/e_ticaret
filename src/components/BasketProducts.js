import { NavLink } from "react-router-dom";
import { useSite } from "../context/AppContext";

export default function BasketProducts() {
    const { setSelectProductItems, selectProductItems, setTotalPrice, totalPrice } = useSite()

    const DeletProduct = (selectProductItem) => {
        const deletedProduct = selectProductItems.filter((product) => product.id === selectProductItem.id);
        const updatedItems = selectProductItems.filter((product) => product.id !== selectProductItem.id);
        setSelectProductItems(updatedItems);
        setTotalPrice(prevPrice => prevPrice - (deletedProduct[0].price * deletedProduct[0].quantity));
    }

    const increaseQuantity = (selectedProduct) => {
        setSelectProductItems(prevProducts =>
            prevProducts.map(product =>
                product.id === selectedProduct.id ? { ...product, quantity: product.quantity + 1 }
                    : product
            )
        )
        setTotalPrice(prevPrice => prevPrice += Number(selectedProduct.price))
    }

    const decreaseQuantity = (selectedProduct) => {
        if (selectedProduct.quantity !== 1) {
            setSelectProductItems(prevProducts =>
                prevProducts.map(product =>
                    product.id === selectedProduct.id ? (
                        { ...product, quantity: product.quantity - 1 }
                    )
                        : product
                )
            )
        } else {
            setSelectProductItems(prevProducts => prevProducts.filter((selectProductItem) => selectProductItem.id !== selectedProduct.id));
        }
        setTotalPrice(prevPrice => prevPrice -= selectedProduct.price)
    }

    if (window.getCookie('is_logged_in') == 'false') {
        return <div>
            Sepeti ürün ekleyebilmek için önce giriş yap
            <NavLink to='/Giris'>
                Giriş yapmak için tıkla
            </NavLink>
        </div>
    }



    return (
        <div className="basket">
            <ul>
                {selectProductItems?.map((selectProductItem, selectProductItemsIndex) => (
                    <li key={selectProductItemsIndex}>
                        <div className="basket-items">
                            <div className="basket-items-general">
                                <div className="basket-items-image">
                                <img src={selectProductItem.images[0].replace('[', '').replace(']', '').replaceAll('"', '')} />
                                </div>
                                <div className="basket-items-info">
                                    <div className="basket-items-text">
                                        <div className="basket-items-title">
                                            {selectProductItem.title}
                                        </div>
                                        <div className="basket-items-description">
                                            {selectProductItem.description}
                                        </div>
                                    </div>
                                    <div className="basket-items-features">
                                        <div className="basket-items-quantities">
                                            <span>normal fiyat:{selectProductItem.price}</span>
                                            <span className="quantity">Adet: {selectProductItem.quantity}</span>
                                            <div className="product-items-plus">
                                                <button onClick={() => increaseQuantity(selectProductItem)}>Arttır</button>
                                                <button onClick={() => decreaseQuantity(selectProductItem)}>azalt</button>
                                            </div>
                                        </div>
                                        <div className="product-items-price">
                                            Ücret:{selectProductItem.price * selectProductItem.quantity}$
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product-items-delete">
                                <button onClick={() => DeletProduct(selectProductItem)}>Ürünü Sil</button>
                            </div>
                        </div>
                    </li>
                ))}
                <div className="total-price">
                {totalPrice==0 ? (
                        <div >önce sepete ürün ekle</div>
                    ) : <div>Toplam:{totalPrice}</div>}
                </div>
            </ul>
        </div>

    )
}