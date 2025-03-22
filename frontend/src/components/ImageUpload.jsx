import { useState, useCallback, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCamera, FaCloudUploadAlt, FaSpinner, FaCheck, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';
import PlantDetails from './PlantDetails';

const ImageUpload = () => {
  const [searchParams] = useSearchParams();
  const [showCamera, setShowCamera] = useState(searchParams.get('camera') === 'true');
  const videoRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
    setError(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {'image/*': []},
    maxFiles: 1
  });

  useEffect(() => {
    if (showCamera) {
      startCamera();
    }
    return () => {
      stopCamera();
    };
  }, [showCamera]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Camera access denied');
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
      canvas.toBlob(blob => {
        setSelectedFile(blob);
        setPreview(URL.createObjectURL(blob));
      });
      setShowCamera(false);
    }
  };

  const handleSubmit = async (event) => {
    event?.preventDefault();
    if (!selectedFile) {
      toast.error('Please select an image first');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    setLoading(true);
    setError(null);

    const uploadPromise = axios.post('http://localhost:5000/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    toast.promise(uploadPromise, {
      loading: 'Analyzing plant...',
      success: 'Plant identified successfully!',
      error: 'Failed to identify plant',
    });

    try {
      const response = await uploadPromise;
      setResult(response.data);
    } catch (error) {
      console.error('Error:', error);
      setError(error.response?.data?.details || 'Failed to process image');
      toast.error(error.response?.data?.details || 'Failed to process image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-xl mx-auto p-6"
    >
      {showCamera ? (
        <div className="relative">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full rounded-lg"
          />
          <button
            onClick={capturePhoto}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-green-600 p-4 rounded-full shadow-lg hover:bg-green-50"
          >
            <FaCamera className="text-2xl" />
          </button>
        </div>
      ) : (
        <div 
          {...getRootProps()} 
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${isDragActive ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-green-500'}`}
        >
          <input {...getInputProps()} />
          <FaCloudUploadAlt className="mx-auto text-4xl text-green-500 mb-4" />
          {isDragActive ? (
            <p className="text-green-600">Drop the image here...</p>
          ) : (
            <p className="text-gray-600">Drag & drop an image here, or click to select</p>
          )}
        </div>
      )}
      
      {preview && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6"
        >
          <img 
            src={preview} 
            alt="Preview" 
            className="max-h-64 mx-auto rounded-lg shadow-md"
          />
        </motion.div>
      )}

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={!selectedFile || loading}
        onClick={handleSubmit}
        className={`w-full mt-6 py-3 px-4 rounded-lg flex items-center justify-center gap-2
          ${loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'} text-white transition-colors`}
      >
        {loading ? (
          <><FaSpinner className="animate-spin" /> Processing...</>
        ) : (
          <><FaCheck /> Identify Plant</>
        )}
      </motion.button>

      {error && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-2"
        >
          <FaTimes /> {error}
        </motion.div>
      )}

      {result && !error && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mt-6"
        >
          <PlantDetails data={result.description} />
        </motion.div>
      )}

      <button
        onClick={() => setShowCamera(!showCamera)}
        className="mt-4 text-green-600 hover:text-green-700 flex items-center gap-2"
      >
        {showCamera ? <FaCloudUploadAlt /> : <FaCamera />}
        {showCamera ? 'Switch to Upload' : 'Switch to Camera'}
      </button>
    </motion.div>
  );
};

export default ImageUpload;
