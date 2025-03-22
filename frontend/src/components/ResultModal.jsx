import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import Modal from './Modal';
import PlantDetails from './PlantDetails';

const ResultModal = ({ isOpen, onClose, result }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <FaCheckCircle className="text-green-500 text-2xl" />
          <h2 className="text-2xl font-bold">Plant Analysis Results</h2>
        </div>
        {result && <PlantDetails data={result.description} />}
      </div>
    </Modal>
  );
};

export default ResultModal;
