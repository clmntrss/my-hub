import React from 'react';
import useDocumentTitle from '@rehooks/document-title';

function LibraryGenesis() {
  useDocumentTitle('clmntrss | LibraryGenesis');

  const test = () => {
    console.log('test');
    fetch('/download?URL=https://youtu.be/wizpDlxAzQs', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({
        payment_intent_id: 'issou',
      }),
    });
  };
  return (
    <div className="test">
      <button onClick={test}>test</button>
    </div>
  );
}

export default LibraryGenesis;
