import React, { Component } from 'react';
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default class VirtualAssistant extends Component {
  // toggleVirtualAssistant = () => {
  //   let e = window.event.target;
  //   e = [...e.classList].includes('fas') ? e : e.querySelector('i');

  //   $('#vAssistAlert').toggle();

  //   e.classList.toggle('fa-question');
  //   e.classList.toggle('fa-times');
  // }

  render() {
    return (
      <>
        <div className="container">
          <div className="row">
            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3 d-fixed v-assist p-0 shadow"
              role="alert"
              id="vAssistAlert"
            >
              <header className="bg-primary py-2 px-3 text-white">
                <h4 className="float-left mb-0">Assistant</h4>
                <div className="clear"></div>
              </header>
              <section className="p-3 bg-light">
                <div className="my-3">
                  <div className="rounded-circle float-left pr-3">
                    <img src="./img/login/login.jpg" className="rounded-circle" width="50" height="50" alt="" />
                  </div>
                  <div className="float-left p-3 bg-white shadow-sm">
                    Hello
                    <br />I am your assistant
                  </div>
                  <div className="clear"></div>
                </div>
                <div className="my-3">
                  <div className="float-right p-3 bg-white shadow-sm">
                    Hello
                    <br />I am your assistant
                  </div>
                  <div className="rounded-circle float-right pr-3">
                    <img src="./img/login/login.jpg" className="rounded-circle" width="50" height="50" alt="" />
                  </div>
                  <div className="clear"></div>
                </div>
              </section>
              <footer>
                <form className="" action="">
                  <div className="input-group flex-grow-1">
                    <input
                      className="form-control border-top-0 border-right-0 border-left-0 rounded-0 p-3"
                      placeholder="New Message"
                      aria-label="New Message"
                    />
                    <div className="input-group-append">
                      <span className="input-group-text bg-white border-0" id="basic-addon2">
                        <FontAwesomeIcon className="text-primary pointer" id="showSearchBar" icon={faSearch} />
                      </span>
                    </div>
                  </div>
                </form>
              </footer>
            </div>
          </div>
        </div>

        {/* <div
          onClick={this.toggleVirtualAssistant}
          className="btn btn-primary d-fixed rounded-circle"
          id="questionMark"
        >
          <i className="fas fa-question"></i>
        </div> */}
      </>
    );
  }
}
