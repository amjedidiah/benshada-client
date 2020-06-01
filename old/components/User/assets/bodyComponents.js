/* eslint-disable max-classes-per-file */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContainerDimensions from 'react-container-dimensions';
import PropTypes from 'prop-types';
import BenshadaForm from '../../BenshadaForm/BenshadaForm.js';
import {
  userUpdateProfile, storeUpdateInfo, storeUpdateBank, orderCancel
} from '../../../redux/old/actions/user.js.js';
import { filterContent } from '../../../redux/old/actions/load.js.js';
import stateSelect from '../../../assets/location.js';
import { ifSeller } from '../../../redux/old/actions/auth.js.js';
// import MultiSelect from "../MultiSelect/MultiSelect";
// import fedex from "../assets/img/fedex_logo.png";
// import dhl from "../assets/img/dhl_logo.png";
import Product from '../../Products/product.js';
// import DashNav from "../DashNav";
// import DashBody from "../DashBody";
import BarChart from '../../charts/BarChart/index.js';
// import MultiLineChart from "../../charts/MultiLineChart";
import LineChart from '../../charts/LineChart/index.js';
import PieChart from '../../charts/PieChart/index.js';

// import NotFound from "../../Misc/NotFound/NotFound";
import Order from '../../Orders/Order.js';
import { unique, split } from '../../../prototypes.js';

const renderTabList = (array, id) => array.map((item, i) => (
    <li className="nav-item" key={i}>
      <a
        className={`nav-link text-uppercase font-weight-bold ${i === 0 ? 'active' : ''}`}
        id={`${id}-${item}-tab`}
        data-toggle="tab"
        href={`#${id}-${item}`}
        role="tab"
        aria-controls={`${id}-${item}`}
        aria-selected={i === 0}
      >
        {item}
      </a>
    </li>
));

class TabBody extends Component {
  static propTypes = {
    active: PropTypes.string,
    name: PropTypes.string,
    children: PropTypes.element
  }

  render() {
    return (
      <div
        className={`tab-pane fade ${this.props.active} py-3`}
        id={this.props.name}
        role="tabpanel"
        aria-labelledby={`${this.props.name}-tab`}
      >
        {this.props.children}
      </div>
    );
  }
}

class ProfileTabBodyContainer extends Component {
  static propTypes = {
    user: PropTypes.object,
    type: PropTypes.string,
    store: PropTypes.object
  }

  renderFollowers = (cat, type) => {
    if (!ifSeller(type)) {
      return <p className="mt-3">
            <span className="text-primary">Following</span>: <span className="mr-md-3"> 0</span>
          </p>;
    }

    return cat !== 'store' ? (
      <p className="mt-3">
        <span className="text-primary">Following</span>: <span className="mr-md-3"> 0</span>
      </p>
    ) : (
      <p className="mt-3">
        <span className="text-primary">Followers</span>: <span className="mr-md-3"> 0</span>
      </p>
    );
  }

  render() {
    const { user, type, store } = this.props;
    const name = type !== 'store' ? user && user.name : store && store.name;
    const info = type !== 'store' ? user && user.email : store && store.description;

    return (
      <div className="px-4 mb-4 text-center text-lg-left">
        <div
          className="float-lg-left text-left rounded-circle position-relative"
          style={{
            width: '100px',
            height: '100px',
            overflow: 'hidden',
            margin: '0 auto'
          }}
        >
          <img src={''} alt="" className="rounded-circle position-absolute" width="100" height="100" />
          <div className="position-absolute w-100 text-center" style={{ bottom: 0 }}>
            <i className={`fas fa-${type} fa-6x text-primary`}></i>
          </div>
        </div>
        <div className="pt-2 ml-2 float-lg-left">
          <p className="mb-0">
            <strong>{name}</strong> <br />
            {info}
          </p>
          {/* {this.renderFollowers(type, user && user.type)} */}
        </div>

        <div className=" clear"></div>
      </div>
    );
  }
}

class ProductsTabBodyContainer extends Component {
  static propTypes = {
    store: PropTypes.object,
    products: PropTypes.array
  }

  render() {
    return (
      <div className="px-4 mb-4 text-center text-lg-left">
        <Product title={''} products={(this.props.store && this.props.store.products) || this.props.products} />

        <div className=" clear"></div>
      </div>
    );
  }
}

class OrdersTabBodyContainer extends Component {
  static propTypes = {
    orders: PropTypes.array
  }

  renderDiscountedPrice = (price, discount) => (discount > 0 ? (
      <>
        <small className="mb-0 font-weight-normal">
          <strike>
            &#x20A6; <span>{price}</span>
          </strike>
        </small>
        <p className="mb-0">
          &#x20A6; <span>{price * (1 - discount / 100)}</span>
        </p>
      </>
  ) : (
      <p className="mb-0">
        &#x20A6; <span>{price}</span>
      </p>
  ));

  render() {
    return (
      <div className="px-4 mb-4 text-center">
        <Order orders={filterContent(this.props.orders)} />

        <div className="clear"></div>
      </div>
    );
  }
}

class Profile extends Component {
  static propTypes = {
    storeUpdateInfo: PropTypes.func,
    user: PropTypes.object,
    store: PropTypes.object,
    userUpdateProfile: PropTypes.func
  }

  renderStoreInfoTab(user, store) {
    const name = store && store.name;
    const description = store && store.description;
    // policies = store && store.policies,
    // bank = store && store.bank,
    // bankName = bank && bank.name,
    // bankNumber = bank && bank.number,
    // bankType = bank && bank.type,
    // bankSelect = [
    //   "Access Bank",
    //   "Fidelity Bank",
    //   "First City Monument Bank",
    //   "First Bank of Nigeria",
    //   "Guaranty Trust Bank",
    //   "Union Bank of Nigeria",
    //   "United Bank for Africa",
    //   "Zenith Bank",
    //   "Citibank Nigeria",
    //   "Ecobank Nigeria",
    //   "Heritage Banking Company",
    //   "Keystone Bank",
    //   "Polaris Bank",
    //   "Stanbic IBTC Bank",
    //   "Standard Chartered",
    //   "Sterling Bank",
    //   "Titan Trust Bank",
    //   "Unity Bank",
    //   "Wema Bank",
    //   "Globus Bank",
    //   "SunTrust Bank Nigeria",
    //   "Providus Bank"
    // ],
    const profileStoreFields = [
      {
        desc: 'name',
        label: 'Store Name',
        placeholder: "e.g Paul Ahmed's Store",
        varClass: 'input',
        type: 'text',
        options: [],
        icon: 0,
        value: name
      },
      {
        desc: 'description',
        label: 'Store Description',
        varClass: 'textarea',
        type: 'text',
        options: [],
        icon: 0,
        value: description
      }
      // {
      //   desc: "policies",
      //   label: "Store Policies",
      //   varClass: "textarea",
      //   type: "text",
      //   options: [],
      //   icon: 0,
      //   value: policies
      // }
    ];
    const profileStoreButtons = [{ value: 'Update Store Profile', className: 'btn-primary' }];
    // profileBankFields = [
    //   {
    //     desc: "bankName",
    //     label: "Account Name",
    //     varClass: "input",
    //     type: "text",
    //     options: [],
    //     row: 1,
    //     icon: 0,
    //     value: bankName
    //   },
    //   {
    //     desc: "number",
    //     label: "Account Number",
    //     varClass: "input",
    //     type: "number",
    //     options: [],
    //     row: 2,
    //     icon: 0,
    //     value: bankNumber
    //   },
    //   {
    //     desc: "bankType",
    //     label: "Bank Name",
    //     varClass: "select",
    //     type: "text",
    //     options: bankSelect,
    //     row: 1,
    //     icon: 0,
    //     value: bankType
    //   }
    // ],
    // profileBankButtons = [
    //   { value: "Update Bank Details", className: "btn-primary" }
    // ],

    return ifSeller(user.type) ? (
      <TabBody active="" name="profile-store">
        <ProfileTabBodyContainer user={user} type="store" store={store} />
        <BenshadaForm
          form={'form-profile-update-store'}
          onSubmitForm={this.props.storeUpdateInfo}
          className="form"
          fields={profileStoreFields}
          buttons={profileStoreButtons}
          initialValues={store}
        />

        {/* <MultiSelect
          title="categories"
          availableOptions={[
            { name: "ankara" },
            { name: "adire" },
            { name: "agbada" },
            { name: "bags" }
          ]}
          selectedOptions={[
            { name: "ankara" },
            { name: "adire" },
            { name: "agbada" }
          ]}
        />

        <MultiSelect
          title="delivery_options"
          availableOptions={[
            { name: "fedex", src: fedex },
            { name: "dhl", src: dhl }
          ]}
          selectedOptions={[
            { name: "fedex", src: fedex },
            { name: "dhl", src: dhl }
          ]}
        />

        <h4 className="mt-5 pt-5">Bank Details</h4>
        <BenshadaForm
          form={`form-profile-update-bank`}
          onSubmitForm={storeUpdateBank}
          className="form"
          fields={profileBankFields}
          buttons={profileBankButtons} initialValues={{}}
        /> */}
      </TabBody>
    ) : (
      ''
    );
  }

  render() {
    const { user, store } = this.props;
    const profileFields = [
      {
        desc: 'name',
        label: 'Full Name',
        placeholder: 'Paul Ahmed',
        varClass: 'input',
        type: 'text',
        options: [],
        icon: 0,
        value: user && user.name
      },
      // {
      //   desc: "phone",
      //   label: "Mobile Number",
      //   placeholder: "+234 816 597 2229",
      //   varClass: "input",
      //   type: "tel",
      //   options: [],
      //   icon: 0,
      //   value: user && user.phone
      // },
      // {
      //   desc: "street",
      //   label: "Street",
      //   placeholder: "91 Ojuelegba Road Surulere",
      //   varClass: "textarea",
      //   type: "text",
      //   options: [],
      //   icon: 0,
      //   value: user && user.street
      // },
      {
        desc: 'state',
        label: 'State',
        varClass: 'select',
        type: 'text',
        options: stateSelect.map(({ state }) => state),
        row: 1,
        icon: 0,
        value: user && user.state
      }
      // {
      //   desc: "country",
      //   label: "Country",
      //   varClass: "select",
      //   type: "text",
      //   options: ["Nigeria", "Ghana"],
      //   row: 2,
      //   icon: 0,
      //   value: user && user.country
      // },
      // {
      //   desc: "bio",
      //   label: "Bio",
      //   varClass: "textarea",
      //   type: "text",
      //   options: [],
      //   icon: 0,
      //   value: user && user.bio
      // }
    ];
    const profileButtons = [{ value: 'Update Personal Profile', className: 'btn-primary' }];
    const tablist = !ifSeller(user && user.type) ? ['personal'] : ['personal', 'store'];

    return (
      <div className="p-5 mt-5">
        <ul className="nav nav-test nav-tabs" id="myTab" role="tablist">
          {renderTabList(tablist, 'profile')}
        </ul>
        <div className="tab-content" id="profileTabContent">
          <TabBody active="show active" name="profile-personal">
            <ProfileTabBodyContainer user={user} store={store} type="user" />
            <BenshadaForm
              form={'form-profile-update-personal'}
              onSubmitForm={this.props.userUpdateProfile}
              className="form"
              fields={profileFields}
              buttons={profileButtons}
              initialValues={user}
            />
          </TabBody>
          {this.renderStoreInfoTab(user, store)}
        </div>
      </div>
    );
  }
}

class Saved extends Component {
static propTypes = {
  user: PropTypes.object
}

renderTabBody(tablist) {
  return tablist.map((item, i) => {
    const active = i === 0 ? 'show active' : '';

    return (
        <TabBody active={active} name={`orders-${item}`} key={i}>
          <ProductsTabBodyContainer time={item} products={filterContent(this.props.user.saved)} />
        </TabBody>
    );
  });
}

render() {
  const tablist = ['today', 'this_week', 'this_month', 'this_year', 'all_time'];
  return (
      <div className="p-5">
        <div className="tab-content" id="ordersTabContent">
          {this.renderTabBody(tablist)}
        </div>
      </div>
  );
}
}

class Products extends Component {
  static propTypes = {
    store: PropTypes.object
  }

  renderTabBody = (tablist, store) => tablist.map((item, i) => {
    const active = i === 0 ? 'show active' : '';

    return (
        <TabBody active={active} name={`products-${item}`} key={i}>
          <ProductsTabBodyContainer time={item} store={store} />
        </TabBody>
    );
  })

  render() {
    const tablist = ['today', 'this_week', 'this_month', 'this_year', 'all_time'];
    return (
      <div className="p-5 mt-5">
        {/* <ul className="nav nav-test nav-tabs" id="myTab" role="tablist">
          {renderTabList(tablist, "products")}
        </ul> */}
        <div className="tab-content" id="productsTabContent">
          {this.renderTabBody(tablist, this.props.store)}
        </div>
      </div>
    );
  }
}

class Orders extends Component {
  static propTypes = {
    orders: PropTypes.array,
    user: PropTypes.object
  }

  renderTabBody(tablist) {
    return tablist.map((item, i) => {
      const active = i === 0 ? 'show active' : '';
      return (
        <TabBody active={active} name={`orders-${item}`} key={i}>
          <OrdersTabBodyContainer user={this.props.user} time={item} orders={this.props.orders} />
        </TabBody>
      );
    });
  }

  render() {
    const tablist = ['today', 'this_week', 'this_month', 'this_year', 'all_time'];
    return (
      <div className="p-5 mt-5">
        {/* <ul className="nav nav-test nav-tabs" id="myTab" role="tablist">
          {renderTabList(tablist, "orders")}
        </ul> */}
        <div className="tab-content" id="ordersTabContent">
          {this.renderTabBody(tablist)}
        </div>
      </div>
    );
  }
}

class Analytics extends Component {
  static propTypes = { orders: PropTypes.array, store: PropTypes.object }

  renderTabListBody = (list, content) => list.map((item, i) => (
      <TabBody active={`show ${i === 0 ? 'active' : ''}`} name={`analytics-${item}`} key={`analytics-${item}`}>
        <div className="card-columns">{content[i]}</div>
      </TabBody>
  ));

  averageProductPrice = (products) => products
    .map(({ price, discountPercentage }) => price * (1 - discountPercentage / 100))
    .reduce((total, num) => total + num, 0) / products.length;

  ordersCount = (orders) => orders.length;

  totalOrderRevenue = (funcOrders) => {
    const orders = funcOrders.filter((order) => order.status === 'paid');

    return orders.length < 1
      ? 0
      : orders.map(({ totalPrice }) => totalPrice).reduce((total, num) => total + num);
  };

  totalCustomers = (funcOrders) => {
    const orders = funcOrders.filter((order) => order.status === 'paid');

    return typeof orders === 'object' ? unique(orders.map(({ user }) => {
      const { _id } = user;
      return _id;
    })).length : '';
  };

  productRevenue = (funcOrders) => {
    const orders = funcOrders.filter((order) => order.status === 'paid');

    const productArray = split(orders
      .map(({ products }) => products.map(({ name }) => name))
      .join(), ',');

    const data = orders.map(({ products }) => products.map((
      { name, price, discountPercentage }
    ) => ({
      name,
      revenue: productArray
        .filter((item) => item === name).length * price * (1 - discountPercentage / 100)
    })))[0];

    return data;
  };

  timeRevenue = (orders) => orders
    .filter((order) => order.status === 'paid')
    .map(({ updatedAt, totalPrice }) => ({
      updatedAt: updatedAt.toDashDate(),
      totalPrice
    }));

  render() {
    const tablist = ['revenue', 'customer'];
    const { orders, store } = this.props;
    const orderRevenue = this.totalOrderRevenue(filterContent(orders));
    const customers = this.totalCustomers(filterContent(orders));
    const paidOrders = filterContent(orders).filter((order) => order.status === 'paid');
    const customerOrders = paidOrders.map(({ user, totalPrice }) => ({
      name: user.name,
      totalPrice
    }));
    const uniqueCustomerNames = unique(paidOrders.map(({ user }) => user.name));
    const content = [
        <>
          <div className="card shadow-sm">
            <div className="card-body">
              <p className="card-title text-uppercase">total revenue</p>
              <h1 className="display-4 text-primary text-center">&#x20A6; {orderRevenue}</h1>
            </div>
          </div>
          <div className="card shadow-sm">
            <div className="card-body">
              <p className="card-title text-uppercase">total orders</p>
              <h1 className="display-4 text-primary text-center">{this.ordersCount(filterContent(orders))}</h1>
            </div>
          </div>
          <div className="card shadow-sm">
            <div className="card-body">
              <p className="card-title text-uppercase">average product price</p>
              <h1 className="display-4 text-primary text-center">
                &#x20A6;
                {store && store.products === undefined
                  ? 0
                  : this.averageProductPrice(filterContent(store.products))}
              </h1>
            </div>
          </div>

          <div className="card shadow-sm">
            <div className="card-body w-100 p-3" style={{ maxHeight: '75vh' }}>
              <p className="card-title text-uppercase">revenue over time</p>

              <ContainerDimensions>
                {({ height, width }) => (filterContent(orders).length < 1 ? (
                    <>No products purchased yet</>
                ) : (
                    <LineChart
                      data={this.timeRevenue(filterContent(orders))}
                      width={width * 0.95}
                      height={height * 0.8}
                    />
                ))
                }
              </ContainerDimensions>
            </div>
          </div>

          <div className="card shadow-sm">
            <div className="card-body w-100 p-3" style={{ maxHeight: '75vh' }}>
              <p className="card-title text-uppercase">revenue per product</p>
              <ContainerDimensions>
                {({ height, width }) => (filterContent(orders).length < 1 ? (
                    <>No products purchased yet</>
                ) : (
                    <BarChart
                      data={this.productRevenue(filterContent(orders))}
                      width={width * 0.95}
                      height={height * 0.8}
                    />
                ))
                }
              </ContainerDimensions>
            </div>
          </div>
        </>,
        <>
          <div className="card shadow-sm">
            <div className="card-body">
              <p className="card-title text-uppercase">total customers</p>
              <h1 className="display-4 text-primary text-center">{customers}</h1>
            </div>
          </div>
          <div className="card shadow-sm">
            <div className="card-body">
              <p className="card-title text-uppercase">average customer spend</p>
              <h1 className="display-4 text-primary text-center">
                {' '}
                &#x20A6; {customers === 0 ? 0 : orderRevenue / customers}
              </h1>
            </div>
          </div>

          <div className="card shadow-sm">
            <div className="card-body w-100 p-3" style={{ maxHeight: '75vh' }}>
              <p className="card-title text-uppercase">revenue per customer</p>
              <ContainerDimensions>
                {({ height, width }) => (paidOrders.length < 1 ? (
                    <>No products purcahsed yet</>
                ) : (
                    <PieChart
                    data={[customerOrders, uniqueCustomerNames]}
                    width={width * 0.95}
                    height={height * 0.8} />
                ))
                }
              </ContainerDimensions>
            </div>
          </div>

          {/* <div className="card shadow-sm">
            <div className="card-body w-100 p-3" style={{ maxHeight: "75vh" }}>
              <p className="card-title text-uppercase">
                new vs. returning customers
              </p>
              <ContainerDimensions>
                {({ height, width }) => (
                  <MultiLineChart
                    datas={[data[0], data[1]]}
                    width={width * 0.95}
                    height={height * 0.8}
                  />
                )}
              </ContainerDimensions>
            </div>
          </div> */}
        </>
    ];

    return (
      <div className="p-5 mt-5">
        <ul className="nav nav-test nav-tabs" id="myTab" role="tablist">
          {renderTabList(tablist, 'analytics')}
        </ul>
        <div className="tab-content" id="analyticsTabContent">
          {this.renderTabListBody(tablist, content)}
        </div>
      </div>
    );
  }
}

class Messages extends Component {
  render = () => {
    const chatFields = [
      {
        desc: 'message',
        placeholder: 'Type a message',
        varClass: 'input',
        className: 'mx-4 py-4',
        type: 'text',
        options: [],
        icon: 0
      }
    ];
    const chatButtons = [];

    return (
      <div className="py-5  mx-0 mt-5 h-100 message-div">
        <div className="p-0 position-relative h-100">
          <div className="my-3 px-4 px-md-5">
            {/* <div className="rounded-circle float-left mr-3 img-holder img-holder-user">
              <img
                src="./img/login/login.jpg"
                className="rounded-circle"
                width="50"
                height="50"
                alt=""
              />
            </div> */}
            <div className="float-left p-3 bg-white shadow-sm">
              Hello
              <br />I am your assistant
            </div>
            <div className="clear"></div>
          </div>
          <div className="my-3 px-4 px-md-5">
            {/* <div className="rounded-circle float-right ml-3 img-holder img-holder-user">
              <img
                src="./img/login/login.jpg"
                className="rounded-circle"
                width="50"
                height="50"
                alt=""
              />
            </div> */}
            <div className=" float-right p-3 bg-white shadow-sm">
              Hello
              <br />I am your assistant
            </div>
            <div className="clear"></div>
          </div>
          <div className="position-absolute chat-form-holder bg-white shadow">
            <div className="position-relative">
              <BenshadaForm
                form={'form-chat'}
                onSubmitForm={() => {}}
                className="form py-0"
                fields={chatFields}
                buttons={chatButtons}
                initialValues={{}}
              />
              <p className="px-4">
                <small>
                  Press enter to send your message.
                  <br />
                  Hold down <em>Shift</em> and press Enter to go to the next line
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// class Notifications extends Component {
//   render() {
//     let list = [
//       {
//         icon: "far fa-user",
//         Title: "Paul",
//         message: "I am happy to be at Benshada"
//       },
//       {
//         icon: "fas fa-box",
//         Title: "James",
//         message: "I am happy to be at Benshada"
//       },
//       {
//         icon: "fas fa-shopping-bag",
//         Title: "Yinka",
//         message: "I am happy to be at Benshada"
//       },
//       {
//         icon: "fas fa-chart-pie",
//         Title: "Benjamin",
//         message: "I am happy to be at Benshada"
//       },
//       {
//         icon: "far fa-bell",
//         Title: "Tayo",
//         message: "I am happy to be at Benshada"
//       }
//     ];
//     return (
//       <div className="row h-100">
//         <DashNav list={list} user={""} className="bg-white" />
//         <DashBody list={list} store={"hello"} />
//       </div>
//     );
//   }
// }

// eslint-disable-next-line no-class-assign
Profile = connect(null, {
  userUpdateProfile,
  storeUpdateInfo,
  storeUpdateBank,
  orderCancel
})(Profile);

export {
  Profile, Products, Orders, Saved, Analytics, Messages
};
