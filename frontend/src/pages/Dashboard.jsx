import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/pages/Dashboard.css";
import PostListByUser from "../components/PostListByUser";
import CreatePost from "../components/CreatePost";
import CategoryList from "../components/CategoryList";

function Dashboard() {
  let [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/user/profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        let data = await response.json();
        data = data[0];
        setUser(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        sessionStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "posts":
        return <PostListByUser />;
      case "overview":
        return <CreatePost />;
      case "comments":
        return <div>This function already updating</div>;
      case "pinned":
        return <div>Pinned Content</div>;
      case "locked":
        return <div>Locked Content</div>;
      case "settings":
        return <div>Settings Content</div>;
      default:
        return <div>Overview Content</div>;
    }
  };

  return (
    <div className="dashboard">
      {user ? (
        <div>
          <div className="container-md">
            <div className="section-one">
              <div className="user-info">
                <div className="row">
                  <div className="col-md-7">
                    <div className="bio">{user.bio}</div>
                  </div>
                  <div className="col-md-5">
                    <div className="info">
                      <img src={user.avatar_url} alt="User Avatar" />
                      <div className="button-wrap">
                        <button onClick={handleLogout}>Log out</button>
                        <button>Change Avatar</button>
                        <button>Change Password</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="function">
                <div className="row">
                  <div className="col-md-2">
                    <button
                      className={`button-a ${
                        activeTab === "overview" ? "active" : ""
                      }`}
                      onClick={() => handleTabClick("overview")}
                    >
                      Create
                    </button>
                  </div>
                  <div className="col-md-2">
                    <button
                      className={`button-a ${
                        activeTab === "posts" ? "active" : ""
                      }`}
                      onClick={() => handleTabClick("posts")}
                    >
                      Your Posts
                    </button>
                  </div>
                  <div className="col-md-2">
                    <button
                      className={`button-a ${
                        activeTab === "comments" ? "active" : ""
                      }`}
                      onClick={() => handleTabClick("comments")}
                    >
                      Comments
                    </button>
                  </div>
                  <div className="col-md-2">
                    <button
                      className={`button-a ${
                        activeTab === "pinned" ? "active" : ""
                      }`}
                      onClick={() => handleTabClick("pinned")}
                    >
                      Pinned
                    </button>
                  </div>
                  <div className="col-md-2">
                    <button
                      className={`button-a ${
                        activeTab === "locked" ? "active" : ""
                      }`}
                      onClick={() => handleTabClick("locked")}
                    >
                      Locked
                    </button>
                  </div>
                  <div className="col-md-2">
                    <button
                      className={`button-a ${
                        activeTab === "settings" ? "active" : ""
                      }`}
                      onClick={() => handleTabClick("settings")}
                    >
                      Settings
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="section-two">
              <div className="inner-content">
                {}
                <div className="tab-content">{renderContent()}</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Dashboard;
