import React, { useEffect, useState } from "react";
import {
  UserOutlined,
  DollarCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LineChartOutlined,
  PlayCircleOutlined,
  CalendarOutlined,
  GoldOutlined,
  BorderOutlined,
  TeamOutlined
} from "@ant-design/icons";
import { Layout, Menu, Dropdown, Space, Avatar } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useCurrentApp } from "../context/app.context";
import type { MenuProps } from "antd";
import { logoutAPI } from "@/services/api";
import ManageAccount from "@/pages/client/account";

type MenuItem = Required<MenuProps>["items"][number];

const { Content, Sider } = Layout;

const LayoutAdmin = () => {
  const [openManageAccount, setOpenManageAccount] = useState<boolean>(false);
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
      label: <Link to="/admin/guest">Manage Guests</Link>,
      key: "/admin/guest",
      icon: <TeamOutlined />
    },
    {
      label: <Link to="/admin/user">Manage Users</Link>,
      key: "/admin/user",
      icon: <UserOutlined />
    },
    {
      label: <Link to="/admin/movie">Manage Movies</Link>,
      key: "/admin/movie",
      icon: <PlayCircleOutlined />
    },
    {
      label: <Link to="/admin/showtime">Manage Showtimes</Link>,
      key: "/admin/showtime",
      icon: <CalendarOutlined />
    },
    {
      label: <span>Manage Bookings</span>,
      key: "/admin/booking",
      icon: <DollarCircleOutlined />,
      children: [
        {
          label: <Link to="/admin/booking/user">User Booking</Link>,
          key: "/admin/booking/user",
          icon: <DollarCircleOutlined />
        },
        {
          label: <Link to="/admin/booking/guest">Guest Booking</Link>,
          key: "/admin/booking/guest",
          icon: <DollarCircleOutlined />
        }
      ]
    },
    {
      label: <Link to="/admin/voucher">Manage Vouchers</Link>,
      key: "/admin/voucher",
      icon: <DollarCircleOutlined />
    },
    {
      label: <span>Manage Rooms</span>,
      key: "/admin/room",
      icon: <GoldOutlined />,
      children: [
        {
          label: <Link to="/admin/room">Room 1</Link>,
          key: "/admin/room/1",
          icon: <BorderOutlined />
        },
        {
          label: <Link to="/admin/room">Room 2</Link>,
          key: "/admin/room/2",
          icon: <BorderOutlined />
        },
        {
          label: <Link to="/admin/room">Room 3</Link>,
          key: "/admin/room/3",
          icon: <BorderOutlined />
        },
        {
          label: <Link to="/admin/room">Room 4</Link>,
          key: "/admin/room/4",
          icon: <BorderOutlined />
        },
        {
          label: <Link to="/admin/room">Room 5</Link>,
          key: "/admin/room/5",
          icon: <BorderOutlined />
        },
        {
          label: <Link to="/admin/room">Room 6</Link>,
          key: "/admin/room/6",
          icon: <BorderOutlined />
        }
      ]
    }
  ];

  useEffect(() => {
    const active: any =
      items.find((item) => location.pathname === (item!.key as any)) ??
      "/admin";
    setActiveMenu(active.key);
  }, [location]);

  const handleLogout = async () => {
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
    if (role === "U") {
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
            Antin Cinema
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

      <ManageAccount
        isModalOpen={openManageAccount}
        setIsModalOpen={setOpenManageAccount}
      />
    </>
  );
};

export default LayoutAdmin;
