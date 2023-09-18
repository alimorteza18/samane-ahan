import { ChangeEvent } from "react";
import styles from "./styles.module.css";

type Props = {
  onNewSelectedFile: (imageResult: string) => void;
};
function AvatarUploadTrigger({ onNewSelectedFile }: Props) {
  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      // on load the reader.result is always an image
      reader.addEventListener("load", () => {
        onNewSelectedFile(reader.result as string);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  return (
    <label className={styles.container}>
      <input
        type="file"
        accept="image/*"
        onChange={onSelectFile}
        onClick={(e) => {
          //@ts-ignore
          e.currentTarget.value = null;
        }}
      />
      <i className="fi-rs-edit" />
    </label>
  );
}
export default AvatarUploadTrigger;
