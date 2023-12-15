import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Think } from "../../../../assets/images/thinkk.svg";
import { dashboardAction } from "../../../../Redux/Actions/dashboardAction";
import { ReactComponent as TotalUsers } from "../../../../assets/images/Sidebar/Totalusers.svg";
const Statistics = ({ dashboardStatus }) => {
  const dispatch = useDispatch();
  // const { dashboardStatus } = useSelector((state) => state.Dash);
  const [statusTitles, setStatusTitles] = useState(null);
  
  useEffect(() => {
    setStatusTitles(dashboardStatus.data);
  }, [dashboardStatus]);

  if (statusTitles === null) {
    return <h1>Loading...</h1>
  }
  function changeTitle(params) {
    let tmp = [
      {
        key: "totalUsers",
        title: "Total Users",
        svgimg: <TotalUsers />,
      },
      {
        key: "totalThoughts",
        title: "Total Thoughts",
        svgimg: <Think />,
      },
    ];
    return tmp.find((e) => e.key === params);
  }

  return (
    <>
      <div className="card scrollbar mb-3">
        <div class="header-box">
          <div class="title-text">
            <h2>Statistics</h2>
          </div>
        </div>
        <div className="statistics-wholebox card-body">
          {dashboardStatus?.data &&
            Object.entries(dashboardStatus?.data)?.map((e, i) => {
              if (e[0] === "actionGraph") {
                return false;
              }
              return (
                <>
                  <div className="statistics-card" key={i}>
                    <div className="statistics-body">
                      <div className="thought-imageno-box">
                        <div className="thought-image">{changeTitle(e[0]).svgimg}</div>
                        <div className="thought-no">{e[1]}</div>
                      </div>
                      <p>{changeTitle(e[0]).title}</p>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Statistics;
