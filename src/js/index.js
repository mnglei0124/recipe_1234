require("@babel/polyfill");
import Search from "./model/Search";
import { elements, renderLoader, clearLoader } from "./view/base";
import * as searchView from "./view/searchView";

const state = {};
const controlSearch = async () => {
  //Web-s hailtiin tulhuur gargaj ugnu
  const query = searchView.getInput();

  if (query) {
    //Shineer hailtiin object gargaj ugnu
    state.search = new Search(query);

    //Hailt hiihed zoriulj delgetsend UI beltgene
    searchView.clearSearchQuery();
    searchView.clearSearchResult();
    renderLoader(elements.searchResultDiv);

    //Hailt hiine
    await state.search.doSearch();

    //Hailtiin ur dung uzuulne
    clearLoader();
    if (state.search.result === undefined) alert("Not Found");
    else searchView.renderRecipes(state.search.result);
  }
};

elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});
