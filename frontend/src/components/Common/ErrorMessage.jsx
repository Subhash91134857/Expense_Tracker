import React from "react";
import {AlertCircle,X} from 'lucide-react'

const ErrorMessage = ({ message, onDismiss }) => {
  return (
    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 flex justify-between items-center">
      <div className="flex items-center">
        <AlertCircle size={16} className="mr-2" />
        <span>{message}</span>
      </div>
      {onDismiss && (
        <button onClick={onDismiss} className="text-red-500 hover:text-red-700">
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
