import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react";
import ProductCart from "../components/ProductCart";

export function CategoryDetail() {
    const { category } = useParams()
    const [products, setProducts] = useState([])
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get("brand") || "");

    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then(response => response.json())
            .then(data => {
                if (data) {
                    const filteredProductsByCat = data.products.filter(productItem => productItem.category === category)
                    if (searchQuery === '') {
                        setProducts(filteredProductsByCat)
                    } else {
                        const filteredProductsByBrand = filteredProductsByCat.filter(productItem => productItem.brand === searchQuery)
                        setProducts(filteredProductsByBrand)
                    }
                }
            })
    }, [])

    const brands = [...new Set(products.map(productItem => productItem.brand))]

    function handleFilterBrand(brand) {
        const filteredProductsByBrand = products.filter(productItem => productItem.brand === brand)
        setProducts(filteredProductsByBrand)
    }

    return (
        <>
            <h1>{category}</h1>
            <div className="brands">
                {brands.map((brandItem, brandItemIndex) => (
                    <span onClick={() => handleFilterBrand(brandItem)} style={{ marginRight: '20px' }}>{brandItem}</span>
                ))}
            </div>
            <div className="">
                {products.map((productItem, productItemIndex) => {
                    return (
                        <div className="home">
                            <div className="home-product">
                                    <ProductCart productItem={productItem} productItemIndex={productItemIndex} />

                            </div>
                        </div>)
                })}
            </div>
        </>
    )
}
