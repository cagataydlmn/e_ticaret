import { useSite } from "../context/AppContext";
import ProductCart from "../components/ProductCart";
import { ToastContainer } from "react-toastify";
export default function HomeProduct() {
    const { productItems,likeItems } = useSite()
    
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
            </div>
        </div>
    )
}