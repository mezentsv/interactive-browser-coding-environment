import ReactDOM from 'react-dom';

import CodeUnit from './components/code-unit';

import 'bulmaswatch/superhero/bulmaswatch.min.css';
import TextEditor from './components/text-editor';

const App = () => {
  return (
    <div>
      <TextEditor />
      {/* <CodeUnit /> */}
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
