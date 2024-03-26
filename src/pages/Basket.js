import { useEffect, useState } from "react";

export function Basket({ selectProductItems, setSelectProductItems, totalPrice, setTotalPrice }) {
    
      
      
   


    const DeletProduct = (selectProductItem) => {
        const deletedProduct = selectProductItems.filter((product) => product.id === selectProductItem.id);
        console.log(deletedProduct)
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
        setTotalPrice(prevPrice => prevPrice += selectedProduct.price)
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


    return (
        <div className="basket">
            <ul>
                {selectProductItems?.map((selectProductItem, selectProductItemsIndex) => (
                    <li key={selectProductItemsIndex}>
                        <div className="basket-items">
                            <div className="basket-items-general">  
                                <div>
                                    <img src={selectProductItem.images} />
                                </div>
                                <div className="basket-items-info">
                                    <div>
                                        <div className="basket-items-title">
                                            {selectProductItem.title}
                                        </div>
                                        <div className="basket-items-description">
                                            {selectProductItem.description}
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <span>normal fiyat:{selectProductItem.price}</span>
                                            <span className="quantity">Adet: {selectProductItem.quantity}</span>
                                            <div>
                                                <button onClick={() => increaseQuantity(selectProductItem)}>Arttır</button>
                                                <button onClick={() => decreaseQuantity(selectProductItem)}>azalt</button>
                                            </div>
                                        </div>
                                        <div>
                                            Ücret:{selectProductItem.price * selectProductItem.quantity}$
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button onClick={() => DeletProduct(selectProductItem)}>Ürünü Sil</button>
                            </div>
                        </div>
                    </li>
                ))}
                <div>
                    Toplam:{totalPrice}
                </div>
            </ul>
        </div>
    )
}