import React from "react";

// Custom components
import Header from "../Header/Header";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Jumbo from "./Jumbo/Jumbo";
import Gender from "./Gender/Gender";
import Product from "../Products/Product";
import Store from "../Stores/Store";
import Testimonies from "./Testimonies/Testimonies";
import Footer from "../Footer/Footer";
import VirtualAssistant from "../VirtualAssistant/VirtualAssistant";

import { featuredStoreFetch } from "../../actions/user";
import { fetchProducts, fetchStores } from "../../actions/misc";
import { filterContent } from "../../actions/load";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      stores1: [],
      stores2: [],
      productsRecent: [],
      productsTopRated: [],
      productsDiscounted: [],
    };
  }

  componentDidMount = async () => {
    const req = await fetchStores(),
      stores = req.data.data,
      storeNames = stores.map(({ name }) => name),
      uniqueStoreNames = storeNames.unique(),
      store = uniqueStoreNames.map((name) => ({ name }));

    const res = await fetchProducts(),
      products = filterContent(res.data.data);

    this.setState({
      stores1: stores.slice(0, 4),
      stores2: stores.slice(4, 8),
      productsRecent: products
        .map((product, i) => products[products.length - i - 1])
        .slice(0, 4),
      productsTopRated: products.slice(4, 8),
      productsDiscounted: products
        .filter(({ discountPercentage }) => discountPercentage > 0)
        .slice(0, 4),
    });
  };

  renderGallery = (gallery) =>
    gallery.map((image, i) => (
      <img
        className="col-4 col-sm-2 col-lg-1 d-none d-lg-block img-fluid px-0"
        src={image.src}
        alt={image.alt}
        key={i}
      />
    ));

  renderPage() {
    return (
      <div className="bg-light">
        <Header />
        <Jumbo />
        <Gender />
        <Product
          title={"recently added"}
          products={this.state.productsRecent}
        />
        <Store title={"featured stores"} stores={this.state.stores1} />
        <Product title={"top rated"} products={this.state.productsTopRated} />

        <Store title={"featured stores"} stores={this.state.stores2} />
        <Product
          title={"discounted"}
          products={this.state.productsDiscounted}
        />
        {/* <Testimonies
          title="customer testimonies"
          customers={[
            {
              name: "amaraegbu jedidiah",
              testimony: "I am a testifier",
              src: ""
            },
            {
              name: "amaraegbu jedidiah",
              testimony: "I am a testifier",
              src: ""
            },
            {
              name: "amaraegbu jedidiah",
              testimony: "I am a testifier",
              src: ""
            },
            {
              name: "amaraegbu jedidiah",
              testimony: "I am a testifier",
              src: ""
            }
          ]}
        /> */}
        {/* <div className="container my-5 text-center" id="how-it-works">
          <h4 className="text-center">How It Works</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex,
            corrupti necessitatibus pariatur dolor molestiae, obcaecati
            blanditiis, porro ducimus nulla deserunt in vitae autem vel sit
            placeat consectetur veritatis distinctio repudiandae.
          </p>
        </div> */}
        {/* <div className="container-fluid">
          <div className="row justify-content-center">
            {this.renderGallery([
              { src: "", alt: "Image" },
              { src: "", alt: "Image" },
              { src: "", alt: "Image" },
              { src: "", alt: "Image" },
              { src: "", alt: "Image" },
              { src: "", alt: "Image" },
              { src: "", alt: "Image" },
              { src: "", alt: "Image" },
              { src: "", alt: "Image" },
              { src: "", alt: "Image" },
              { src: "", alt: "Image" },
              { src: "", alt: "Image" }
            ])}
          </div>
        </div> */}
        <Footer />
        <VirtualAssistant />
      </div>
    );
  }

  renderHelp() {
    let { location, isSignedIn, user } = this.props;

    return isSignedIn === false
      ? this.renderPage()
      : {
          user: (
            <Redirect
              to={{
                pathname: "/role",
                state: { from: location },
              }}
            />
          ),
        }[user && user.type] || this.renderPage();
  }

  render() {
    return <>{this.renderHelp()}</>;
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user === null ? null : state.auth.user,
  isSignedIn: state.auth.isSignedIn,
});

export default connect(mapStateToProps, { featuredStoreFetch })(Home);
