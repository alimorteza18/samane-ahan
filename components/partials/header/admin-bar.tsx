import useAuth from "@/hooks/use-auth";

const AdminBar = (props: any) => {
  const { isEditMode, toggleEditMode } = useAuth();

  return (
    <div
      className="d-flex"
      style={{
        backgroundColor: "black",
        padding: "5px 5px",
        justifyContent: "space-between",
      }}
    >
      <div className="header-action-2">
        {props.profile?.admin ? (
          <div className="header-action-icon-2">
            <img
              className="svgInject ml-5"
              alt="Nest"
              src="/assets/imgs/theme/icons/icon-user.svg"
            />

            <span className="ml-0 text-white">
              <a target="_blank" href="https://panel.samaneahan.com">
                {props.profile.admin?.name}
              </a>
            </span>
          </div>
        ) : null}
      </div>
      <div className="header-action-2 text-white">
        <div className="wraper-switch-town">
          <label className="switch">
            <input
              type="checkbox"
              checked={isEditMode}
              onChange={toggleEditMode}
            />
            <span className="slider round"></span>
          </label>
          <span style={{ fontSize: "10px" }} className="mr-5 ">
            حالت ویرایش
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdminBar;
