import { useState } from 'react';

import CodeEditor from './code-editor';
import Preview from './preview';
import bundle from '../bundler';

const CodeUnit = () => {
  const [input, setInput] = useState('const a = 1;');
  const [code, setCode] = useState('');

  const onClick = async () => {
    const output = await bundle(input);
    setCode(output);
  };

  return (
    <div>
      <CodeEditor onChange={(value) => setInput(value)} value={input} />

      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
};

export default CodeUnit;
