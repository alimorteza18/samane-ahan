import ImageUploader from "@/components/input/uploader/ImageUploader";
import { Modal } from "react-bootstrap";

export default function ImageProfileModal(props: any) {
  const { open, close, style,sizeModal,second=false } = props;
  return (
    <Modal
      size={sizeModal}
      show={open}
      onHide={close}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div>
          <ImageUploader second={second} close={close} styles={style} />
        </div>
      </Modal.Body>
    </Modal>
  );
}
