import { useParams } from "react-router-dom"
import { useSite } from "../context/AppContext"

export default function ProductDetail({ productItem }) {
    const { setSelectProductItems, selectProductItems, setTotalPrice } = useSite()

    const { productItems } = useSite()
    const { productId } = useParams()

    const thisProduct = productItems.find((product) => product.id === Number(productId));
    console.log(thisProduct);
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

    if (!thisProduct) {
        return null
    }

    return (
        <>
            <div className="product-detail">
                {thisProduct.images && <div className="product-detail-image">
                    <img src={thisProduct.images[0].replace('[', '').replace(']', '').replaceAll('"', '')} />
                </div>}
                
                <div className="product-detail-right">
                    <h1>{thisProduct.title}</h1>
                    <p>Price: ${thisProduct.price}</p>
                    {thisProduct.description && <p>{thisProduct.description}</p> }
                    <button className="animated-button" onClick={() => { addProduct(thisProduct) }}>
                        <svg viewBox="0 0 24 24" className="arr-2" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                            ></path>
                        </svg>
                        {window.getCookie('is_logged_in') == 'false' || window.getCookie('is_logged_in') == undefined ? (
                            <a href="http://localhost:3000/giris">
                                <span className="text">  Sepete Ekle !</span>
                            </a>
                        ) : (
                            <span className="text">  Sepete Ekle !</span>
                        )}
                        <span className="circle"></span>
                        <svg viewBox="0 0 24 24" className="arr-1" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                            ></path>
                        </svg>
                    </button>
                </div>
                <div>
                </div>
            </div>
        </>
    )
}