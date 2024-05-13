import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CategoryList } from "./CategoryList";
import { BsDisplay } from "react-icons/bs";


export default function CategoryDetail() {
    const { category,brand } = useParams();
    const [categoryDetail, setCategoryDetail] = useState([]);
    const [brandDetail,setBrandDetail]=useState([]);

    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then(response => response.json())
            .then(data => {
                const filtered = data.products.filter(product => product.category === category);
                setCategoryDetail(filtered);
            });
           
    }, [category]);
    return (
        <div className="products_general">
            <CategoryList/>

            <ul className="products">
                {/* {categoryDetail.map((product, index) => (
                    <li key={index}>
                        <div className="basket-items">
                            <div className="basket-items-general">
                                <div className="basket-items-images">
                                    <img src={product.images[0].replace('[', '').replace(']', '').replaceAll('"', '')} />

                                </div>
                                <div className="basket-items-info">
                                    <div className="basket-items-text">
                                        <div className="basket-items-title">
                                            {product.title}
                                        </div>
                                        <div className="basket-items-description">
                                            {product.description}
                                        </div>
                                    </div>
                                    <div className="price">
                                        Fiyatı:{product.price}$
                                    </div>
                                    <div>
                                        <Link to={`/products/${product.id}`}>
                                            ürüne git
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </li>
                ))} */}
            </ul>
            </div>
    );
}
