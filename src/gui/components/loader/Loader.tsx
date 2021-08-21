import React from 'react';
import { Spinner } from 'reactstrap';
import './css/Loader.css'

export default function Loader() {
  return (
    <div className="spinner">
      <Spinner size="xl" color="primary"> </Spinner>
    </div>
  );
}
