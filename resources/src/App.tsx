import React from 'react';
import './App.css';
import { Button } from 'antd';
import { NavigateFunction, useNavigate } from 'react-router';

function App() {
  const navigate: NavigateFunction = useNavigate();

  const onclickSignp = () => navigate('/user/signup');
  
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Simple React App
        </p>
        <Button 
          color="primary" 
          variant="dashed" 
          size="large"
          onClick={onclickSignp}
          >
          Sign up
        </Button>
      </header>
    </div>
  );
}

export default App;
