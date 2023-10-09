"use client";
import Link from "next/link";
import { catalogData } from "./Data";
import "./styles.scss";
import { useState } from "react";
const Catalog = () => {
  const [cartItemQuantity, setCartItemQuantity] = useState(0);
  return (
    <div className="catalog__wrapper">
      <div className="catalog container">
        <div className="catalog__title">
          <i className="fi fi-bs-menu-burger"></i>
          Danh mục
        </div>
        <nav className="catalog__items">
          <ul>
            {catalogData.map((cd) => (
              <li className="item" key={cd.name}>
                <Link href={cd.href}>{cd.name}</Link>
              </li>
            ))}
            <li className="cart-item">
              <i className="fi fi-sr-shopping-bag"></i>
              <span>Giỏ hàng</span>
              <div className="cart-item__badge">{cartItemQuantity}</div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Catalog;
