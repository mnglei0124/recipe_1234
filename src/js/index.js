require("@babel/polyfill");
import Search from "./model/Search";
import { elements, renderLoader, clearLoader } from "./view/base";
import * as searchView from "./view/searchView";
import Recipe from "./model/Recipe";

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

elements.pageButtons.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-inline");

  if (btn) {
    const gotoPageNumber = parseInt(btn.dataset.goto, 10);
    searchView.clearSearchResult();
    searchView.renderRecipes(state.search.result, gotoPageNumber);
  }
});

const controlRecipe = async () => {
  // 1) get ID from URL
  const id = window.location.hash.replace("#", "");
  console.log(id);
  // 2) create the model of Recipe
  state.recipe = new Recipe(id);
  // 3) prepare UI screen
  // 4) download Recipes
  await state.recipe.getRecipe();
  // 5) estimate time and ingredients of a Recipe
  state.recipe.calcTime();
  state.recipe.calcHuniiToo();
  // 6) print Recipe on the screen
  console.log(state.recipe);
};
window.addEventListener("hashchange", controlRecipe);
