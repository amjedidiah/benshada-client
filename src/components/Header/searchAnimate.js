import $ from "jquery";

const searchAnimate = () =>
  document.querySelector("#showSearchBar").addEventListener("click", () => {
    $("#searchDropDown").hide();

    return window.innerWidth > 768
      ? document.querySelector(".search-bar").classList.toggle("invisible")
      : "";
  });

export default searchAnimate;
