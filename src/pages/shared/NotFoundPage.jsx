import React from 'react';
import Button from '../../components/common/Button';

const NotFoundPage = ({ onNavigate }) => (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <h2 className="text-3xl font-semibold mt-4">Page Not Found</h2>
        <p className="text-gray-600 mt-2">The page you are looking for does not exist.</p>
        <Button onClick={() => onNavigate('/')} className="mt-8">
            Go to Homepage
        </Button>
    </div>
);

export default NotFoundPage;