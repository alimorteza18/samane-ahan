// ** Hooks
import { CSSProperties, useEffect, useState } from "react";
import useHttp from "@/hooks/use-http";
// ** Components
import { Modal, ModalBody, ModalHeader } from "reactstrap";
// ** Partials
import Editor from "./Editor";
import Trigger from "./Trigger";
// ** Services
import { upload } from "@/services/upload-service";

interface Props {
  /**
   * @description url of the image
   */
  preview?: string | undefined;
  /**
   * @default false
   */
  circularCrop?: boolean;
  /**
   * @default 1/1
   */
  aspect?: number;
  components?: {
    image?: (preview: string | undefined) => JSX.Element;
  };
  styles?: {
    triggerContainer?: CSSProperties | undefined;
  };
  onUploadFinished?: (results: {
    success: boolean;
    path?: string;
    url?: string;
    error?: string;
  }) => void;
}

function ImageUpload({
  preview: propPreview = undefined,
  onUploadFinished = undefined,
  components,
  styles,
  aspect,
  circularCrop,
}: Props) {
  const [file, setFile] = useState("");
  const [open, setOpen] = useState(false);

  const [preview, setPreview] = useState(propPreview);

  useEffect(() => setPreview(propPreview), [propPreview]);

  const { execute, loading } = useHttp(upload, { formType: "multipart" });

  const onFinishUpload = (loadedBlob: any) => {
    const formData = new FormData();
    formData.append("file", loadedBlob);

    execute(formData)
      .then((results) => {
        setOpen(false);
        //@ts-ignore
        onUploadFinished && onUploadFinished(results.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Modal size="xl" isOpen={open}>
        <ModalHeader>
          <span style={{ cursor: "pointer" }} onClick={() => setOpen(false)}>
            X
          </span>
        </ModalHeader>
        <ModalBody>
          <Editor
            sourceImg={file}
            onFinishUpload={onFinishUpload}
            loading={loading}
            aspect={aspect}
            circularCrop={circularCrop}
          />
        </ModalBody>
      </Modal>

      <div className="position-relative">
        {components?.image ? (
          components.image(preview)
        ) : (
          <img className="img-fluid img-thumbnail" src={preview} />
        )}

        <div
          className="position-absolute bottom-0 end-0"
          style={
            styles?.triggerContainer ?? {
              marginBottom: "-10px",
              marginRight: "-10px",
            }
          }
        >
          <Trigger
            onNewSelectedFile={(file) => {
              setFile(file);
              setOpen(true);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default ImageUpload;
