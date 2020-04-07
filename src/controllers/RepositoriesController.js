const { uuid, isUuid } = require("uuidv4");
const repositories = [];

module.exports = {
  list(request, response) {
    return response.json(repositories);
  },
  create(request, response) {
    const { url, title, techs } = request.body;
    const id = uuid();
    const likes = 0;

    const repository = {
      id: id,
      title: title,
      url: url,
      techs: techs,
      likes,
    };

    repositories.push(repository);

    return response.json(repository);
  },
  update(request, response) {
    const { url, title, techs } = request.body;
    const { id } = request.params;
    const repositoryIndex = repositories.findIndex(
      (repository) => repository.id == id
    );

    if (repositoryIndex < 0 || !isUuid(id.toString())) {
      return response
        .status(400)
        .json({ error: "No repository with this ID." });
    }
    const repository = repositories[repositoryIndex];
    repositories[repositoryIndex] = {
      ...repository,
      title,
      url,
      techs,
    };

    return response.json(repositories[repositoryIndex]).status(200);
  },
  delete(request, response) {
    const { id } = request.params;
    const repositoryIndex = repositories.findIndex(
      (repository) => repository.id === id
    );

    if (repositoryIndex < 0 || !isUuid(id.toString())) {
      return response.status(400).json({ error: "Invalid repository id." });
    }
    repositories.splice(repositoryIndex, 1);

    return response.status(204).send();
  },
  like(request, response) {
    const { id } = request.params;
    const repositoryIndex = repositories.findIndex(
      (repository) => repository.id === id
    );
    if (repositoryIndex < 0 || !isUuid(id.toString())) {
      return response.status(400).json({ error: "Invalid repository id." });
    }
    const repository = repositories[repositoryIndex];
    repository.likes++;

    repositories[repositoryIndex] = {
      ...repository,
    };
    return response.json(repository);
  },
};
