'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
// Using Unicode icons instead of Heroicons for compatibility
import { UserDocuments, UploadedDocument, documentTypes } from '../data/userProfileData';

interface DocumentUploadSectionProps {
  documents: UserDocuments;
  onUpload: (documentType: string, file: File) => Promise<void>;
  onDelete: (documentType: string) => void;
}

const DocumentUploadSection: React.FC<DocumentUploadSectionProps> = ({ 
  documents, 
  onUpload, 
  onDelete 
}) => {
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [uploadErrors, setUploadErrors] = useState<{ [key: string]: string }>({});
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const simulateUpload = (file: File, docType: string) => {
    const documentType = documentTypes.find(dt => dt.id === docType);
    if (!documentType) {
      return 'Document type not found';
    }

    // Check file size
    if (file.size > documentType.maxSize) {
      return `File size must be less than ${(documentType.maxSize / (1024 * 1024)).toFixed(1)}MB`;
    }

    // Check file type
    if (!documentType.acceptedFormats.includes(file.type)) {
      return `File type not supported. Accepted formats: ${documentType.acceptedFormats.join(', ')}`;
    }

    return null;
  };

  const handleFileSelect = (documentType: { id: string; name: string; description: string; required: boolean; acceptedFormats: string[]; maxSize: number; }, file: File) => {
    const error = simulateUpload(file, documentType.id);
    if (error) {
      setUploadErrors(prev => ({ ...prev, [documentType.id]: error }));
      return;
    }

    setUploadErrors(prev => ({ ...prev, [documentType.id]: '' }));
    setUploadProgress(prev => ({ ...prev, [documentType.id]: 0 }));

    try {
      onUpload(documentType.id, file);
    } catch (error) {
      setUploadErrors(prev => ({ 
        ...prev, 
        [documentType.id]: 'Upload failed. Please try again.' 
      }));
    } finally {
      setUploadProgress(prev => ({ ...prev, [documentType.id]: 100 }));
    }
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const documentType = documentTypes.find(dt => dt.id === event.target.name);
      if (documentType) {
        handleFileSelect(documentType, file);
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const target = event.target as HTMLElement;
      const docTypeId = target.getAttribute('data-document-type');
      const documentType = documentTypes.find(dt => dt.id === docTypeId);
      if (documentType) {
        handleFileSelect(documentType, file);
      }
    }
  };

  const getVerificationStatusInfo = (status: string) => {
    switch (status) {
      case 'verified':
        return {
          icon: <div className="text-lg">✅</div>,
          text: 'Verified',
          color: 'text-green-400 bg-green-500/20 border-green-500/30'
        };
      case 'pending':
        return {
          icon: <div className="text-lg">⏳️</div>,
          text: 'Under Review',
          color: 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30'
        };
      case 'rejected':
        return {
          icon: <div className="text-lg">⚠️</div>,
          text: 'Rejected',
          color: 'text-red-400 bg-red-500/20 border-red-500/30'
        };
      default:
        return {
          icon: <div className="text-lg">📄</div>,
          text: 'Not Uploaded',
          color: 'text-gray-400 bg-gray-500/20 border-gray-500/30'
        };
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getUploadedDocument = (documentTypeId: string): UploadedDocument | undefined => {
    return documents[documentTypeId as keyof UserDocuments];
  };

  return (
    <motion.div
      className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-green-500/20 rounded-lg">
          <div className="text-lg">📄</div>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">Document Upload</h2>
          <p className="text-sm text-gray-400">Upload required documents for verification</p>
        </div>
      </div>

      {/* Upload Guidelines */}
      <div className="mb-6 p-4 bg-blue-500/20 border border-blue-500 rounded-lg">
        <h3 className="font-semibold text-blue-400 mb-2">📋 Upload Guidelines</h3>
        <div className="text-sm text-gray-300 space-y-1">
          <div>• Maximum file size: 5MB per document</div>
          <div>• Accepted formats: PDF, JPG, PNG</div>
          <div>• Ensure documents are clear and readable</div>
          <div>• All information must be visible and unobstructed</div>
        </div>
      </div>

      {/* Document Upload Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {documentTypes.map((documentType) => {
          const uploadedDoc = getUploadedDocument(documentType.id);
          const isUploading = uploadProgress[documentType.id] !== undefined;
          const error = uploadErrors[documentType.id];
          const verificationInfo = getVerificationStatusInfo(uploadedDoc?.verificationStatus || 'not_uploaded');

          return (
            <motion.div
              key={documentType.id}
              className="bg-gray-900/50 rounded-lg p-6 border border-gray-700"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {/* Document Type Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-white mb-1">
                    {documentType.name}
                    {documentType.required && <span className="text-red-400 ml-1">*</span>}
                  </h3>
                  <p className="text-sm text-gray-400">{documentType.description}</p>
                </div>
                <div className={`px-2 py-1 rounded-lg text-xs ${verificationInfo.color}`}>
                  <div className="flex items-center space-x-1">
                    {verificationInfo.icon}
                    <span>{verificationInfo.text}</span>
                  </div>
                </div>
              </div>

              {/* Upload Area or Document Info */}
              {uploadedDoc ? (
                <div className="space-y-4">
                  {/* Uploaded Document Info */}
                  <div className="p-4 bg-gray-800 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="text-xl">📄</div>
                        <div>
                          <p className="font-medium text-white">{uploadedDoc.fileName}</p>
                          <p className="text-sm text-gray-400">
                            {formatFileSize(uploadedDoc.fileSize)} • 
                            Uploaded {new Date(uploadedDoc.uploadDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {uploadedDoc.previewUrl && (
                          <button className="p-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-colors">
                            <div className="text-sm">👁️</div>
                          </button>
                        )}
                        <button
                          onClick={() => onDelete(documentType.id)}
                          className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
                        >
                          <div className="text-sm">🗑️</div>
                        </button>
                      </div>
                    </div>
                    
                    {uploadedDoc.verificationStatus === 'rejected' && (
                      <div className="mt-3 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                        <p className="text-sm text-red-400">
                          Document was rejected. Please upload a clearer version or ensure all information is visible.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Replace Document Button */}
                  <button
                    onClick={() => fileInputRefs.current[documentType.id]?.click()}
                    disabled={isUploading}
                    className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-700/50 text-white rounded-lg transition-colors text-sm"
                  >
                    Replace Document
                  </button>
                </div>
              ) : (
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    isUploading 
                      ? 'border-blue-500 bg-blue-500/10' 
                      : 'border-gray-600 hover:border-gray-500 hover:bg-gray-800/50'
                  }`}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e)}
                  data-document-type={documentType.id}
                >
                  {isUploading ? (
                    <div className="space-y-2">
                      <div className="text-4xl mb-2">⏳️</div>
                      <p className="text-blue-400 font-medium">Uploading...</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="text-4xl mb-2">☁️</div>
                      <div>
                        <p className="text-white font-medium mb-1">Drop your file here</p>
                        <p className="text-sm text-gray-400">or click to browse</p>
                      </div>
                      <button
                        onClick={() => fileInputRefs.current[documentType.id]?.click()}
                        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors text-sm"
                      >
                        Choose File
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Error Message */}
              {error && (
                <motion.div
                  className="mt-3 p-3 bg-red-500/20 border border-red-500/30 rounded-lg"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <p className="text-sm text-red-400">{error}</p>
                </motion.div>
              )}

              {/* File Format Info */}
              <div className="mt-4 text-xs text-gray-500">
                Max {(documentType.maxSize / (1024 * 1024)).toFixed(1)}MB • {
                  documentType.acceptedFormats.map(format => 
                    format.split('/')[1].toUpperCase()
                  ).join(', ')
                }
              </div>

              {/* Hidden File Input */}
              <input
                ref={(el) => fileInputRefs.current[documentType.id] = el}
                type="file"
                accept={documentType.acceptedFormats.join(',')}
                onChange={(e) => handleFileInputChange(e)}
                name={documentType.id}
                className="hidden"
              />
            </motion.div>
          );
        })}
      </div>

      {/* Security Notice */}
      <motion.div
        className="mt-6 p-4 bg-gray-900/50 border border-gray-600 rounded-lg"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <h4 className="font-semibold text-gray-300 mb-2">🔒 Security & Privacy</h4>
        <div className="text-sm text-gray-400 space-y-1">
          <div>• All documents are encrypted and stored securely</div>
          <div>• Your information is only used for verification purposes</div>
          <div>• Documents are automatically deleted after verification</div>
          <div>• We comply with international data protection standards</div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DocumentUploadSection;
