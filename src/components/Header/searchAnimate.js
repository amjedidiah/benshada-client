const searchAnimate = () => {
  document.querySelector("#showSearchBar").addEventListener("click", () => {
    if (
      document.querySelector(".search-bar").value === "" &&
      window.innerWidth > 768
    ) {
      document.querySelector(".search-bar").classList.toggle("invisible");
    }
  });
};

export default searchAnimate;
