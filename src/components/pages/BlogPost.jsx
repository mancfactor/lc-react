import React from 'react';
import { useParams } from 'react-router-dom';

export default function BlogPost() {
  const params = useParams();

  return (
    <div className="container">
      <h1>Blog Posts {params.id}</h1>
    </div>
  );
}
