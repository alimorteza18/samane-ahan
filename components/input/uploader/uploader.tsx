import "react-dropzone-uploader-with-ts-issue-fixes/dist/styles.css";
import React from "react";
import useHttp from "@/hooks/use-http";
//@ts-ignore
import Dropzone from "react-dropzone-uploader-with-ts-issue-fixes";
import { connect } from "react-redux";
import { uploadVendorGallery } from "@/services/upload-service";

const Uploader = ({ profile }: any) => {
  const { execute } = useHttp(uploadVendorGallery, { formType: "multipart" });
  const toast = (innerHTML: string) => {
    const el = document.getElementById("toast") as HTMLElement | null;
    if (el) {
      el.innerHTML = innerHTML;
      el.className = "show";
      setTimeout(() => {
        el.className = el.className.replace("show", "");
      }, 3000);
    }
  };

  const getUploadParams = ({ file }: any): any => {
    const formData = new FormData();
    formData.append("file", file);
    // @ts-ignore
    execute({ formData, id: profile?.vendor.id });
  };

  const handleChangeStatus = ({ meta, remove }: any, status: any) => {
    if (status === "headers_received") {
      toast(`${meta.name} uploaded!`);
      remove();
    } else if (status === "aborted") {
      toast(`${meta.name}, upload failed...`);
    }
  };

  return (
    <React.Fragment>
      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        inputContent="Drop A File"
        styles={{
          dropzone: { width: 400, height: 200 },
          dropzoneActive: { borderColor: "green" },
        }}
      />
    </React.Fragment>
  );
};
const mapStateToProps = (state: any) => ({
  selectedPackages: state.packages,
  profile: state.auth.profile,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Uploader);
