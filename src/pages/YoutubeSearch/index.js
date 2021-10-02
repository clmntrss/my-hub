import React from 'react';
import useDocumentTitle from '@rehooks/document-title';

function YoutubeSearch() {
  useDocumentTitle('clmntrss | Youtube Search');


  return (
    <div className="test">
      <button>Search video</button>
    </div>
  );
}

export default YoutubeSearch;
