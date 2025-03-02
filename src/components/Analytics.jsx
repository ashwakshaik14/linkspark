import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import style from "../styles/Dashboard.module.css";
import logo from "../assets/bomma.png";
import link from "../assets/link.png";
import ana from "../assets/ana.png";
import apperance from "../assets/apperance.png";
import settings from "../assets/settings.png";
import logout from "../assets/logout.png";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

function Analytics() {
  const [userDetails, setUserDetails] = useState(null);
  const [image, setImage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [analyticsData, setAnalyticsData] = useState(null); // ✅ State for analytics
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("https://spark-back.onrender.com/api/user/details", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          console.error("Failed to fetch user details");
          navigate("/login");
          return;
        }

        const data = await response.json();
        setUserDetails(data);
        console.log("User Details:", data);

        fetchUserImage(data.email);
        fetchAnalytics(data.email); // ✅ Fetch analytics after getting user email
      } catch (error) {
        console.error("Error fetching user details:", error);
        navigate("/login");
      }
    };

    fetchUserDetails();
  }, [navigate]);

  // ✅ Fetch Analytics Data
  const fetchAnalytics = async (email) => {
    try {
      const response = await fetch(
        `https://spark-back.onrender.com/api/analytics/${email}`
      );
      if (!response.ok) {
        console.error("No analytics found for this email");
        return;
      }

      const data = await response.json();
      setAnalyticsData(data); // ✅ Store in state
      console.log("Fetched Analytics:", data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    }
  };

  // ✅ Fetch User Image
  const fetchUserImage = async (email) => {
    try {
      const response = await fetch(`https://spark-back.onrender.com/api/link/${email}`);
      if (!response.ok) {
        console.error("No image found for this email");
        return;
      }

      const data = await response.json();
      if (data.image) {
        setImage(`data:image/png;base64,${data.image}`);
        console.log("Fetched image for:", email);
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const linksCount = analyticsData?.typeClicks?.link || 0;
  const shopsCount = analyticsData?.typeClicks?.shop || 0;
  const getConnectedCount = analyticsData?.getConnectedCount || 0;

  useEffect(() => {
    if (!userDetails?.email) return;

    fetch(`https://spark-back.onrender.com/api/clicks-over-time/${userDetails.email}`)
      .then(async (res) => {
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`API Error ${res.status}: ${errorText}`);
        }
        return res.json();
      })
      .then((clickData) => {
        const formattedData = clickData.map((item) => ({
          month: item.month, // ✅ Use updated field name
          count: item.totalClicks, // ✅ Use totalClicks instead of count
        }));
        console.log(formattedData);
        setData(formattedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [userDetails]);

  if (
    !analyticsData ||
    !analyticsData.deviceClicks ||
    !analyticsData.appClicks ||
    !analyticsData.urlCount
  )
    return <p>Loading...</p>; // Prevent error

  const chartData = Object.entries(analyticsData.deviceClicks).map(
    ([device, count]) => ({
      device,
      count,
    })
  );

  const chart2Data = Object.entries(analyticsData.urlCount).map(
    ([device, count]) => ({
      device,
      count,
    })
  );

  const pieData = Object.entries(analyticsData.appClicks).map(
    ([app, count]) => ({
      name: app,
      value: count,
    })
  );

  const COLORS = ["#165534", "#3EE58F", "#94E9B8", "#21AF66", "#ACE1AF"]; // Custom colors

  const isMobile = window.innerWidth <= 768; // Check if mobile
  const barSize = isMobile ? 15 : 30; // Smaller bars on mobile

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={style.container}>
        {/* Sidebar */}
        <aside className={style.sidebar}>
          <div>
            <div className={style.logo}>
              <img src={logo} alt="logo" />
            </div>
            <nav>
              <ul>
                <li>
                  <Link to="/dashboard">
                    <img src={link} />
                    Links
                  </Link>
                </li>
                <li>
                  <Link to="/appearance">
                    <img src={apperance} />
                    Appearance
                  </Link>
                </li>
                <li className={style.sideactive}>
                  <Link to="/analytics">
                    <img src={ana} />
                    Analytics
                  </Link>
                </li>
                <li>
                  <Link to="/settings">
                    <img src={settings} />
                    Settings
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          {showPopup && (
            <div className={style.popup}>
              <button onClick={handleLogout}>
                <img src={logout} />
                Sign out
              </button>
            </div>
          )}
          <div
            className={style.profile}
            onClick={() => setShowPopup(!showPopup)}
          >
            {image ? (
              <img src={image} alt="Uploaded" className={style.small} />
            ) : (
              <div className={style.placeholder}>No Image</div>
            )}
            {userDetails.username}
          </div>
        </aside>

        <div className={style.mobDown}>
          <nav>
            <ul>
              <li>
                <Link to="/dashboard">
                  <img src={link} />
                  Links
                </Link>
              </li>
              <li>
                <Link to="/appearance">
                  <img src={apperance} />
                  Appearance
                </Link>
              </li>
              <li className={style.sideactive}>
                <Link to="/analytics">
                  <img src={ana} />
                  Analytics
                </Link>
              </li>
              <li>
                <Link to="/settings">
                  <img src={settings} />
                  Settings
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <main className={style.main}>
          <div className={style.mobUp}>
            <div className={style.logo}>
              <img src={logo} alt="logo" />
            </div>
            <div>
              {showPopup && (
                <div className={style.popup}>
                  <button onClick={handleLogout}>
                    <img src={logout} />
                    Sign out
                  </button>
                </div>
              )}
              <div
                className={style.profile}
                onClick={() => setShowPopup(!showPopup)}
              >
                {image ? (
                  <img src={image} alt="Uploaded" className={style.small} />
                ) : (
                  <div className={style.placeholder}>No Image</div>
                )}
              </div>
            </div>
          </div>
          <header>
            <h2>Hi, {userDetails.username}!</h2>
            <p>Congratulations. You got a great response today.</p>
          </header>

          <section>
            <h4>Overview</h4>
            <div className={style.threeBox}>
              <div className={style.linksC}>
                <h5>Clicks on Links</h5>
                <p style={{ color: "white" }}>{linksCount}</p>
              </div>
              <div className={style.ShopsC}>
                <h5>Clicks on Shops</h5>
                <p>{shopsCount}</p>
              </div>
              <div className={style.CTA}>
                <h5>CTA</h5>
                <p>{getConnectedCount}</p>
              </div>
            </div>
            <div className={style.graph}>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#000"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className={style.DS}>
              <div className={style.device}>
                <div style={{ height: "300px", padding: "10px" }}>
                  <h4 style={{ textAlign: "left", marginBottom: "10px" }}>
                    Traffic by Device
                  </h4>
                  <ResponsiveContainer height="100%">
                    <BarChart
                      data={chartData}
                      margin={{ top: 10, right: 30, left: 10, bottom: 30 }}
                      barCategoryGap={isMobile ? "10%" : "5%"} // Increase spacing for mobile
                      >
                      <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                      <XAxis dataKey="device" />
                      <YAxis allowDecimals={false} />
                      <Tooltip cursor={{ fill: "#f5f5f5" }} />
                      <Bar dataKey="count" barSize={barSize} radius={[5, 5, 0, 0]}>
                        {chartData.map((_, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className={style.sites}>
                <div style={{ height: 300, textAlign: "center" }}>
                  <h4
                    style={{
                      textAlign: "left",
                      marginBottom: "10px",
                      paddingLeft: "25px",
                    }}
                  >
                    Sites
                  </h4>
                  <ResponsiveContainer height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100} // Size of the pie chart
                        innerRadius={60} // Creates the doughnut effect
                        paddingAngle={3}
                      >
                        {pieData.map((_, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className={style.linksGraph}>
              <div style={{ height: "300px",width:'100%', padding: "10px" }}>
                <h4 style={{ textAlign: "left", marginBottom: "10px" }}>
                  Traffic by Links
                </h4>
                <ResponsiveContainer height="100%">
                  <BarChart
                    data={chart2Data}
                    margin={{ top: 10, right: 30, left: 10, bottom: 30 }}
                    barCategoryGap={isMobile ? "10%" : "5%"} // Increase spacing for mobile
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                    <XAxis dataKey="device" />
                    <YAxis allowDecimals={false} />
                    <Tooltip cursor={{ fill: "#f5f5f5" }} />
                    <Bar
                      dataKey="count"
                      barSize={barSize}
                      radius={[5, 5, 0, 0]}
                    >
                      {chart2Data.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>

          {/* <section>
            {analyticsData ? (
              <div className={style.analytics}>
                <h3>Analytics Overview</h3>

                <p>
                  <strong>Total Clicks:</strong> {analyticsData.clicks}
                </p>
                <p>
                  <strong>Get Connected Clicks:</strong>{" "}
                  {analyticsData.getConnectedCount}
                </p>

                <h4>App Clicks</h4>
                <ul>
                  {analyticsData.appClicks &&
                    Object.entries(analyticsData.appClicks).map(
                      ([app, count]) => (
                        <li key={app}>
                          {app}: {count} clicks
                        </li>
                      )
                    )}
                </ul>

                <h4>Device Clicks</h4>
                <ul>
                  {analyticsData.deviceClicks &&
                    Object.entries(analyticsData.deviceClicks).map(
                      ([device, count]) => (
                        <li key={device}>
                          {device}: {count} clicks
                        </li>
                      )
                    )}
                </ul>

                <h4>Type Clicks</h4>
                <ul>
                  {analyticsData.typeClicks &&
                    Object.entries(analyticsData.typeClicks).map(
                      ([type, count]) => (
                        <li key={type}>
                          {type}: {count} clicks
                        </li>
                      )
                    )}
                </ul>

                <h4>URL Clicks</h4>
                <ul>
                  {analyticsData.urlCount &&
                    Object.entries(analyticsData.urlCount).map(
                      ([url, count]) => (
                        <li key={url}>
                          {url}: {count} clicks
                        </li>
                      )
                    )}
                </ul>
              </div>
            ) : (
              <p>Loading analytics...</p>
            )}
          </section> */}
        </main>
      </div>
    </>
  );
}

export default Analytics;
