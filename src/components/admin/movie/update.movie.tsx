import { useEffect, useState } from "react";
import { App, Divider, Form, Input, Modal, Select } from "antd";
import type { FormProps } from "antd";
import { updateMovieAPI } from "@/services/api";

interface IProps {
  openModalUpdate: boolean;
  setOpenModalUpdate: (v: boolean) => void;
  refreshTable: () => void;
  setDataUpdate: (v: IMovie | null) => void;
  dataUpdate: IMovie | null;
}

type FieldType = {
  mid: number;
  movieName: string;
  movieDescription: string;
  movieDirector: string;
  movieActor: string;
  movieType: IMovieType;
  movieTime: string;
  movieLanguage: IMovieLanguage;
  movieRated: IMovieRated;
  poster: string;
  banner: string;
  openday: Date;
  closeday: Date;
  movieStatus: number;
};

const UpdateMovie = (props: IProps) => {
  const {
    openModalUpdate,
    setOpenModalUpdate,
    refreshTable,
    setDataUpdate,
    dataUpdate
  } = props;
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const { message, notification } = App.useApp();

  // https://ant.design/components/form#components-form-demo-control-hooks
  const [form] = Form.useForm();

  useEffect(() => {
    if (dataUpdate) {
      form.setFieldsValue({
        mid: dataUpdate.mid,
        movieName: dataUpdate.movieName,
        movieDescription: dataUpdate.movieDescription,
        movieDirector: dataUpdate.movieDirector,
        movieActor: dataUpdate.movieActor,
        movieType: dataUpdate.movieType?.movieTypeName,
        movieTime: dataUpdate.movieTime,
        movieLanguage: dataUpdate.movieLanguage?.movieLanguageName,
        movieRated: dataUpdate.movieRated?.movieRatedName,
        openday: dataUpdate.openday,
        closeday: dataUpdate.closeday,
        movieStatus: dataUpdate.movieStatus
      });
    }
  }, [dataUpdate]);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const {
      mid,
      movieName,
      movieDescription,
      movieDirector,
      movieActor,
      movieType,
      movieTime,
      movieLanguage,
      movieRated,
      poster,
      banner,
      openday,
      closeday,
      movieStatus
    } = values;
    setIsSubmit(true);
    const res = await updateMovieAPI(
      mid,
      movieName,
      movieDescription,
      movieDirector,
      movieActor,
      movieType,
      movieTime,
      movieLanguage,
      movieRated,
      poster,
      banner,
      openday,
      closeday,
      movieStatus
    );
    if (res && res.data) {
      message.success("Update movie successfully!");
      form.resetFields();
      setOpenModalUpdate(false);
      setDataUpdate(null);
      refreshTable();
    } else {
      notification.error({
        message: "Đã có lỗi xảy ra",
        description: res.message
      });
    }
    setIsSubmit(false);
  };

  return (
    <>
      <Modal
        title="Cập nhật phim"
        open={openModalUpdate}
        onOk={() => {
          form.submit();
        }}
        onCancel={() => {
          setOpenModalUpdate(false);
          setDataUpdate(null);
          form.resetFields();
        }}
        okText={"Cập nhật"}
        cancelText={"Hủy"}
        confirmLoading={isSubmit}
      >
        <Divider />

        <Form
          form={form}
          name="form-update"
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            hidden
            labelCol={{ span: 24 }}
            label="mid"
            name="mid"
            rules={[{ required: true, message: "Vui lòng nhập mid!" }]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item<FieldType>
            labelCol={{ span: 24 }}
            label="Tên phim"
            name="movieName"
            rules={[{ required: true, message: "Vui lòng nhập tên phim!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            labelCol={{ span: 24 }}
            label="Miêu tả phim"
            name="movieDescription"
            rules={[{ required: true, message: "Vui lòng nhập miêu tả phim!" }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item<FieldType>
            labelCol={{ span: 24 }}
            label="Đạo diễn"
            name="movieDirector"
            rules={[{ required: true, message: "Vui lòng nhập đạo diễn!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            labelCol={{ span: 24 }}
            label="Diễn viên"
            name="movieActor"
            rules={[{ required: true, message: "Vui lòng nhập diễn viên!" }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item<FieldType>
            labelCol={{ span: 24 }}
            label="Thể loại"
            name="movieType"
            rules={[{ required: true, message: "Vui lòng chọn thể loại!" }]}
          >
            <Select placeholder="Chọn thể loại">
              <Select.Option value="1">Hài</Select.Option>
              <Select.Option value="2">Tình cảm</Select.Option>
              <Select.Option value="3">Gia đình</Select.Option>
              <Select.Option value="4">Hoạt hình</Select.Option>
              <Select.Option value="5">Tâm lý</Select.Option>
              <Select.Option value="6">Hành động</Select.Option>
              <Select.Option value="7">Tội phạm</Select.Option>
              <Select.Option value="8">Hồi hộp</Select.Option>
              <Select.Option value="9">Kinh dị</Select.Option>
              <Select.Option value="10">Bí ẩn</Select.Option>
              <Select.Option value="11">Khoa học viễn tưởng</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item<FieldType>
            labelCol={{ span: 24 }}
            label="Thời lượng"
            name="movieTime"
            rules={[{ required: true, message: "Vui lòng nhập thời lượng!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            labelCol={{ span: 24 }}
            label="Ngôn ngữ"
            name="movieLanguage"
            rules={[{ required: true, message: "Vui lòng chọn ngôn ngữ!" }]}
          >
            <Select placeholder="Chọn ngôn ngữ">
              <Select.Option value="1">Phụ đề Tiếng Anh</Select.Option>
              <Select.Option value="2">
                Tiếng Việt - Phụ đề Tiếng Anh
              </Select.Option>
              <Select.Option value="3">Phụ đề Tiếng Việt</Select.Option>
              <Select.Option value="4">Phụ đề Tiếng Anh</Select.Option>
              <Select.Option value="5">Lồng Tiếng Việt</Select.Option>
              <Select.Option value="6">meo meo, gâu gâu</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item<FieldType>
            labelCol={{ span: 24 }}
            label="Giới hạn độ tuổi"
            name="movieRated"
            rules={[
              { required: true, message: "Vui lòng chọn giới hạn độ tuổi!" }
            ]}
          >
            <Select placeholder="Chọn giới hạn độ tuổi">
              <Select.Option value="1">
                P - PHIM ĐƯỢC PHÉP PHỔ BIẾN RỘNG RÃI ĐẾN MỌI ĐUỐI TƯỢNG
              </Select.Option>
              <Select.Option value="2">
                K - PHIM ĐƯỢC PHỔ BIẾN ĐẾN NGƯỜI XEM DƯỚI 13 TUỔI VÀ CÓ NGƯỜI
                BẢO HỘ ĐI KÈM
              </Select.Option>
              <Select.Option value="3">
                T13 - PHIM CẤM PHỔ BIẾN ĐẾN KHÁN GIẢ DƯỚI 13 TUỔI
              </Select.Option>
              <Select.Option value="4">
                T16 - PHIM CẤM PHỔ BIẾN ĐẾN KHÁN GIẢ DƯỚI 16 TUỔI
              </Select.Option>
              <Select.Option value="5">
                T18 - PHIM CẤM PHỔ BIẾN ĐẾN KHÁN GIẢ DƯỚI 18 TUỔI
              </Select.Option>
              <Select.Option value="6">
                C - PHIM KHÔNG ĐƯỢC PHÉP PHỔ BIẾN
              </Select.Option>
            </Select>
          </Form.Item>

          <Form.Item<FieldType>
            labelCol={{ span: 24 }}
            label="Ngày ra mắt"
            name="openday"
            rules={[{ required: true, message: "Vui lòng nhập ngày ra mắt!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            labelCol={{ span: 24 }}
            label="Ngày kết thúc"
            name="closeday"
            rules={[
              { required: true, message: "Vui lòng nhập ngày kết thúc!" }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            labelCol={{ span: 24 }}
            label="Trạng thái"
            name="movieStatus"
            rules={[{ required: true, message: "Vui lòng nhập trạng thái!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateMovie;
