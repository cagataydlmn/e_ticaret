import { NavLink } from "react-router-dom";
import { useSite } from "../context/AppContext";

export default function Like() {
    const { likeItems, setLikeItems } = useSite()

    const DeletProduct = (product) => {
        const updatedLikeItems = likeItems.filter(item => item.id !== product);
        setLikeItems(updatedLikeItems);
    };

    if (window.getCookie('is_logged_in') == 'false') {
        return <div>
            Favorilere ürün ekleyebilmek için önce giriş yap
            <NavLink to='/login'>
                Giriş yapmak için tıkla
            </NavLink>
        </div>
    }
    return (

        <div className="basket">
            <ul>
                {likeItems?.map((selectProductItem, selectProductItemsIndex) => (
                    <li key={selectProductItemsIndex}>
                        <div className="basket-items">
                            <div className="basket-items-general">
                                <div className="basket-items-images">
                                    <img src={selectProductItem.images[0].replace('[', '').replace(']', '').replaceAll('"', '')} />
                                </div>
                                <div className="basket-items-info">
                                    <div className="basket-items-text">
                                        <div className="basket-items-text-title">
                                            {selectProductItem.title}
                                        </div>
                                        <div className="basket-items-description">
                                            {selectProductItem.description}
                                        </div>
                                    </div>
                                    <div className="price">
                                        Fiyatı:{selectProductItem.price}$
                                    </div>
                                </div>   
                            </div>
                            <div>
                            <button onClick={() => DeletProduct(selectProductItem.id)}>Ürünü Favorilerden Kaldır</button>
                        </div>
                        </div>
                       
                    </li>
                ))}

            </ul>
        </div>

    )
}