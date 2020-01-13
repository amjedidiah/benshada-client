import React, { Component } from "react";
import "./MultiSelect.css";

export default class MultiSelect extends Component {
  cardSelect = () => {
    let element = [...window.event.target.classList].includes("card-select")
      ? window.event.target
      : window.event.target.parentElement;

    element.classList.toggle("active");

    console.log(element);
  };

  renderOptionsElement = ({ name, src }) =>
    src === undefined ? (
      <p className="text-capitalize flex-grow-1 mb-0">{this.spaceText(name)}</p>
    ) : (
      <img
        src={src}
        width="100"
        className="img-fluid flex-grow-1"
        alt="delivery_option"
      />
    );

  renderAvailableOptions = options =>
    options.map((option, i) => (
      <div
        className="card card-select p-2 shadow-sm"
        onClick={() => this.cardSelect()}
        key={i}
      >
        {this.renderOptionsElement(option)}
      </div>
    ));

  renderSelectedOptionsDeleteBtn = () => (
    <i className="fa fa-times text-danger float-right pt-4"></i>
  );

  renderSelectedOptions = options =>
    options.map((option, i) => (
      <div className="card p-2 shadow-sm" key={i}>
        <div className="d-flex">
          {this.renderOptionsElement(option)}
          {this.renderSelectedOptionsDeleteBtn()}
        </div>
      </div>
    ));

  spaceText = text => text;

  render() {
    let { props, spaceText } = this,
      { title, selectedOptions, availableOptions } = props,
      spacedTitle = spaceText(title);

    return (
      <>
        <h4 className="mt-5 pt-5 text-capitalize">{spacedTitle}</h4>
        <div className="card-columns card-columns-multiselect mt-4">
          {this.renderSelectedOptions(selectedOptions)}
        </div>
        <span
          className="pointer"
          data-toggle="modal"
          data-target={`#${title}Modal`}
        >
          Edit options
        </span>

        <div
          className="modal fade"
          id={`${title}Modal`}
          tabIndex="-1"
          role="dialog"
          aria-labelledby={`${title}ModalLabel`}
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5
                  className="modal-title font-weight-light text-capitalize"
                  id={`${title}ModalLabel`}
                >
                  {spacedTitle}
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
                <p>Select your {spacedTitle}</p>
                <div className="card-columns">
                  {this.renderAvailableOptions(availableOptions)}
                </div>
                <button className="btn btn-primary float-right">Submit</button>
                <div className="clear"></div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
