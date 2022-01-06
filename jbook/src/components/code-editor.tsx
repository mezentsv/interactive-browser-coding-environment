import { useRef } from 'react';
import MonacoEditor, { OnMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import Highlighter from 'monaco-jsx-highlighter';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';

import './code-editor.css';
import './syntax.css';

type CodeEditorProps = {
  value: string;
  onChange(value: string): void;
};

const babelParse = (code: string) =>
  parse(code, {
    sourceType: 'module',
    plugins: ['jsx'],
  });

const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange }) => {
  const editorRef = useRef<any>();

  const onEditorMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    editor.getModel()?.updateOptions({ tabSize: 2 });

    const highlighter = new Highlighter(monaco, babelParse, traverse, editor);
    highlighter.highLightOnDidChangeModelContent(
      0,
      () => {},
      () => {},
      undefined,
      () => {}
    );
  };

  const onFormatClick = () => {
    // get current value from the editor
    const unformatted = editorRef.current.getModel().getValue();

    // format the value
    const formatted = prettier
      .format(unformatted, {
        parser: 'babel',
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, '');

    // set the formatted value back in the editor
    editorRef.current.setValue(formatted);
  };

  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={onFormatClick}
      >
        Format
      </button>
      <MonacoEditor
        value={value}
        onChange={(val) => val && onChange(val)}
        onMount={onEditorMount}
        language="javascript"
        theme="vs-dark"
        height="100%"
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
