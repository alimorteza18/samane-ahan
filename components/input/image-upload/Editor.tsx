// ** Hooks
import { useState, useRef } from "react";
// ** Components
import ReactCrop, { Crop, centerCrop, makeAspectCrop } from "react-image-crop";
import { Col, Row } from "reactstrap";
import Button from "../button";
// ** Styles
import "react-image-crop/dist/ReactCrop.css";
import styles from "./styles.module.css";

export function getCroppedImg(image: any, crop: any) {
  const canvas = document.createElement("canvas");

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext("2d");

  // New lines to be added
  const pixelRatio = window.devicePixelRatio;
  canvas.width = crop.width * pixelRatio;
  canvas.height = crop.height * pixelRatio;
  // @ts-ignore
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  // @ts-ignore
  ctx.imageSmoothingQuality = "high";

  // @ts-ignore
  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height
  );

  // As a blob
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => resolve(blob), "image/jpeg", 1);
  });
}

function Editor({
  sourceImg,
  onFinishUpload,
  loading = false,
  circularCrop = false,
  aspect: aspectProp = 1 / 1,
}: Props) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [crop, setCrop] = useState<Crop>(); //prettier-ignore
  const [aspect, setAspect] = useState<number | undefined>(aspectProp);
  const [completedCrop, setCompletedCrop] = useState(null);

  const uploadImage = async () => {
    const blobImg = await getCroppedImg(imgRef.current, completedCrop);

    onFinishUpload(blobImg);
  };

  function onImageLoad(e: any) {
    const { naturalWidth: width, naturalHeight: height } = e.currentTarget;

    const crop = centerCrop(
      makeAspectCrop(
        {
          // You don't need to pass a complete crop into
          // makeAspectCrop or centerCrop.
          unit: "%",
          width: 90,
        },
        aspectProp,
        width,
        height
      ),
      width,
      height
    );

    setCrop(crop);
  }

  return (
    <div className="App">
      <ReactCrop
        crop={crop}
        onChange={(c: any, percentCrop: any) => setCrop(percentCrop)}
        onComplete={(c: any) => setCompletedCrop(c)}
        circularCrop={circularCrop}
        keepSelection={true}
        aspect={aspect}
        minWidth={100}
        className={styles.crop}
      >
        <img ref={imgRef} src={sourceImg} onLoad={onImageLoad} />
      </ReactCrop>

      <Row style={{ flexDirection: "row-reverse" }}>
        <Col md={3}>
          <Button
            block
            label="بارگزاری"
            loading={loading}
            // @ts-ignore
            disabled={!completedCrop?.width || !completedCrop?.height}
            onClick={uploadImage}
          />
        </Col>
      </Row>
    </div>
  );
}

export default Editor;

type Props = {
  sourceImg: string;
  onFinishUpload: (imageBlob: any) => void;
  loading?: boolean;
  /**
   * @default false
   */
  circularCrop?: boolean;
  /**
   * @default 1/1
   */
  aspect?: number;
};
