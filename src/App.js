import React, { useState, useEffect } from 'react';

import './styles.css';

import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, []);

  async function handleAddRepository() {
    const repository = {
      title: `Title Project ${Date.now()}`,
      url: 'http://new_project.com',
      techs: ['NodeJs', 'ReactJs', 'React Native'],
    };

    const response = await api.post('repositories', repository);

    setRepositories((prevState) => [...prevState, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)

    setRepositories(repositories.filter(re => re.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
