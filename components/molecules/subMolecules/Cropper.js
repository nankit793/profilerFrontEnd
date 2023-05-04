import React, { useState, useEffect } from "react";
import Cropper from "react-easy-crop";
import Modal from "../../molecules/Modal";

function Croppered(props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [imageURL, setImageURL] = useState(null);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (props.croppedImage) {
      setImageURL(URL.createObjectURL(props.croppedImage));
      setOpen(true);
    }
  }, [props.croppedImage]);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    // console.log(croppedArea, croppedAreaPixels);
  };
  return (
    <div className="z-10">
      {imageURL && (
        <>
          <Cropper
            className
            image={imageURL && imageURL}
            crop={crop}
            zoom={zoom}
            aspect={4 / 3}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
          <div className="z-50 cursor-pointer">done</div>
        </>
      )}
    </div>
  );
}

export default Croppered;
