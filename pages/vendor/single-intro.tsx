import styles from "./styles.module.css";

const SingleGalleryIntro = (props: SingleGalleryIntroProps) => {
  const getType = (targetPath: string) => {
    let images = ["jpeg", "jpg", "png", "webp"];

    let extension =
      targetPath
        .split(/[#?]/)[0]
        .split(".")
        .pop()
        ?.trim()
        .toLocaleLowerCase() ?? "";

    if (
      images.includes(extension) ||
      targetPath.startsWith("https://picsum.photos")
    )
      return "img";

    if (extension == "mp4") return "mp4";
    if (extension == "pdf") return "pdf";
  };

  return (
    <>
      {getType(props.file_path) === "mp4" ? (
        <div className="col-5">
          <video
            className="img-fluid img-thumbnail"
            style={{
              width: "100%",
              height: "auto",
            }}
          >
            <source src={props.file_path} type="video/mp4" />
            شرمنده، مرورگر شما فرمت ویدئو را پشتیبانی نمی کند
          </video>
          <img
            src={"/assets/imgs/theme/icons/play-icon.svg"}
            className={styles.btn}
          />
        </div>
      ) : (
        <div className="col-7">
          <img className="img-fluid img-thumbnail" src={props.file_path} />
        </div>
      )}
      {/* <div className="col-7">
        <div className="row">
          {getType(props.file_path) == "img" ? (
            <img className="img-fluid img-thumbnail" src={props.file_path} />
          ) : null}
        </div>
      </div> */}
    </>
  );
};

interface SingleGalleryIntroProps extends GalleryIntroduction {}

export default SingleGalleryIntro;
