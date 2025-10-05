"use client";

/**
 * @file src/components/CodeBlock.tsx
 * @description Code block for writing source code and highlighting.
 *
 * @author TheDevMystic (Surya)
 */

import React, { useEffect, useRef } from 'react';
import Prism from 'prismjs';

/**
 * @interface CodeBlockProps
 * @description Props for a component that displays a block of source code.
 * Used for render and highlight code syntax.
 */
interface CodeBlockProps {
  /**
   * @property {string} code - The raw source code to be displayed.
   */
  code: string;

  /**
   * @property {string} language - The programming language of the code.
   * Used for syntax highlighting library (Prism).
   */
  language: string;
}

/**
 * @function CodeBlock
 * @description Renders code.
 *
 * @param {CodeBlockProps} props - The property object of the component.
 *
 * @returns {JSX.Element} A code block section.
 */
const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  // Create a ref for code element.
  const codeRef = useRef<HTMLElement>(null);
  
  // Re-highlight when component mounts or changes.
  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code, language]);

  return (
    <pre className={`language-${language} line-numbers line-highlight match-braces`} data-language={language}>
      <code ref={codeRef} className={`language-${language}`}>
        {code}
      </code>
    </pre>
  );
};

export default CodeBlock;
