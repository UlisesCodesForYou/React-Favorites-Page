import React from 'react';


import Card from '../UI/Card';
import './ProductItem.css';
import {useStore} from "../../custom-hooks/store";


const ProductItem = props => {
    const dispatch = useStore(false)[1] // This syntax is used to get the 2nd value of this hook.  Since I only want the function i have to use the right index to get it.


    const toggleFavHandler = () => {
        // toggleFav(props.id)
        dispatch('TOGGLE_FAV', props.id)
    };

    return (
        <Card style={{marginBottom: '1rem'}}>
            <div className="product-item">
                <h2 className={props.isFav ? 'is-fav' : ''}>{props.title}</h2>
                <p>{props.description}</p>
                <button
                    className={!props.isFav ? 'button-outline' : ''}
                    onClick={toggleFavHandler}
                >
                    {props.isFav ? 'Un-Favorite' : 'Favorite'}
                </button>
            </div>
        </Card>
    );
};

export default ProductItem;
