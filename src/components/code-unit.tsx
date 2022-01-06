import { useState, useEffect } from 'react';

import CodeEditor from './code-editor';
import Resizable from './resizable';
import Preview from './preview';
import bundle from '../bundler';

const CodeUnit = () => {
  const [input, setInput] = useState('const a = 1;');
  const [err, setErr] = useState('');
  const [code, setCode] = useState('');

  useEffect(() => {
    const timer = setTimeout(async () => {
      const { code, error } = await bundle(input);
      setCode(code);
      setErr(error);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction="horizontal">
          <CodeEditor onChange={(value) => setInput(value)} value={input} />
        </Resizable>
        <Preview code={code} error={err} />
      </div>
    </Resizable>
  );
};

export default CodeUnit;
