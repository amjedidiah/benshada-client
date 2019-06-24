import React from "react";
import Header from "../Header/Header";
import Products from "../Products/Products";
import Footer from "../Footer/Footer";
import Jumbo from "./Jumbo";

import image from "../../img/logo2.png";

const INITIAL_VALUES = {
  recentList: {
    name: "Recently Added",
    list: [
      { id: 1, image, star: 4, name: "Lacoste T Shirt", price: 3000 },
      { id: 2, image, star: 4, name: "Lacoste T Shirt", price: 3000 },
      { id: 3, image, star: 4, name: "Lacoste T Shirt", price: 3000 },
      { id: 4, image, star: 4, name: "Lacoste T Shirt", price: 3000 },
      { id: 5, image, star: 4, name: "Lacoste T Shirt", price: 3000 },
      { id: 6, image, star: 4, name: "Lacoste T Shirt", price: 3000 }
    ]
  },
  topCategoryOneList: {
    name: "Shirts",
    list: [
      { id: 1, image, star: 4, name: "LV Shirt", price: 3000 },
      { id: 2, image, star: 4, name: "Luca Brown Shirt", price: 3000 },
      { id: 3, image, star: 4, name: "MVP Shirt", price: 3000 },
      { id: 4, image, star: 4, name: "Lacoste T Shirt", price: 3000 },
      { id: 5, image, star: 4, name: "Lacoste T Shirt", price: 3000 },
      { id: 6, image, star: 4, name: "Lacoste T Shirt", price: 3000 }
    ],
    top: [
      { id: 1, name: "Armani Shoes" },
      { id: 2, name: "Armani Shoes" },
      { id: 3, name: "Armani Shoes" }
    ]
  },
  topCategoryTwoList: {
    name: "Shoes",
    list: [
      { id: 1, image, star: 4, name: "Armani Shoes", price: 3000 },
      { id: 2, image, star: 4, name: "Armani Shoes", price: 3000 },
      { id: 3, image, star: 4, name: "Armani Shoes", price: 3000 },
      { id: 4, image, star: 4, name: "Armani Shoes", price: 3000 },
      { id: 5, image, star: 4, name: "Armani Shoes", price: 3000 },
      { id: 6, image, star: 4, name: "Armani Shoes", price: 3000 }
    ],
    top: [
      { id: 1, name: "Armani Shoes" },
      { id: 2, name: "Armani Shoes" },
      { id: 3, name: "Armani Shoes" }
    ]
  },
  featuredShops: {
    name: "Featured Shops",
    list: [
      { id: 1, image, name: "Amadi's Shop" },
      { id: 2, image, name: "Amadi's Shop" }
    ]
  }
};

const Home = () => {
  return (
    <div className="h-100 bg-light m-0">
      <Header />
      <Jumbo />
      <Products
        list={INITIAL_VALUES.recentList.list}
        title={INITIAL_VALUES.recentList.name}
        top={[]}
        topSearch=""
        type="p-3 product-carousel"
      />
      <Products
        list={INITIAL_VALUES.topCategoryOneList.list}
        title={INITIAL_VALUES.topCategoryOneList.name}
        top={INITIAL_VALUES.topCategoryOneList.top}
        topSearch="Top Search: "
        type="p-3 product-carousel"
      />
      <Products
        list={INITIAL_VALUES.topCategoryTwoList.list}
        title={INITIAL_VALUES.topCategoryTwoList.name}
        top={INITIAL_VALUES.topCategoryTwoList.top}
        topSearch="Top Search: "
        type="p-3 product-carousel"
      />
      <Products
        list={INITIAL_VALUES.featuredShops.list}
        title={INITIAL_VALUES.featuredShops.name}
        top={[]}
        topSearch=""
        type="p-2 shop-carousel"
      />
      <Footer />
    </div>
  );
};

export default Home;
