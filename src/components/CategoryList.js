import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useSite } from "../context/AppContext";

export function CategoryList() {
    const { productItems, selectProductItems } = useSite();
    const [products, setProducts] = useState([]);
    const { category } = useParams();
    const [categoryDetail, setCategoryDetail] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const handleSubmit = (brand) => {
        setSearchParams({ q: brand });
        navigate(`/${category}?q=${encodeURIComponent(brand)}`);
    };

    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then(response => response.json())
            .then(data => {
                setProducts(data.products);
            });

    }, []);
    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then(response => response.json())
            .then(data => {
                const filtered = data.products.filter(product => product.category === category);
                setCategoryDetail(filtered);
            });

    }, [category]);

    const filterByBrand = (brand) => {
        const filtered = products.filter(product => product.brand === brand);
        setProducts(filtered);
        handleSubmit(brand);
    };

    const filterbyCategories = (a) => {
        const deneme = products.filter(product => product.category === category)
        setProducts(deneme)
    }
    const categories = [...new Set(products.map(product => product.category))];
    const brands = [...new Set(products.map(product => product.brand))];

    return (
        <>
            <ul className="categories">
                {categories.map((categoryItem, index) => (
                    <li key={index}>
                        <Link to={`/${categoryItem}`} onClick={filterbyCategories}>
                            <div className="categories-general">
                                <div className="categories-title">
                                    <div>
                                        {categoryItem}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
            <ul>
                markaların listesi
                {brands.map((brandItem, index) => (
                    <li key={index}>
                        <button onClick={() => { filterByBrand(brandItem); }}>
                            {brandItem}
                        </button>
                    </li>
                ))}
            </ul>
            <ul>
                seçilen markanın ürünleri
                {products.map((product, index) => (
                    <li key={index}>{product.title}</li>
                ))}
            </ul>

        </>
    );
}