import { useSite } from "../context/AppContext";
import ProductCart from "../components/ProductCart";
import { ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";
export default function HomeProduct() {
    const { productItems,likeItems } = useSite()
    // const { category } = useParams();
    return (
        <div className="home">
            <div className="home-product">
                <ul className="product-cards">
                    {productItems.map((productItem, productItemIndex) => {
                        const findProduct = likeItems.some(item => item.id === productItem.id) || null;
                        return (
                            <ProductCart productItem={productItem} productItemIndex={productItemIndex} key={productItemIndex} findProduct={findProduct}/>
                        )
                    })}
                </ul>
                <ToastContainer />

                {/* <div className="popup" id="closepopup" style={{ display: popupVisible ? "block" : "none" }}>
                <div>
                    <div><button onClick={gizle}>X</button></div>
                    <div>Sepete Eklendi</div>
                </div>
            </div> */}
            </div>
        </div>
    )
}