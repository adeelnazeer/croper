import React, { useState, useRef, useEffect } from "react";

import { centerCrop, makeAspectCrop } from "react-image-crop";
import { Row, Col, message } from "antd";
import { apiPath } from "../../config";

import axios from "axios";
import { canvasPreview } from "./canvasPreview.js";
import { useDebounceEffect } from "./useDebounseEffect.js";
import Modal from "./modal";
import Loader from "../loader-api/index";
 
// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export default function App() {
  const [imgSrc, setImgSrc] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [title, setTitle] = useState({
    title: "",
    id: "",
    type: "",
  });
  const previewCanvasRef = useRef(null);
  const imgRef = useRef(null);
  const [imageResponse, setImageResponse] = useState([]);
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState(16 / 9);
  let user = JSON.parse(localStorage.getItem("user"));
  let token = localStorage.getItem("Token");

  const getData=()=>{
    setLoader(true);
    let header = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(`${apiPath}/image`, header)
      .then((response) => {
        setImageResponse(response?.data?.data);
        setLoader(false);
      })
      .catch((err) => {
        message.error("Something went wrong try again");
        setLoader(false);
      });
  }


  useEffect(() => {
    getData()
  }, []);

  function onSelectFile(e) {
    setLoader(true);
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
      const form = new FormData();
      form.append("image", e.target.files[0]);
      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      axios
        .post(`${apiPath}/image`, form, header)
        .then((response) => {
          setImageResponse(response?.data?.data);
          setLoader(false);
        })
        .catch((err) => {
          message.error("Something went wrong try again");
          setLoader(false);
        });
    }
  }

  function onImageLoad(e) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate
        );
      }
    },
    100,
    [completedCrop, scale, rotate]
  );

  return (
    <div
      className="App"
      style={{
        width: "100%",
        textAlign: "center",
        height: "100vh",
        overflow: "auto",
      }}
    >
      {loader ? (
        <Loader />
      ) : (
        <>
          <div
            className="Crop-Controls"
            style={{
              textAlign: "center",
              marginTop: "80px",
            }}
          >
            <input type="file" accept="image/*" onChange={onSelectFile} />
          </div>
          <Row style={{ marginTop: "30px" }}>
            {imageResponse?.map((single) => (
              <Row>
                <Col
                  xs={{ span: 4 }}
                  lg={{ span: 4 }}
                  style={{ padding: "20px" }}
                >
                  <p style={{ textAlign: "center" }}>
                    <strong>Actual Image</strong>
                  </p>
                  <img
                    src={single?.actual_path}
                    alt=""
                    id="abc"
                    style={{
                      cursor: "not-allowed",
                      height: "200px",
                      width: "100%",
                    }}
                  />
                </Col>
                <Col
                  xs={{ span: 4 }}
                  lg={{ span: 4 }}
                  style={{ padding: "20px" }}
                >
                  <p style={{ textAlign: "center" }}>
                    <strong>Facebook Image</strong>
                  </p>

                  <img
                    src={single?.facebook_image_path}
                    alt=""
                    style={{
                      cursor: "pointer",
                      height: "200px",
                      width: "100%",
                    }}
                    onClick={() => {
                      setShowModal(!showModal);
                      setImgSrc(single?.facebook_image_path);
                      setTitle((st) => ({
                        ...st,
                        title: "FaceBook Image",
                        type: "facebook_image_path",
                        id: single?.id,
                      }));
                    }}
                  />
                </Col>
                <Col
                  xs={{ span: 4 }}
                  lg={{ span: 4 }}
                  style={{ padding: "20px" }}
                >
                  <p style={{ textAlign: "center" }}>
                    <strong>Instagram Image</strong>
                  </p>

                  <img
                    src={single?.instagram_image_path}
                    alt=""
                    style={{
                      cursor: "pointer",
                      height: "200px",
                      width: "100%",
                    }}
                    onClick={() => {
                      setShowModal(!showModal);
                      setImgSrc(single?.instagram_image_path);
                      setTitle((st) => ({
                        ...st,
                        title: "Instagram Image",
                        type: "instagram_image_path",
                        id: single?.id,
                      }));
                    }}
                  />
                </Col>
                <Col
                  xs={{ span: 4 }}
                  lg={{ span: 4 }}
                  style={{ padding: "20px" }}
                >
                  <p style={{ textAlign: "center" }}>
                    <strong>Linkedin Image</strong>
                  </p>

                  <img
                    src={single?.linkedin_image_path}
                    alt=""
                    style={{
                      cursor: "pointer",
                      height: "200px",
                      width: "100%",
                    }}
                    onClick={() => {
                      setShowModal(!showModal);
                      setImgSrc(single?.linkedin_image_path);
                      setTitle((st) => ({
                        ...st,
                        title: "Linkedin Image",
                        type: "linkedin_image_path",
                        id: single?.id,
                      }));
                    }}
                  />
                </Col>
                <Col
                  xs={{ span: 4 }}
                  lg={{ span: 4 }}
                  style={{ padding: "20px" }}
                >
                  <p style={{ textAlign: "center" }}>
                    <strong>Twitter Image</strong>
                  </p>

                  <img
                    src={single?.twitter_image_path}
                    alt=""
                    style={{
                      cursor: "pointer",
                      height: "200px",
                      width: "100%",
                    }}
                    onClick={() => {
                      setShowModal(!showModal);
                      setImgSrc(single?.twitter_image_path);
                      setTitle((st) => ({
                        ...st,
                        title: "Twitter Image",
                        type: " twitter_image_path",
                        id: single?.id,
                      }));
                    }}
                  />
                </Col>
                <Col
                  xs={{ span: 4 }}
                  lg={{ span: 4 }}
                  style={{ padding: "20px" }}
                >
                  <p style={{ textAlign: "center" }}>
                    <strong>Youtube Image</strong>
                  </p>

                  <img
                    src={single?.youtube_image_path}
                    alt=""
                    style={{
                      cursor: "pointer",
                      height: "200px",
                      width: "100%",
                    }}
                    onClick={() => {
                      setShowModal(!showModal);
                      setImgSrc(single?.youtube_image_path);
                      setTitle((st) => ({
                        ...st,
                        title: "Youtube Image",
                        type: "youtube_image_path",
                        id: single?.id,
                      }));
                    }}
                  />
                </Col>
              </Row>
            ))}
          </Row>
        </>
      )}
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        crop={crop}
        setScale={setScale}
        scale={scale}
        imgSrc={imgSrc}
        setCrop={setCrop}
        setCompletedCrop={setCompletedCrop}
        completedCrop={completedCrop}
        previewCanvasRef={previewCanvasRef}
        onImageLoad={onImageLoad}
        title={title}
        imgRef={imgRef}
        getData={getData}
      />
    </div>
  );
}
