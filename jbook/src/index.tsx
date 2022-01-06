import ReactDOM from 'react-dom';

import CodeUnit from './components/code-unit';

import 'bulmaswatch/superhero/bulmaswatch.min.css';

const App = () => {
  return (
    <div>
      <CodeUnit />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
