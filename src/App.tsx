import React from 'react';
import { Button } from 'antd';
import Main from './routes/Main';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div >
      <Switch>
        <Route path='/' component={Main} />
      </Switch>
    </div>
  );
}

export default App;
