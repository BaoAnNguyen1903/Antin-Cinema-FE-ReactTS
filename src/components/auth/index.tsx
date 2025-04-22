import { Button, Result } from "antd";
import { useCurrentApp } from "components/context/app.context";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface IProps {
  children: React.ReactNode;
}

const ProtectedRoute = (props: IProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useCurrentApp();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Nếu chưa biết `isAuthenticated` là true hay false (ví dụ đang load app)
  if (isAuthenticated === undefined) return null;

  // if (isAuthenticated === false) {
  //   return (
  //     <Result
  //       status="500"
  //       title="Not Login"
  //       subTitle="Vui lòng đăng nhập để sử dụng tính năng này."
  //       extra={
  //         <Button type="primary">
  //           <Link to="/">Back Home</Link>
  //         </Button>
  //       }
  //     />
  //   );
  // }

  const isAdminRoute = location.pathname.includes("admin");
  if (isAuthenticated === true && isAdminRoute === true) {
    const role = user?.role;
    if (role === "U") {
      return (
        <Result
          status="403"
          title="403"
          subTitle="Sorry, you are not authorized to access this page."
          extra={
            <Button type="primary">
              <Link to="/">Back Home</Link>
            </Button>
          }
        />
      );
    }
  }

  return <>{props.children}</>;
};

export default ProtectedRoute;
