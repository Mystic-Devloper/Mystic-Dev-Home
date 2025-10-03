import React, { useEffect } from 'react';
import Prism from 'prismjs';

interface CodeBlockProps {
  code: string;
  language: string;
}

const useToolbarCopy = () => {
  useEffect(() => {
    if (!Prism.plugins.toolbar) return;

    Prism.plugins.toolbar.registerButton('copy-to-clipboard', (env) => {
      const button = document.createElement('button');
      button.className = 'copy-button';
      button.addEventListener('click', () => {
        navigator.clipboard.writeText(env.code).then(() => {
          button.classList.add('copied');
          setTimeout(() => button.classList.remove('copied'), 1500);
        });
      });
      return button;
    });
  }, []);
};


const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  useToolbarCopy();

  useEffect(() => {
    Prism.highlightAll(); // highlight after component mounts
  }, [code]);

  return (
    <pre className={`language-${language} line-numbers`} data-language={language}>
      <code className={`language-${language}`}>{code}</code>
    </pre>
  );
};

export default CodeBlock;
