import React, { Suspense, useEffect } from "react";
import Statistics from "./DashComponents/Statistics";
import ActionChart from "./DashComponents/ActionChart";
import { useDispatch, useSelector } from "react-redux";
import { dashboardAction } from "../../Redux/Actions/dashboardAction";
const RecentThoughts = React.lazy(() =>
  import("./DashComponents/RecentThoughts")
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const { dashboardStatus } = useSelector((state) => state.Dash);

  useEffect(() => {
    dispatch(dashboardAction());
  }, []);
  return (
    <>
        <div className="dashboard-page">
          <div className="row">
            <div className="col-lg-6 col-md-12 col-12">
              <Statistics dashboardStatus={dashboardStatus} />
            </div>
            <div className="col-lg-6 col-md-12 col-12">
              <div className="card action-item">
                <div className="header-box">
                  <div className="title-text">
                    <h2>Action Status</h2>
                  </div>
                </div>
                <div className="action-graph">
                <ActionChart dashboardStatus={dashboardStatus} />
                </div>
              </div>
            </div>
            <div className="col-lg-12 col-md-12 col-12">
              <Suspense fallback={<div>Loading...</div>}>
                <RecentThoughts  />
              </Suspense>
            </div>
          </div>
        </div>
    
    </>
  );
};

export default Dashboard;
