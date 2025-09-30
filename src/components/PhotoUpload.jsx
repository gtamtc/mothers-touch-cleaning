import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, AlertCircle, CheckCircle } from 'lucide-react';

const PhotoUpload = ({ onPhotosUploaded, backendUrl = 'https://lnh8imcwv80g.manus.space' }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    
    // Validar arquivos
    const validFiles = files.filter(file => {
      const isImage = file.type.startsWith('image/');
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB
      return isImage && isValidSize;
    });

    if (validFiles.length !== files.length) {
      setUploadStatus({
        type: 'warning',
        message: 'Alguns arquivos foram ignorados (apenas imagens até 10MB são aceitas)'
      });
    }

    // Criar previews
    const fileWithPreviews = validFiles.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      preview: URL.createObjectURL(file),
      name: file.name,
      size: file.size
    }));

    setSelectedFiles(prev => [...prev, ...fileWithPreviews]);
  };

  const removeFile = (fileId) => {
    setSelectedFiles(prev => {
      const fileToRemove = prev.find(f => f.id === fileId);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter(f => f.id !== fileId);
    });
  };

  const uploadPhotos = async () => {
    if (selectedFiles.length === 0) {
      setUploadStatus({
        type: 'error',
        message: 'Selecione pelo menos uma foto para enviar'
      });
      return;
    }

    setUploading(true);
    setUploadStatus(null);

    try {
      const formData = new FormData();
      selectedFiles.forEach(fileObj => {
        formData.append('files', fileObj.file);
      });

      const response = await fetch(`${backendUrl}/api/upload`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setUploadedPhotos(prev => [...prev, ...result.uploaded_files]);
        setSelectedFiles([]);
        
        // Limpar previews
        selectedFiles.forEach(fileObj => {
          URL.revokeObjectURL(fileObj.preview);
        });

        setUploadStatus({
          type: 'success',
          message: `${result.total_uploaded} foto(s) enviada(s) com sucesso!`
        });

        // Notificar componente pai
        if (onPhotosUploaded) {
          onPhotosUploaded(result.uploaded_files);
        }

        // Limpar input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        throw new Error(result.error || 'Erro ao enviar fotos');
      }
    } catch (error) {
      setUploadStatus({
        type: 'error',
        message: `Erro ao enviar fotos: ${error.message}`
      });
    } finally {
      setUploading(false);
    }
  };

  const removeUploadedPhoto = (photoIndex) => {
    setUploadedPhotos(prev => prev.filter((_, index) => index !== photoIndex));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Área de Upload */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          id="photo-upload"
        />
        <label htmlFor="photo-upload" className="cursor-pointer">
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-lg font-medium text-gray-700 mb-2">
            Clique para selecionar fotos
          </p>
          <p className="text-sm text-gray-500">
            Ou arraste e solte arquivos aqui
          </p>
          <p className="text-xs text-gray-400 mt-2">
            PNG, JPG, JPEG até 10MB cada • Máximo 10 fotos
          </p>
        </label>
      </div>

      {/* Status de Upload */}
      {uploadStatus && (
        <div className={`p-4 rounded-lg flex items-center space-x-2 ${
          uploadStatus.type === 'success' ? 'bg-green-50 text-green-700' :
          uploadStatus.type === 'error' ? 'bg-red-50 text-red-700' :
          'bg-yellow-50 text-yellow-700'
        }`}>
          {uploadStatus.type === 'success' ? (
            <CheckCircle className="h-5 w-5" />
          ) : (
            <AlertCircle className="h-5 w-5" />
          )}
          <span className="text-sm">{uploadStatus.message}</span>
        </div>
      )}

      {/* Preview de Arquivos Selecionados */}
      {selectedFiles.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-medium text-gray-700">
              Fotos Selecionadas ({selectedFiles.length})
            </h4>
            <button
              onClick={uploadPhotos}
              disabled={uploading}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {uploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Enviando...</span>
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  <span>Enviar Fotos</span>
                </>
              )}
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {selectedFiles.map((fileObj) => (
              <div key={fileObj.id} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={fileObj.preview}
                    alt={fileObj.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={() => removeFile(fileObj.id)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="mt-2 text-xs text-gray-600">
                  <p className="truncate">{fileObj.name}</p>
                  <p>{formatFileSize(fileObj.size)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fotos Enviadas */}
      {uploadedPhotos.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-gray-700">
            Fotos Enviadas ({uploadedPhotos.length})
          </h4>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {uploadedPhotos.map((photo, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={`${backendUrl}${photo.url}`}
                    alt={photo.original_name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={() => removeUploadedPhoto(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="mt-2 text-xs text-gray-600">
                  <p className="truncate">{photo.original_name}</p>
                  <p>{formatFileSize(photo.size)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Instruções */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <ImageIcon className="h-5 w-5 text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-700">
            <p className="font-medium mb-1">Para um orçamento mais preciso, envie fotos de:</p>
            <ul className="list-disc list-inside space-y-1 text-blue-600">
              <li>Quartos</li>
              <li>Banheiros e banheiras</li>
              <li>Sala de estar</li>
              <li>Área de jantar</li>
              <li>Cozinha</li>
              <li>Outras áreas que deseja limpar</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoUpload;

