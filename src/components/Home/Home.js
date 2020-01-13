import React from "react";

// Custom components
import Header from "../Header/Header";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Jumbo from "./Jumbo/Jumbo";
import Gender from "./Gender/Gender";
import Product from "../Product/Product";
import Stores from "../Stores/Stores";
import Testimonies from "./Testimonies/Testimonies";
import Footer from "../Footer/Footer";
import VirtualAssistant from "../VirtualAssistant/VirtualAssistant";

class Home extends React.Component {
  renderGallery = gallery =>
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
          products={[
            {
              src: "",
              name: "nike shoes",
              price: "1500",
              category: "shoe",
              ratings: 10,
              discount: 10
            },
            {
              src: "",
              name: "nike shoes",
              price: "1500",
              category: "shoe",
              ratings: 10,
              discount: 0
            },
            {
              src: "",
              name: "nike shoes",
              price: "1500",
              category: "shoe",
              ratings: 10,
              discount: 0
            },
            {
              src: "",
              name: "nike shoes",
              price: "1500",
              category: "shoe",
              ratings: 10,
              discount: 10
            }
          ]}
        />
        <Stores
          title={"featured stores"}
          stores={[
            { name: "Ama", src: "" },
            { name: "Bola", src: "" },
            { name: "Pepp", src: "" },
            { name: "Pepp", src: "" }
          ]}
          radius={0}
        />
        <Product
          title={"top rated"}
          products={[
            {
              src: "",
              name: "nike shoes",
              price: "1500",
              category: "shoe",
              ratings: 10,
              discount: 10
            },
            {
              src: "",
              name: "nike shoes",
              price: "1500",
              category: "shoe",
              ratings: 10,
              discount: 0
            },
            {
              src: "",
              name: "nike shoes",
              price: "1500",
              category: "shoe",
              ratings: 10,
              discount: 0
            },
            {
              src: "",
              name: "nike shoes",
              price: "1500",
              category: "shoe",
              ratings: 10,
              discount: 10
            }
          ]}
        />
        <Stores
          title={"featured stores"}
          stores={[
            { name: "Ama", src: "" },
            { name: "Bola", src: "" },
            { name: "Pepp", src: "" },
            { name: "Pepp", src: "" }
          ]}
          radius={1}
        />
        <Product
          title={"discounted"}
          products={[
            {
              src: "",
              name: "nike shoes",
              price: "1500",
              category: "shoe",
              ratings: 10,
              discount: 10
            },
            {
              src: "",
              name: "nike shoes",
              price: "1500",
              category: "shoe",
              ratings: 10,
              discount: 0
            },
            {
              src: "",
              name: "nike shoes",
              price: "1500",
              category: "shoe",
              ratings: 10,
              discount: 0
            },
            {
              src: "",
              name: "nike shoes",
              price: "1500",
              category: "shoe",
              ratings: 10,
              discount: 10
            }
          ]}
        />
        <Testimonies
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
        />
        <div className="container my-5 text-center" id="how-it-works">
          <h4 className="text-center">How It Works</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex,
            corrupti necessitatibus pariatur dolor molestiae, obcaecati
            blanditiis, porro ducimus nulla deserunt in vitae autem vel sit
            placeat consectetur veritatis distinctio repudiandae.
          </p>
        </div>
        <div className="container-fluid">
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
        </div>
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
                state: { from: location }
              }}
            />
          )
        }[user && user.type] || this.renderPage();
  }

  render() {
    return <>{this.renderHelp()}</>;
  }
}

const mapStateToProps = state => ({
  user: state.auth.user === null ? null : state.auth.user,
  isSignedIn: state.auth.isSignedIn
});

export default connect(mapStateToProps, {})(Home);
