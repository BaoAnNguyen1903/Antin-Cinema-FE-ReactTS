import { FORMATE_DATE_VN } from "@/services/helper";
import { Avatar, Badge, Descriptions, Drawer } from "antd";
import dayjs from "dayjs";

interface IProps {
  openViewDetail: boolean;
  setOpenViewDetail: (v: boolean) => void;
  dataViewDetail: IMovie | null;
  setDataViewDetail: (v: IMovie | null) => void;
}
const DetailMovie = (props: IProps) => {
  const {
    openViewDetail,
    setOpenViewDetail,
    dataViewDetail,
    setDataViewDetail
  } = props;

  const onClose = () => {
    setOpenViewDetail(false);
    setDataViewDetail(null);
  };

  const avatarURL = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${
    dataViewDetail?.avatar
  }`;
  return (
    <>
      <Drawer
        title="Chức năng xem chi tiết"
        width={"50vw"}
        onClose={onClose}
        open={openViewDetail}
      >
        <Descriptions title="Thông tin phim" bordered column={2}>
          <Descriptions.Item label="Id">
            {dataViewDetail?.mid}
          </Descriptions.Item>
          <Descriptions.Item label="Tên phim">
            {dataViewDetail?.movieName}
          </Descriptions.Item>
        </Descriptions>
      </Drawer>
    </>
  );
};
export default DetailMovie;
