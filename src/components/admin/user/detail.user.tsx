import { FORMATE_DATE_VN } from "@/services/helper";
import { Avatar, Badge, Descriptions, Drawer } from "antd";
import dayjs from "dayjs";

interface IProps {
  openViewDetail: boolean;
  setOpenViewDetail: (v: boolean) => void;
  dataViewDetail: IUser | null;
  setDataViewDetail: (v: IUser | null) => void;
}
const DetailUser = (props: IProps) => {
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
        <Descriptions title="Thông tin user" bordered column={2}>
          <Descriptions.Item label="Id">
            {dataViewDetail?.uid}
          </Descriptions.Item>
          <Descriptions.Item label="Tên hiển thị">
            {dataViewDetail?.name}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày sinh">
            {dayjs(dataViewDetail?.dob).format(FORMATE_DATE_VN)}
          </Descriptions.Item>
          <Descriptions.Item label="Giới tính">
            {dataViewDetail?.gender}
          </Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">
            {dataViewDetail?.phone}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {dataViewDetail?.email}
          </Descriptions.Item>
          <Descriptions.Item label="Tài khoản">
            {dataViewDetail?.username}
          </Descriptions.Item>
          <Descriptions.Item label="Avatar">
            <Avatar size={40} src={avatarURL}></Avatar>
          </Descriptions.Item>
          <Descriptions.Item label="Điểm thưởng">
            {dataViewDetail?.points}
          </Descriptions.Item>
          <Descriptions.Item label="Trạng thái">
            {dataViewDetail?.status}
          </Descriptions.Item>
          <Descriptions.Item label="Role">
            <Badge status="processing" text={dataViewDetail?.role} />
          </Descriptions.Item>
        </Descriptions>
      </Drawer>
    </>
  );
};
export default DetailUser;
