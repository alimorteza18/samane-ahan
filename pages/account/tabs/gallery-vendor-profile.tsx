// ** Hooks
import useHttp from "@/hooks/use-http";
// ** Components
import { Col, Row } from "reactstrap";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import DataTable from "@/components/elements/data-table";
import Button from "@/components/input/button";
import Switch from "@/components/input/switch";
// ** Partials
import GalleryUpload from "./gallery-upload";
// ** Services
import { connect } from "react-redux";
import { fetchVendorGallery } from "@/services/vendor-services";
import { deleteOwnVendorGallery, setOwnVendorGalleryIntro } from "@/services/upload-service"; //prettier-ignore
import { dateToPersianDateTimeString } from "@/services/datetime-services";

const MySwal = withReactContent(Swal);

function GalleryVendorProfile({
  active = false,
  profile,
}: VendorProfilePageProps) {
  const { data, loading, execute, setSingleFieldValue } = useHttp<Gallery[]>(
    fetchVendorGallery,
    { id: profile?.vendor?.id },
    true
  );

  const { execute: deleteGallery } = useHttp(deleteOwnVendorGallery);
  const { execute: setGalleryIntro } = useHttp(setOwnVendorGalleryIntro);

  /**
   * @description delete a gallery item by its id
   * @param id
   */
  const handleDeleteGalleryItem = (id: any) => {
    MySwal.fire({
      title: "آیا از حذف این فایل اطمینان دارید؟",
      text: "این عمل غیر قابل بازگشت می‌باشد.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "بله",
      cancelButtonText: "خیر",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteGallery({ id }).then(() => {
          toast.success("با موفقیت حذف شد", { rtl: true });
          execute();
        });
      }
    });
  };

  /**
   * @description toggle gallery item itroduction
   * @param row
   */
  const handleGalleryItemIntro = (row: Gallery) => {
    setGalleryIntro({ id: row.id }).then((res) => {
      setSingleFieldValue({
        id: row.id,
        field: "Introduction",
        value: !row.Introduction,
      });
      toast.success("با موفقیت ویرایش شد", { rtl: true });
    });
  };

  return (
    <div className={"tab-pan fade " + (active ? "active show" : "hidden")}>
      <div className="card">
        <div className="card-body">
          <GalleryUpload
            onSuccessUpload={(e) => {
              toast.success("با موفقیت بارگزاری شد", { rtl: true });
              execute();
            }}
          />
          <Row className="mt-80">
            <Col sm="12">
              <DataTable
                progressPending={loading}
                pagination={false}
                data={data}
                columns={[
                  { name: "id", selector: (row: Gallery) => row.id },
                  {
                    name: "پیش‌نمایش",
                    cell: (row: Gallery) => {
                      if (row?.file_type?.toLowerCase() === "mp4") {
                        return (
                          <span
                            className="badge badge-pill badge-primary"
                            style={{
                              fontSize: row.Introduction ? "20px" : "15px",
                              backgroundColor: "black",
                              border: "5px solid orange",
                            }}
                          >
                            فیلم
                          </span>
                        );
                      } else {
                        return (
                          <img
                            style={{
                              objectFit: "cover",
                              width: "60px",
                              height: "60px",
                              borderRadius: "20px",
                              border: row.Introduction
                                ? "5px inset orange"
                                : "",
                            }}
                            src={row.file_path}
                          />
                        );
                      }
                    },
                  },
                  {
                    name: "فایل",
                    cell: (row: Gallery) => (
                      <Button
                        label="دریافت"
                        size="sm"
                        target="_blank"
                        href={row.file_path}
                      />
                    ),
                  },
                  {
                    name: "دسته‌بندی",
                    selector: (row: Gallery) => row.fa_category,
                  },
                  {
                    name: "تاریخ",
                    cell: (row: Gallery) =>
                      dateToPersianDateTimeString(row.created_at),
                  },
                  {
                    name: "بنگاه‌نما",
                    cell: (row: Gallery, index) => (
                      <Switch
                        checked={
                          data?.length ? data[index]?.Introduction : false
                        }
                        onChange={() => handleGalleryItemIntro(row)}
                      />
                    ),
                  },
                  {
                    name: "عملیات",
                    cell: (row: Gallery) => (
                      <i
                        style={{ cursor: "pointer" }}
                        className="fi-rs-trash"
                        onClick={() => handleDeleteGalleryItem(row.id)}
                      />
                    ),
                  },
                ]}
              />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
interface VendorProfilePageProps {
  profile?: AuthUserProfile;
  active?: boolean;
}

const mapStateToProps = (state: any) => ({
  profile: state.auth.profile,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GalleryVendorProfile);
