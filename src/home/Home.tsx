import React from 'react';
import Welcome from './Welcome';

const Home: React.FC = () => {
  return (
    <div>Home
      <button type="button" className="btn btn-primary">Primary</button>
        <Welcome />
    </div>
  );
}

export default Home;
