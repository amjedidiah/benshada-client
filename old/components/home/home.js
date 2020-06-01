import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { faRedhat } from '@fortawesome/free-brands-svg-icons';
import { faShoppingBag, faTshirt, faShoePrints } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import Jumbo from './jumbo';
import Gender from './gender';
import Product from '../Products/product';
import Store from '../Stores/Store';
// import Testimonies from "./Testimonies/Testimonies";
import VirtualAssistant from '../VirtualAssistant/VirtualAssistant';
import HrFrComp from '../HrFrComp/HrFrComp';

import { featuredStoreFetch } from '../../redux/old/actions/user';
import { fetchProducts, fetchStores } from '../../redux/old/actions/misc';
import { filterContent } from '../../redux/old/actions/load';
import Category from './Category/Category';
import { randNum } from '../../prototypes';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      stores1: null,
      stores2: null,
      productsRecent: null,
      productsTopRated: null,
      productsDiscounted: null
    };
  }

  static propTypes = {
    location: PropTypes.object,
    isSignedIn: PropTypes.bool,
    user: PropTypes.object
  }

  componentDidMount = async () => {
    const req = await fetchStores();
    const stores = req.data.data;

    const res = await fetchProducts();
    const products = filterContent(res.data.data);

    this.setState({
      stores1: stores.slice(0, 12),
      stores2: stores.slice(12, 24),
      productsRecent: products.map((product, i) => products[products.length - i - 1]).slice(0, 12),
      productsTopRated: products.slice(12, 24),
      productsDiscounted: products
        .filter(({ discountPercentage }) => discountPercentage > 0)
        .slice(0, 12)
    });
  };

  renderGallery = (gallery) => gallery.map((image, i) => (
      <img
        className="col-4 col-sm-2 col-lg-1 d-none d-lg-block img-fluid px-0"
        src={image.src}
        alt={image.alt}
        key={i}
      />
  ));

  renderPage() {
    const cats = [
      { name: 'accessories', icon: faRedhat },
      { name: 'bags', icon: faShoppingBag },
      { name: 'clothes', icon: faTshirt },
      { name: 'shoes', icon: faShoePrints }
    ];
    const rand1 = randNum((cats.length - 1));
    const rand2 = () => {
      let k;

      do {
        k = randNum((cats.length - 1));
      } while (k === rand1);

      return k;
    };
    const rand3 = rand2();

    return (
      <HrFrComp>
        <Jumbo cats={cats} />
        <Gender />
        <Category shortDesc={cats[rand1].name} icon={cats[rand1].icon} reversed={false} />
        <Category shortDesc={cats[rand3].name} icon={cats[rand3].icon} reversed={true} />
        <Product title={'recently added'} products={this.state.productsRecent} />
        <Store title={'featured stores'} stores={this.state.stores1} radius={0} />
        <Product title={'top rated'} products={this.state.productsTopRated} />

        {/* <Product
          title={"discounted"}
          products={this.state.productsDiscounted}
        /> */}
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
        <VirtualAssistant />
      </HrFrComp>
    );
  }

  renderHelp() {
    const { location, isSignedIn, user } = this.props;

    return isSignedIn === false
      ? this.renderPage()
      : {
        user: (
            <Redirect
              to={{
                pathname: '/role',
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

const mapStateToProps = (state) => ({
  user: state.auth.user === null ? null : state.auth.user,
  isSignedIn: state.auth.isSignedIn
});

export default connect(mapStateToProps, { featuredStoreFetch })(Home);
