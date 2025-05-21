import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../utils/cropImage";
import { Slider } from "@mui/material";

export default function CustomFrameModal({ open, onClose, frameSrc }) {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImg = await getCroppedImg(imageSrc, croppedAreaPixels);
      setCroppedImage(croppedImg);
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels]);

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", () => setImageSrc(reader.result));
      reader.readAsDataURL(file);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4"
      onClick={onClose} // klik luar modal tutup
    >
      <div
        className="bg-white rounded-lg max-w-md w-full p-6 relative"
        onClick={(e) => e.stopPropagation()} // cegah klik modal men-trigger close
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl font-bold"
        >
          ×
        </button>
        <h2 className="text-xl font-semibold mb-4">Custom Foto Bingkai</h2>
        Keren!
        <input type="file" accept="image/*" onChange={onFileChange} />
        {imageSrc && (
          <div className="relative w-[300px] h-[360px] mx-auto">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={4 / 5}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              cropShape="rect"
              showGrid={false}
              className="cropper-container"
            />
            <img
              src={frameSrc}
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
              alt="Frame"
            />
          </div>
        )}
        {imageSrc && (
          <div className="w-[300px] mx-auto mt-4">
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              onChange={(e, z) => setZoom(z)}
            />
            <button
              onClick={showCroppedImage}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded w-full"
            >
              Crop & Save
            </button>
          </div>
        )}
        {croppedImage && (
          <div className="mt-4 text-center">
            <h2>Hasil Crop:</h2>
            <img
              src={croppedImage}
              alt="Cropped"
              className="border mt-2 inline-block"
            />
          </div>
        )}
      </div>
    </div>
  );
}
