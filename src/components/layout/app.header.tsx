import { useState } from "react";
import { FaReact } from "react-icons/fa";
import { VscSearchFuzzy } from "react-icons/vsc";
import { Divider, Badge, Drawer, Avatar, Popover, Empty } from "antd";
import { Dropdown, Space } from "antd";
import { useNavigate } from "react-router";
import "./app.header.scss";
import { Link } from "react-router-dom";
import { useCurrentApp } from "components/context/app.context";
import { logoutAPI } from "services/api";
import { isMobile } from "react-device-detect";
import ManageAccount from "@/pages/client/account";

interface IProps {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
}

const AppHeader = (props: IProps) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openManageAccount, setOpenManageAccount] = useState<boolean>(false);

  const { isAuthenticated, user, setUser, setIsAuthenticated } =
    useCurrentApp();

  const navigate = useNavigate();

  const handleLogout = async () => {
    //todo
    const res = await logoutAPI();
    if (res.data) {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("access_token");
    }
  };

  const items = [
    {
      label: (
        <label
          style={{ cursor: "pointer" }}
          onClick={() => setOpenManageAccount(true)}
        >
          Quản lý tài khoản
        </label>
      ),
      key: "account"
    },
    {
      label: <Link to="/history">Lịch sử mua hàng</Link>,
      key: "history"
    },
    {
      label: (
        <label style={{ cursor: "pointer" }} onClick={() => handleLogout()}>
          Đăng xuất
        </label>
      ),
      key: "logout"
    }
  ];
  if (user?.role === "A") {
    items.unshift({
      label: <Link to="/admin">Trang quản trị</Link>,
      key: "admin"
    });
  }

  const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${
    user?.avatar
  }`;

  return (
    <>
      <div className="header-container">
        <header className="page-header">
          <div className="page-header__top">
            <div
              className="page-header__toggle"
              onClick={() => {
                setOpenDrawer(true);
              }}
            >
              ☰
            </div>

            <div className="page-header__logo">
              <span className="logo">
                <span onClick={() => navigate("/")}> Antin Cinema</span>
              </span>

              <span className="page-header__menu">
                <ul>
                  <li
                    className={
                      location.pathname === "/lich-chieu-phim" ? "active" : ""
                    }
                  >
                    <Link to="/lich-chieu-phim">LỊCH CHIẾU</Link>
                  </li>
                  <li
                    className={location.pathname === "/movie" ? "active" : ""}
                  >
                    <Link to="/movie">PHIM</Link>
                  </li>
                  <li
                    className={location.pathname === "/uu-dai" ? "active" : ""}
                  >
                    <Link to="/uu-dai">ƯU ĐÃI</Link>
                  </li>
                  <li
                    className={
                      location.pathname === "/tin-tuc-phim" ? "active" : ""
                    }
                  >
                    <Link to="/tin-tuc-phim">TIN TỨC PHIM</Link>
                  </li>
                  <li
                    className={location.pathname === "/member" ? "active" : ""}
                  >
                    <Link to="/member">THÀNH VIÊN</Link>
                  </li>
                </ul>
              </span>
            </div>
          </div>

          <nav className="page-header__bottom">
            <ul id="navigation" className="navigation">
              <li className="navigation__item mobile">
                <Divider type="vertical" />
              </li>
              <li className="navigation__item mobile">
                {!isAuthenticated ? (
                  <span onClick={() => navigate("/login")}>Tài Khoản</span>
                ) : (
                  <Dropdown menu={{ items }} trigger={["click"]}>
                    <Space>
                      <Avatar src={urlAvatar} />
                      {user?.name}
                    </Space>
                  </Dropdown>
                )}
              </li>
            </ul>
          </nav>
        </header>
      </div>
      <Drawer
        title="Menu chức năng"
        placement="left"
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
      >
        <p>Quản lý tài khoản</p>
        <Divider />

        <p onClick={() => handleLogout()}>Đăng xuất</p>
        <Divider />
      </Drawer>

      <ManageAccount
        isModalOpen={openManageAccount}
        setIsModalOpen={setOpenManageAccount}
      />
    </>
  );
};

export default AppHeader;
