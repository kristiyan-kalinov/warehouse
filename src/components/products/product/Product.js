import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../../utils/http-utils/product-requests";
import { ProductCard } from "../product-card/ProductCard";
import './Product.scss';

export function Product(props) {
    const params = useParams();
    const [product, setProduct] = useState(null);


    useEffect(() => {
        getProductById(params.id).then(response => setProduct(response.data));
    }, [params.id])

    return (
        <div className="product">
            <ProductCard product={product} isInDetails={true} />
        </div>
    )
}