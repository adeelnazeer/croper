import { Modal, Button } from "antd";
import React, { useState, useRef } from "react";
import ReactCrop from "react-image-crop";
import FileSaver from "file-saver";

import domtoimage from "dom-to-image";

import axios from "axios";
import { message } from "antd";
import { apiPath } from "../../config";

const App = (props) => {
  const [border, setBorder] = useState(true);
  let user = JSON.parse(localStorage.getItem("user"));
  let token = localStorage.getItem("Token");

  const ref = useRef();
  const {
    showModal,
    setShowModal,
    imgSrc,
    crop,
    setCrop,
    percentCrop,
    setCompletedCrop,
    aspect,
    imgRef,
    scale,
    rotate,
    completedCrop,
    onImageLoad,
    previewCanvasRef,
    title,
  } = props;

  const handleOk = async () => {
    setBorder(false);
    var node = document.getElementById("my-node");
    const imageData = await domtoimage.toPng(node, {});
    const img = await getDataUri(imageData);
    const form = new FormData();
    form.append("image", img);
    form.append("type", title?.type);
    const header = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };
    axios
      .post(`${apiPath}/image/update/${title?.id}`, form, header)
      .then((response) => {
        setBorder(false);
        setShowModal(false);
        message.success("Image croped successfully");
      })
      .catch(() => {
        setBorder(false);
        setShowModal(false);

        message.error("Some thing went wrong try again");
      });
  };

  const getDataUri = (url) => {
    return new Promise((resolve) => {
      const image = new Image();
      image.setAttribute("crossOrigin", "anonymous"); // getting images from external domain

      image.onload = function () {
        const canvas = document.createElement("canvas");
        canvas.width = this.naturalWidth;
        canvas.height = this.naturalHeight;

        // next three lines for white background in case png has a transparent background
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#fff"; /// set white fill style
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        canvas.getContext("2d").drawImage(this, 0, 0);

        resolve(canvas.toDataURL("image/jpeg"));
      };

      image.src = url;
    });
  };

  const handleCancel = async () => {
    setShowModal(false);
  };

  const handleDownload = () => {
    FileSaver.saveAs(imgSrc, "image");
  };

  return (
    <>
      <Modal
        title={title?.title}
        visible={showModal}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ textAlign: "center" }}
        footer={[
          <Button onClick={handleDownload}>Download</Button>,
          <Button key="submit" type="primary" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="link"
            href="https://google.com"
            type="primary"
            onClick={handleOk}
          >
            Ok
          </Button>,
        ]}
      >
        {Boolean(imgSrc) && (
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            // onComplete={onCropComplete}
            aspect={aspect}
            ref={ref}
            crossorigin="anonymous"
          >
            <img
              ref={imgRef}
              alt="Crop me"
              src={imgSrc}
              style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
              onLoad={onImageLoad}
            />
          </ReactCrop>
        )}
        <div>
          {Boolean(completedCrop) && (
            <div>
              <canvas
                ref={previewCanvasRef}
                id="my-node"
                crossOrigin="anonymous"
                style={{
                  border: border ? "1px solid black" : "none",
                  objectFit: "contain",
                  width: completedCrop.width,
                  height: completedCrop.height,
                }}
              />
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default App;
