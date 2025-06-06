import { useState } from "react";
import {
  App,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Select,
  Upload
} from "antd";
import type { FormProps } from "antd";
import { createMovieAPI } from "@/services/api";
import { PlusOutlined } from "@ant-design/icons";
import { FORMATE_DATE_VN } from "@/services/helper";

interface IProps {
  openModalCreate: boolean;
  setOpenModalCreate: (v: boolean) => void;
  refreshTable: () => void;
}

type FieldType = {
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

const CreateMovie = (props: IProps) => {
  const { openModalCreate, setOpenModalCreate, refreshTable } = props;
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const { message, notification } = App.useApp();

  // https://ant.design/components/form#components-form-demo-control-hooks
  const [form] = Form.useForm();

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const {
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
    const res = await createMovieAPI(
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
      message.success("Create movie successfully!");
      form.resetFields();
      setOpenModalCreate(false);
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
        title="Thêm mới phim"
        open={openModalCreate}
        onOk={() => {
          form.submit();
        }}
        onCancel={() => {
          setOpenModalCreate(false);
          form.resetFields();
        }}
        okText={"Tạo mới"}
        cancelText={"Hủy"}
        confirmLoading={isSubmit}
      >
        <Divider />

        <Form
          form={form}
          name="basic"
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            labelCol={{ span: 24 }}
            label="Tên Phim"
            name="movieName"
            rules={[{ required: true, message: "Vui lòng nhập tên phim!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            labelCol={{ span: 24 }}
            label="Miêu tả phim"
            name="movieDescription"
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            labelCol={{ span: 24 }}
            label="Đạo diễn"
            name="movieDirector"
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            labelCol={{ span: 24 }}
            label="Diễn viên"
            name="movieActor"
          >
            <Input />
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

          <Form.Item
            labelCol={{ span: 24 }}
            label="Upload"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload action="/upload.do" listType="picture-card">
              <button
                style={{
                  color: "inherit",
                  cursor: "inherit",
                  border: 0,
                  background: "none"
                }}
                type="button"
              >
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            </Upload>
          </Form.Item>

          <Form.Item<FieldType>
            labelCol={{ span: 24 }}
            label="Ngày ra mắt"
            name="openday"
            rules={[{ required: true, message: "Vui lòng chọn ngày ra mắt!" }]}
          >
            <DatePicker format={FORMATE_DATE_VN} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item<FieldType>
            labelCol={{ span: 24 }}
            label="Ngày kết thúc"
            name="closeday"
            rules={[
              { required: true, message: "Vui lòng chọn ngày kết thúc!" }
            ]}
          >
            <DatePicker format={FORMATE_DATE_VN} style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateMovie;
