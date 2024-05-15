import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import ProductCart from "./ProductCart";

export function CategoryList() {
    const [products, setProducts] = useState([]);

    const { data } = useFetch('https://dummyjson.com/products')

    useEffect(() => {
        if (data) {
            setProducts(data.products)
        }
    }, [data])

    const categories = [...new Set(products.map(product => product.category))];

    return (
        <>
            <ul className="categories">
                {categories.map((categoryItem, index) => (
                    <li key={index}>
                        <Link className="categories-link" to={`/categories/${categoryItem}`}>
                            <div className="categories-general">
                                <div className="categories-title">
                                        {categoryItem}
                                </div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
            <ul>
                ürünler
                {products.map((productItem, productItemIndex) => {
                    return (
                        <div className="home">
                            <div className="home-product">
                            <ProductCart productItem={productItem} productItemIndex={productItemIndex} />

                            </div>
                        </div>
                    )
                })}
            </ul>

        </>
    );
}
