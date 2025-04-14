import React, { useEffect, useState } from "react";
import {
  UserOutlined,
  DollarCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LineChartOutlined,
  PlayCircleOutlined,
  CalendarOutlined
} from "@ant-design/icons";
import { Layout, Menu, Dropdown, Space, Avatar } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useCurrentApp } from "../context/app.context";
import type { MenuProps } from "antd";
import { logoutAPI } from "@/services/api";

type MenuItem = Required<MenuProps>["items"][number];

const { Content, Sider } = Layout;

const LayoutAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");
  const { user, setUser, setIsAuthenticated, isAuthenticated } =
    useCurrentApp();

  const location = useLocation();
  const navigate = useNavigate();

  const items: MenuItem[] = [
    {
      label: <Link to="/admin">Revenue</Link>,
      key: "/admin",
      icon: <LineChartOutlined />
    },
    {
      label: <Link to="/admin/user">Manage Users</Link>,
      key: "/admin/user",
      icon: <UserOutlined />
    },
    {
      label: <Link to="/admin/movie">Manage Movies</Link>,
      key: "/admin/book",
      icon: <PlayCircleOutlined />
    },
    {
      label: <Link to="/admin/showtime">Manage Showtimes</Link>,
      key: "/admin/showtime",
      icon: <CalendarOutlined />
    },
    {
      label: <Link to="/admin/booking">Manage Bookings</Link>,
      key: "/admin/booking",
      icon: <DollarCircleOutlined />
    }
  ];

  useEffect(() => {
    const active: any =
      items.find((item) => location.pathname === (item!.key as any)) ??
      "/admin";
    setActiveMenu(active.key);
  }, [location]);

  const handleLogout = async () => {
    //todo
    const res = await logoutAPI();
    if (res.data) {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("access_token");
      navigate("/");
    }
  };

  const itemsDropdown = [
    {
      label: (
        <label style={{ cursor: "pointer" }} onClick={() => alert("me")}>
          Quản lý tài khoản
        </label>
      ),
      key: "account"
    },
    {
      label: <Link to={"/"}>Trang chủ</Link>,
      key: "home"
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

  const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${
    user?.avatar
  }`;

  if (isAuthenticated === false) {
    return <Outlet />;
  }

  const isAdminRoute = location.pathname.includes("admin");
  if (isAuthenticated === true && isAdminRoute === true) {
    const role = user?.role;
    if (role === "USER") {
      return <Outlet />;
    }
  }

  return (
    <>
      <Layout style={{ minHeight: "100vh" }} className="layout-admin">
        <Sider
          theme="light"
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div style={{ height: 32, margin: 16, textAlign: "center" }}>
            Admin
          </div>
          <Menu
            // defaultSelectedKeys={[activeMenu]}
            selectedKeys={[activeMenu]}
            mode="inline"
            items={items}
            onClick={(e) => setActiveMenu(e.key)}
          />
        </Sider>
        <Layout>
          <div
            className="admin-header"
            style={{
              height: "50px",
              borderBottom: "1px solid #ebebeb",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 15px"
            }}
          >
            <span>
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: "trigger",
                  onClick: () => setCollapsed(!collapsed)
                }
              )}
            </span>
            <Dropdown menu={{ items: itemsDropdown }} trigger={["click"]}>
              <Space style={{ cursor: "pointer" }}>
                <Avatar src={urlAvatar} />
                {user?.name}
              </Space>
            </Dropdown>
          </div>
          <Content style={{ padding: "15px" }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default LayoutAdmin;
