const Dashboard = ({ active = false, profile }: AccountDashboardProps) => {
  return (
    <div className={"tab-pane fade " + (active ? "active show" : "hidden")}>
      <div className="card dashboard">
        <div className="card-header">
          <h3 className="mb-0">سلام {profile?.user?.name}!</h3>
        </div>
        <div className="card-body">
          <p>به سایت سامانه آهن خوش آمدید ...</p>
        </div>
      </div>
    </div>
  );
};

interface AccountDashboardProps {
  active: boolean;
  profile: AuthUserProfile;
}

export default Dashboard;
