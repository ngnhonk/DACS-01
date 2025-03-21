import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/pages/Dashboard.css";
import PostListByUser from "../components/PostListByUser";
import CreatePost from "../components/CreatePost";
import ChangeAvatar from "../components/ChangeAvatar";
import ChangePassword from "../components/ChangePassword";
import ChangeBio from "../components/ChangeBio";

function Dashboard() {
  let [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showBioModal, setShowBioModal] = useState(false);

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

  const toggleAvatarForm = () => {
    setShowAvatarModal(!showAvatarModal);
  };

  const togglePasswordForm = () => {
    setShowPasswordModal(!showPasswordModal);
  };
  const toggleBioForm = () => {
    setShowBioModal(!showBioModal);
  };

  const handleAvatarChange = (newAvatarUrl) => {
    setUser((prevUser) => ({
      ...prevUser,
      avatar_url: newAvatarUrl,
    }));
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
                    <div className="bio">
                      {user.bio}

                      <button className="edit-button" onClick={toggleBioForm}>
                        <i className="fa-regular fa-pen-to-square"></i>
                      </button>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div className="info">
                      <img className="avatar" src={user.avatar_url} alt="User Avatar" />
                      <div className="button-wrap">
                        <button onClick={handleLogout}>Log out</button>
                        <button onClick={toggleAvatarForm}>
                          Change Avatar
                        </button>
                        <button onClick={togglePasswordForm}>
                          Change Password
                        </button>
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
                <div className="tab-content">{renderContent()}</div>
              </div>
            </div>
          </div>

          {/* Avatar Change Modal */}
          <ChangeAvatar
            isOpen={showAvatarModal}
            onClose={toggleAvatarForm}
            currentAvatar={user.avatar_url}
            onAvatarChange={handleAvatarChange}
          />

          {/* Password Change Modal */}
          <ChangePassword
            isOpen={showPasswordModal}
            onClose={togglePasswordForm}
          />

          {/* Bio Change Modal */}
          <ChangeBio isOpen={showBioModal} onClose={toggleBioForm} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Dashboard;
