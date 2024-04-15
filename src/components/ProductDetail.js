import { useParams } from "react-router-dom"
import { useSite } from "../context/AppContext"
import NotFound from "../pages/NotFound"

export default function ProductDetail({productItem}) {
    const { setSelectProductItems, selectProductItems, setTotalPrice } = useSite()

    const { productItems } = useSite()
    const { productId } = useParams()

    const thisProduct = productItems.find((product) => product.id === Number(productId));
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
    
    return (
        <>
            <div className="product-detail">
                <div className="product-detail-image">
                    <img src={thisProduct.images} />
                </div>
                <div className="product-detail-right">
                    <h1>{thisProduct.title}</h1>
                    <p>Price: ${thisProduct.price}</p>
                    <p>{thisProduct.description}</p>
                    <button onClick={() => {addProduct(thisProduct)}} >sepete ekle</button>
                </div>
                <div>
                </div>

            </div>
        </>
    )
}