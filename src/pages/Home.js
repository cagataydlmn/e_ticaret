import { useEffect, useState } from "react"

export function Home({ productItems, setProductItems, setSelectProductItems, selectProductItems, totalPrice, setTotalPrice, addProduct }) {
  
    
    const [popupVisible, setPopupVisible] = useState(false);
    const gizle = () => {
        setPopupVisible(false)
    }

    useEffect(() => {
        if (popupVisible === true) {
            setTimeout(() => {
                setPopupVisible(false)
            }, 3000);
            
        }
    }, [popupVisible])
    
    return (
        <div className="home">
            <div>
                <ul className="product-cards">
                    {productItems.map((productItem, productItemIndex) => (
                        <li key={productItemIndex}>
                            <div className="products">
                                <div>{productItem.id}</div>
                                <div className="products-title">
                                    {productItem.title}
                                </div>
                                <div className="products-image">
                                    <img src={productItem.images} />
                                </div>
                                <div className="products-description">
                                    {productItem.description}
                                </div>
                                <div>
                                    {productItem.price}$
                                </div>
                                <div>
                                    <button id="popup" className="add-basket" onClick={() => { addProduct(productItem); setPopupVisible(true) }}>Sepete Ekle</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="popup" id="closepopup" style={{ display: popupVisible ? "block" : "none" }}>
                    <div>
                        <div><button onClick={gizle}>X</button></div>
                        <div>Sepete Eklendi</div>
                    </div>
                </div>
            </div>
        </div>
    )
}