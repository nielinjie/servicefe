import React, { FC } from 'react';
import * as ReactDOM from 'react-dom';
import { createClient, Provider } from 'urql';
import { Home } from './home';
import './index.css';

const client = createClient({
  url: 'http://localhost:9000/graphql',
});

export const App: FC = () => (
  <Provider value={client}>
    <main>
      <h1>Issues</h1>
      <Home />
    </main>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
