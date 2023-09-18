import { useCallback, useContext, useState } from "react";
import Dropzone from "react-dropzone";
import AvatarEditor from "react-avatar-editor";
import useHttp from "@/hooks/use-http";
import { upload } from "@/services/upload-service";
import base64 from "base64-js";
import { ProfileImage } from "@/pages/account/tabs/details";

const ImageUploader = ({ close, styles, second }: any) => {
  // @ts-ignore
  const {
    setUrl,
    setUrlBaner,
    fileImage,
    setFileImage,
    file2Image,
    setFile2Image,
  } = useContext(ProfileImage);

  const [setting, setSetting] = useState({
    file: "",
    image: null,
    editor: null,
    scale: 1,
  });
  const [editor, setEditor] = useState(null);

  const { execute } = useHttp(upload, { formType: "multipart" });

  const handleDrop = useCallback((acceptedFiles: any) => {
    const currentFile = acceptedFiles[0];
    setSetting({ ...setting, file: currentFile });
    const reader = new FileReader();
    reader.addEventListener("load", () =>
      // @ts-ignore
      setSetting({ ...setting, image: reader.result })
    );
    reader.readAsDataURL(currentFile);
  }, []);

  const handleSave = () => {
    if (editor !== null) {
      // @ts-ignore
      const canvas = editor.getImageScaledToCanvas().toDataURL();
      const base64String = canvas;
      const imageData = base64.toByteArray(base64String.split(",")[1]);
      const blob = new Blob([imageData], { type: "image/png" });
      const fileInput = new File([blob], "my-image.png", { type: "image/png" });
      const formData = new FormData();
      //@ts-ignore
      formData.append("file", fileInput);
      execute(formData).then((res: any) => {
        second
          ? setFile2Image(res.data.data?.path)
          : setFileImage(res.data.data?.path);
      });
      const urll = URL.createObjectURL(blob);
      second ? setUrlBaner(urll) : setUrl(urll);
      close(false);
    }
  };

  return (
    <>
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <div style={{ margin: "0 65px" }} {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag and drop or click to upload an image</p>
          </div>
        )}
      </Dropzone>

      {setting.image && (
        <AvatarEditor
          ref={(ref: any) => setEditor(ref)}
          image={setting.image}
          width={styles.width}
          height={styles.height}
          border={50}
          borderRadius={styles.borderRadius}
          color={[255, 255, 255, 0.6]}
          scale={setting.scale}
          rotate={0}
        />
      )}

      {editor && (
        <div>
          <label>Zoom:</label>
          <input
            type="range"
            min="1"
            max="2"
            step="0.01"
            value={setting.scale}
            onChange={(e) =>
              setSetting({ ...setting, scale: parseFloat(e.target.value) })
            }
          />
          <br />
          <button onClick={handleSave}>Save</button>
        </div>
      )}
    </>
  );
};

export default ImageUploader;
