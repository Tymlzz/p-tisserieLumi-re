import React from "react";

function ProductCard({
  data,
  addToCartIcon,
  isInCart,
  handleAddToCart,
  incrementIcon,
  decrementIcon,
  increaseQuantity,
  decreaseQuantity,
  isActive,
}) {
  // 

  return (
    <div>
      <article className="card">
        <div className="card__image-wrapper">
          <picture className="card__image">
            <source media="(min-width: 1024px)" srcSet={data.image.desktop} />
            <source media="(min-width: 600px)" srcSet={data.image.tablet} />
            <source media="(min-width: 400px)" srcSet={data.image.mobile} />
            <img style={{ border: isInCart && isActive? '2px solid hsl(14, 86%, 42%)' : 'none' }}  src={data.image.thumbnail} alt={data.name} />
          </picture>
          {isInCart ? (
            <div className="quantity-controls">
              <button className="decrement" aria-label="Decrease quantity" onClick = {decreaseQuantity}>
                <img src={decrementIcon} alt="Decrease" />
              </button>
              <span>{data.quantity}</span>

              <button
                className="increment"
                aria-label="Increase quantity"
                onClick={increaseQuantity}
              >
                <img src={incrementIcon} alt="Increase" />
              </button>
            </div>
          ) : (
            <button className="add-to-cart" onClick={handleAddToCart}>
              <img className="card_logo" src={addToCartIcon} alt="" />
              <span>Add to cart</span>
            </button>
          )}
        </div>

        <div className="card__details">
          <div className="name">{data.category}</div>
          <div className="description">{data.name}</div>
          <div className="price">${data.price.toFixed(2)}</div>
        </div>
      </article>
    </div>
  );
}

export default ProductCard;
