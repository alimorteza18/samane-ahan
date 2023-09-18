// ** Hooks
import React, { useEffect, useState } from "react";
import useHttp from "@/hooks/use-http";
// ** Components
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import Button from "@/components/input/button";
import Select from "@/components/input/select";
// ** Services
import { uploadOwnVendorGallery } from "@/services/upload-service";

type Props = {
  onSuccessUpload: (files: any) => void;
};

const GalleryUpload: React.FC<Props> = ({ onSuccessUpload }) => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [category, setCategory] = useState<string>("office");
  const [fileType, setFileType] = useState<string>("image/*");

  useEffect(() => {
    switch (category) {
      case "office":
      case "card":
        setFileType("image/*");
        break;
      case "videos":
      case "personVideo":
        setFileType("video/*");
        break;
      case "catalog":
      case "products":
        setFileType("*");
        break;
      default:
        setFileType("image/*");
        break;
    }
  }, [category]);

  const { execute, loading } = useHttp(uploadOwnVendorGallery, {
    formType: "multipart",
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    setSelectedFiles(files);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedFiles) {
      const formData = new FormData();
      formData.append("category", category);

      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("file[]", selectedFiles[i]);
      }

      execute(formData).then((res) => {
        setSelectedFiles(null);
        onSuccessUpload && onSuccessUpload(res.data);
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader style={{ fontSize: "15px" }}>بارگزاری فایل جدید</CardHeader>
        <CardBody style={{ border: "1px solid #ececec", borderRadius: "10px" }}>
          <Row style={{ alignItems: "center" }}>
            <Col>
              <Select
                label="دسته بندی"
                value={category}
                onChange={(value) => {
                  setCategory(value);
                }}
                options={[
                  { label: "عکس از دفتر", value: "office" },
                  { label: "کارت ویزیت", value: "card" },
                  { label: "فیلم از دفتر", value: "videos" },
                  { label: "فیلم از شخص", value: "personVideo" },
                  { label: "کاتالوگ", value: "catalog" },
                  { label: "محصولات و انبار", value: "products" },
                ]}
              />
            </Col>
            <Col>
              <label
                style={{
                  display: "block",
                  position: "relative",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
              >
                <input
                  style={{ display: "none", position: "absolute" }}
                  type="file"
                  multiple
                  accept={fileType}
                  onChange={handleFileChange}
                />
                <Button
                  label="انتخاب فایل"
                  style={{ pointerEvents: "none", borderRadius: "10px" }}
                />

                {selectedFiles?.length ? (
                  <span>{selectedFiles?.length} فایل انتخاب شده است</span>
                ) : null}
              </label>
            </Col>

            <Col>
              <Button
                block
                color="primary"
                type="submit"
                loading={loading}
                label="بارگزاری"
                loadingText={"در حال بارگزاری"}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </form>
  );
};

export default GalleryUpload;
