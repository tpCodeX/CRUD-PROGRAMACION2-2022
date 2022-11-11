import { Router } from "express";
import SearchController from "../controllers/SearchController";
const routerSearch=Router();
const searchController = new SearchController();
routerSearch.get("/search",searchController.handleSearch.bind(searchController));

export default routerSearch;