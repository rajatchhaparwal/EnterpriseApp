import React from 'react';
import { Navigate } from 'react-router-dom';

// Cart is removed for affiliate marketing
export default function Cart() {
  return <Navigate to="/" replace />;
}
