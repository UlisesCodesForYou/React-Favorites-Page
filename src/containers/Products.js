import React ,{useContext}from 'react';


import ProductItem from '../components/Products/ProductItem';
import {ProductsContext} from '../context/product-context'
import './Products.css';

const Products = props => {
  const ctx = useContext(ProductsContext).products
  return (
    <ul className="products-list">
      {ctx.map(prod => (
        <ProductItem
          key={prod.id}
          id={prod.id}
          title={prod.title}
          description={prod.description}
          isFav={prod.isFavorite}
        />
      ))}
    </ul>
  );
};

export default Products;
