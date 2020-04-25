import React, { Component } from "react";
import { connect } from "react-redux";

import {
  productDelete,
  productUpdate,
  userUpdateProfile,
} from "../../actions/user";
import { filterContent } from "../../actions/load";
import BenshadaForm from "../BenshadaForm/BenshadaForm";
import { ifSeller } from "../../actions/auth";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfo,
  faTrash,
  // faHeart,
  // faStar
} from "@fortawesome/free-solid-svg-icons";
import { cartAdd, cartRemove } from "../../actions/cart";
import CartButton from "../Cart/CartButton";
import Loading from "../Misc/Loading/Loading";
import NotFound from "../Misc/NotFound/NotFound";
import Review from "./Review";

class Product extends Component {
  renderDiscountedPrice = (price, discount) => {
    const dPrice = 
    return discount > 0 ? (
      <hgroup>
        <p className="lead mb-0 pb-0 font-weight-bold">
          &#x20A6; {}
        </p>
        <p className="pt-0 mt-0 font-weight-lighter">
          <strike>&#x20A6; {price.addComma()}</strike>
        </p>
      </hgroup>
    ) : (
      <p>&#x20A6; {price.addComma()}</p>
    );
  };

  renderProductActions = (i, id, product) => {
    let { isSignedIn, user } = this.props;

    return window.location.pathname.includes("user") ? (
      <>
        <p
          className="float-left mr-3 rounded-0 text-left pointer"
          data-toggle="modal"
          data-target={`#infoModal${i}`}
        >
          <FontAwesomeIcon className="text-primary ml-2" icon={faInfo} />
        </p>
        <p
          className="float-left mr-3 rounded-0 text-left pointer"
          onClick={() => this.props.productDelete(id)}
        >
          <FontAwesomeIcon className="text-primary ml-2" icon={faTrash} />
        </p>
      </>
    ) : !isSignedIn ? (
      ""
    ) : ifSeller(user.type) ? (
      ""
    ) : (
      // <p className="float-left mr-3 rounded-0 text-left pointer">
      //   {saved.filter(({ _id }) => _id === id).length > 0 ? (
      //     <FontAwesomeIcon
      //       className="text-primary"
      //       onClick={() =>
      //         userUpdateProfile({
      //           saved: saved.filter(({ _id }) => _id !== id).unique()
      //         })
      //       }
      //       icon={faHeart}
      //     />
      //   ) : (
      //     <FontAwesomeIcon
      //       className="text-primary"
      //       onClick={() =>
      //         userUpdateProfile({ saved: [...saved, product].unique() })
      //       }
      //       icon={faHeart}
      //     />
      //   )}
      // </p>
      ""
    );
  };

  renderProductButton = (product, i) => {
    let { user } = this.props,
      { _id } = product;

    return window.location.pathname.includes("user") ? (
      <button
        className="btn btn-primary mx-3"
        data-toggle="modal"
        data-target={`#productUpdateModal${i}`}
      >
        Edit
      </button>
    ) : ifSeller(user && user.type) ? (
      ""
    ) : (
      <div className="text-center">
        <CartButton product={product} />
        <Link to={`/products/?id=${_id}`}>
          <button className="btn btn-white text-primary mx-2">View</button>
        </Link>
      </div>
    );
  };

  renderProducts = (products) =>
    products === null ? (
      <Loading />
    ) : products === undefined || products.length < 1 ? (
      <NotFound type="product" />
    ) : (
      <div className="card-columns products my-2">
        {filterContent(products).map((product, i) => {
          let {
              _id,
              inStock,
              discountPercentage,
              name,
              description,
              price,
            } = product,
            productFields = [
              {
                desc: "_id",
                varClass: "input",
                type: "hidden",
                options: [],
                icon: 0,
              },
              {
                desc: "name",
                label: "Name",
                placeholder: "Product Name",
                varClass: "input",
                type: "text",
                options: [],
                row: 1,
                icon: 0,
              },
              {
                desc: "description",
                label: "Description",
                placeholder: "Product Description",
                varClass: "textarea",
                type: "text",
                options: [],
                row: 2,
                icon: 0,
              },
              {
                desc: "price",
                label: "Price",
                varClass: "input",
                type: "number",
                options: [],
                row: 1,
                icon: 1,
                help: "Enter Naira value of price",
              },
              {
                desc: "discountPercentage",
                label: "Discount",
                varClass: "input",
                type: "number",
                options: [],
                row: 2,
                icon: 0,
                help: "Discount in percentage",
              },
            ],
            productButtons = [
              { value: "Upload Changes", className: "btn-primary" },
            ];

          return (
            <>
              <div
                className="card mb-4 pb-3 product rounded shadow-sm border-0"
                key={`product${_id}`}
              >
                <div className="card-body p-3">
                  <div className="p-3">
                    <img className="card-img" src={product.src} alt={name} />
                  </div>

                  <div className="text-left">
                    <p>{name}</p>
                    <p className="lead font-weight-bold">
                      {this.renderDiscountedPrice(price, discountPercentage)}
                    </p>
                  </div>

                  {/* <div className="px-3">
                    <Review i={i} product={product} className="float-left" />

                    {this.renderProductActions(i, _id, product)}
                    <h4 className="flex-grow-1 font-weight-bold text-right">
                      {this.renderDiscountedPrice(price, discountPercentage)}
                    </h4>
                    <div className="clear"></div>
                  </div>
                  <div className="my-4 px-3 text-center">
                    <p className="lead text-truncate text-capitalize my-0">
                      {name}
                    </p>
                    <small className="text-uppercase font-weight-bold my-0 px-2">
                      {product.category}
                    </small>
                    |
                    <small className="text-uppercase font-weight-bold my-0 px-2">
                      {product.gender}
                    </small>
                    <p
                      className={`py-1 px-2 rounded-0 text-white ${
                        inStock ? "bg-success" : "bg-danger"
                      } ml-auto mr-auto`}
                    >
                      {inStock ? "In stock" : "Out of stock"}
                    </p>
                  </div>
                  {this.renderProductButton(product, i)} */}
                </div>
              </div>

              <div
                className="modal fade"
                id={`productUpdateModal${i}`}
                tabIndex="-1"
                role="dialog"
                aria-labelledby={`productUpdateModalLabel${i}`}
                aria-hidden="true"
                key={`productModal${i}`}
              >
                <div className="modal-dialog modal-xl" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5
                        className="modal-title font-weight-light"
                        id={`productUpdateModalLabel${i}`}
                      >
                        Edit {name}
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body text-left">
                      <BenshadaForm
                        form={`form-product-edit${i}`}
                        onSubmitForm={this.props.productUpdate}
                        className="form"
                        fields={productFields}
                        buttons={productButtons}
                        initialValues={product}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="modal fade"
                id={`infoModal${i}`}
                tabIndex="-1"
                role="dialog"
                aria-labelledby="infoModalLabel"
                aria-hidden="true"
                key={`infoModal${i}`}
              >
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5
                        className="modal-title font-weight-light"
                        id="infoModalLabel"
                      >
                        Product Info
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <p>{description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    );

  render() {
    let { title, products, className } = this.props;

    return (
      <div className={`container-fluid my-3 text-center ${className}`}>
        <h4 className="text-left text-capitalize">{title}</h4>

        {this.renderProducts(products)}

        {/* <button className="btn btn-primary">View More</button> */}
      </div>
    );
  }
}

const mapStateToProps = ({ auth, order, cart }) => ({
  isSignedIn: auth.isSignedIn,
  user: auth.user,
  orders: order,
  cart,
});

export default connect(mapStateToProps, {
  productDelete,
  productUpdate,
  userUpdateProfile,
  cartAdd,
  cartRemove,
})(Product);
