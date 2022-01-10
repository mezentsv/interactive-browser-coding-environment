import { useState, useEffect } from 'react';

import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';
import CodeEditor from './code-editor';
import Resizable from './resizable';
import Preview from './preview';
import bundle from '../bundler';

type CodeCellProps = {
  cell: Cell;
};

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const [err, setErr] = useState('');
  const [code, setCode] = useState('');
  const { updateCell } = useActions();
  const { id, content } = cell;

  useEffect(() => {
    const timer = setTimeout(async () => {
      const { code, error } = await bundle(content);
      setCode(code);
      setErr(error);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [content]);

  return (
    <Resizable direction="vertical">
      <div
        style={{
          height: 'calc(100% - 10px)',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Resizable direction="horizontal">
          <CodeEditor
            onChange={(value) => updateCell(id, value)}
            value={content}
          />
        </Resizable>
        <Preview code={code} error={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
