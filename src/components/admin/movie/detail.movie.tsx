import { FORMATE_DATE_VN } from "@/services/helper";
import { Descriptions, Drawer } from "antd";
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

          <Descriptions.Item label="Miêu tả">
            {dataViewDetail?.movieDescription}
          </Descriptions.Item>

          <Descriptions.Item label="Tác giả">
            {dataViewDetail?.movieDirector}
          </Descriptions.Item>

          <Descriptions.Item label="Diễn viên">
            {dataViewDetail?.movieActor}
          </Descriptions.Item>

          <Descriptions.Item label="Thể loại">
            {dataViewDetail?.movieType?.movieTypeName}
          </Descriptions.Item>

          <Descriptions.Item label="Thời lượng">
            {dataViewDetail?.movieTime}
          </Descriptions.Item>

          <Descriptions.Item label="Ngôn ngữ">
            {dataViewDetail?.movieLanguage?.movieLanguageName}
          </Descriptions.Item>

          <Descriptions.Item label="Giới hạn độ tuổi">
            {dataViewDetail?.movieRated?.movieRatedName}
          </Descriptions.Item>

          <Descriptions.Item label="Ngày công chiếu">
            {dataViewDetail?.openday
              ? dayjs(dataViewDetail.openday).format(FORMATE_DATE_VN)
              : null}
          </Descriptions.Item>

          <Descriptions.Item label="Ngày kết thúc">
            {dataViewDetail?.closeday
              ? dayjs(dataViewDetail.closeday).format(FORMATE_DATE_VN)
              : null}
          </Descriptions.Item>

          <Descriptions.Item label="Trạng thái">
            {dataViewDetail?.movieStatus}
          </Descriptions.Item>
        </Descriptions>
      </Drawer>
    </>
  );
};
export default DetailMovie;
