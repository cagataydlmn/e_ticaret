import { useParams } from "react-router-dom"
import { useSite } from "../context/AppContext"
import NotFound from "../pages/NotFound"

export default function ProductDetail() {
    const { productItems } = useSite()
    const { productId } = useParams()

    const thisProduct = productItems.find((product) => product.id === Number(productId));

    // if (!thisProduct) {
    //     return <NotFound />;
    // }  

    return (
        <>
            <div className="product-detail">
                <img src={thisProduct.images}/>
                <h1>{thisProduct.title}</h1>
                <p>Price: ${thisProduct.price}</p>
                <p>{thisProduct.description}</p>
            </div>
        </>
    )
}