import React, { useState } from "react";

export default function FrameWithPhoto() {
  const [photo, setPhoto] = useState(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result);
    reader.readAsDataURL(file);
  };

  const frameWidth = 388;
  const frameHeight = 483;

  const userPhotoWidth = 310;
  const userPhotoHeight = 404;

  const userPhotoLeft = (frameWidth - userPhotoWidth) / 2;
  const userPhotoTop = (frameHeight - userPhotoHeight) / 2;

  // Skala ukuran, ubah 0.5 jadi angka lain sesuai mau sekecil apa
  const scale = 0.5;

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h2 className="text-xl font-semibold">Masukkan Foto ke Bingkai</h2>

      <input type="file" accept="image/*" onChange={handleUpload} />

      <div
        className="relative bg-gray-200"
        style={{
          width: frameWidth * scale,
          height: frameHeight * scale,
        }}
      >
        {photo ? (
          <img
            src={photo}
            alt="User"
            style={{
              position: "absolute",
              width: userPhotoWidth * scale,
              height: userPhotoHeight * scale,
              left: userPhotoLeft * scale,
              top: userPhotoTop * scale,
              objectFit: "cover",
              zIndex: 10,
            }}
          />
        ) : (
          <div className="absolute left-0 top-0 w-full h-full flex items-center justify-center bg-gray-300 text-gray-500">
            Upload Foto
          </div>
        )}

        <img
          src="/images/frame123.png"
          alt="Frame"
          className="absolute"
          style={{
            width: frameWidth * scale,
            height: frameHeight * scale,
          }}
        />
      </div>
    </div>
  );
}
