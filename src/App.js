import React, {useEffect, useState} from "react";

import "./styles.css";
import api from "./services/api";

function App() {

  const [repositories, setRepositories] = useState([])

  useEffect(() => {

    api.get('repositories').then(({ data }) => {
      console.log("data: ", data)
      setRepositories(data);
    });

  }, []);

  async function handleAddRepository() {

    api.post('repositories', {
      title: "App Mobile",
      url: "http://github.com/app-mobile",
      techs: ["NodeJS", "React Native"]
    }).then(({ data }) => {

      setRepositories([ ...repositories, data ])
    });

  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(() => {
      const newRepositories = [...repositories];
      const removedRepositoryIndex = repositories.findIndex(repository => repository.id === id);
      newRepositories.splice(removedRepositoryIndex, 1);

      setRepositories(newRepositories);
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
