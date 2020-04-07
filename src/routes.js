const express = require("express");
const routes = express.Router();
const RepositoriesController = require("./controllers/RepositoriesController");

const resources = {
  products: "/repositories"
};

routes.get(resources.products, RepositoriesController.list);
routes.post(resources.products, RepositoriesController.create);
routes.put(`${resources.products}/:id`, RepositoriesController.update);
routes.delete(`${resources.products}/:id`,RepositoriesController.delete);
routes.post(`${resources.products}/:id/like`,RepositoriesController.like);
module.exports = routes;