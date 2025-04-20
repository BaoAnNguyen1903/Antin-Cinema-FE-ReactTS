import { useEffect, useState } from "react";
import { App, Divider, Form, Input, InputNumber, Modal, Select } from "antd";
import { FormProps, DatePicker } from "antd";
import { updateUserAPI } from "@/services/api";
import { FORMATE_DATE_VN } from "@/services/helper";
import dayjs from "dayjs";

interface IProps {
  openModalUpdate: boolean;
  setOpenModalUpdate: (v: boolean) => void;
  refreshTable: () => void;
  setDataUpdate: (v: IUser | null) => void;
  dataUpdate: IUser | null;
}

type FieldType = {
  uid: number;
  name: string;
  dob: Date;
  gender: string;
  phone: string;
  email: string;
  username: string;
  points: number;
  status: number;
  role: string;
};

const UpdateUser = (props: IProps) => {
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
        uid: dataUpdate.uid,
        name: dataUpdate.name,
        dob: dataUpdate.dob ? dayjs(dataUpdate.dob) : null,
        gender: dataUpdate.gender,
        phone: dataUpdate.phone,
        email: dataUpdate.email,
        username: dataUpdate.username,
        points: dataUpdate.points,
        status: dataUpdate.status,
        role: dataUpdate.role
      });
    }
  }, [dataUpdate]);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const {
      uid,
      name,
      dob,
      gender,
      phone,
      email,
      username,
      points,
      status,
      role
    } = values;
    setIsSubmit(true);
    const res = await updateUserAPI(
      uid,
      name,
      dob,
      gender,
      phone,
      email,
      username,
      points,
      status,
      role
    );
    if (res && res.data) {
      message.success("Cập nhật user thành công");
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
        title="Cập nhật người dùng"
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
            label="uid"
            name="uid"
            rules={[{ required: true, message: "Vui lòng nhập uid!" }]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item<FieldType>
            labelCol={{ span: 24 }}
            label="Tên hiển thị"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên hiển thị!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            labelCol={{ span: 24 }}
            label="Ngày sinh"
            name="dob"
            rules={[{ required: true, message: "Vui lòng nhập ngày sinh!" }]}
          >
            <DatePicker format={FORMATE_DATE_VN} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item<FieldType>
            labelCol={{ span: 24 }}
            label="Giới tính"
            name="gender"
            rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}
          >
            <Select placeholder="Chọn giới tính">
              <Select.Option value="M">Nam</Select.Option>
              <Select.Option value="F">Nữ</Select.Option>
              <Select.Option value="O">Khác</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item<FieldType>
            labelCol={{ span: 24 }}
            label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            labelCol={{ span: 24 }}
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không đúng định dạng!" }
            ]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item<FieldType>
            labelCol={{ span: 24 }}
            label="Tài khoản"
            name="username"
            rules={[{ required: true, message: "Vui lòng nhập tài khoản!" }]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item<FieldType>
            labelCol={{ span: 24 }}
            label="Tích điểm"
            name="points"
            rules={[
              { required: true, message: "Vui lòng nhập tích điểm!" },
              { type: "number", max: 2147483647, message: "Giá trị quá lớn!" }
            ]}
          >
            <InputNumber style={{ width: "100%" }} min={0} max={2147483647} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateUser;
