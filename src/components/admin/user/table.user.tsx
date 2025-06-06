import { deleteUserAPI, getUsersAPI } from "@/services/api";
import { dateRangeValidate } from "@/services/helper";
import {
  CloudUploadOutlined,
  DeleteTwoTone,
  EditTwoTone,
  ExportOutlined,
  PlusOutlined
} from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { App, Button, Popconfirm } from "antd";
import { useRef, useState } from "react";
import DetailUser from "./detail.user";
import CreateUser from "./create.user";
import ImportUser from "./import.user";
import { CSVLink } from "react-csv";
import UpdateUser from "./update.user";
import dayjs from "dayjs";

type TSearch = {
  name: string;
  email: string;
};

const TableUser = () => {
  const actionRef = useRef<ActionType>();
  const [meta, setMeta] = useState({
    current: 1,
    pageSize: 10,
    pages: 0,
    total: 0
  });

  const [openViewDetail, setOpenViewDetail] = useState<boolean>(false);
  const [dataViewDetail, setDataViewDetail] = useState<IUser | null>(null);

  const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);
  const [openModalImport, setOpenModalImport] = useState<boolean>(false);

  const [currentDataTable, setCurrentDataTable] = useState<IUser[]>([]); // tạo state để lưu data để export

  const [openModalUpdate, setOpenModalUpdate] = useState<boolean>(false);
  const [dataUpdate, setDataUpdate] = useState<IUser | null>(null);

  const [isDeleteUser, setIsDeleteUser] = useState<boolean>(false);
  const { message, notification } = App.useApp();

  const handleDeleteUser = async (uid: number) => {
    setIsDeleteUser(true);
    const res = await deleteUserAPI(uid);
    if (res && res.data) {
      message.success("Xóa user thành công");
      refreshTable();
    } else {
      notification.error({
        message: "Admin không cho xóa =))"
        // description: res.message
      });
    }
    setIsDeleteUser(false);
  };

  const columns: ProColumns<IUser>[] = [
    {
      dataIndex: "index",
      valueType: "indexBorder",
      width: 48
    },
    {
      title: "ID",
      dataIndex: "uid",
      hideInSearch: true,
      render(dom, entity, index, action, schema) {
        return (
          <a
            onClick={() => {
              setDataViewDetail(entity);
              setOpenViewDetail(true);
            }}
            href="#"
          >
            {entity.uid}
          </a>
        );
      }
    },
    {
      title: "Name",
      dataIndex: "name"
    },
    // {
    //   title: "Date of birth",
    //   dataIndex: "dob",
    //   valueType: "date",
    //   hideInSearch: true,
    //   render(dom, entity, index, action, schema) {
    //     return (
    //       <>{entity.dob ? dayjs(entity.dob).format("DD-MM-YYYY") : null}</>
    //     );
    //   }
    // },
    {
      title: "Gender",
      dataIndex: "gender",
      hideInSearch: true
    },
    {
      title: "Phone",
      dataIndex: "phone",
      hideInSearch: true
    },
    {
      title: "Email",
      dataIndex: "email",
      copyable: true
    },
    {
      title: "Action",
      hideInSearch: true,
      render(dom, entity, index, action, schema) {
        return (
          <>
            <EditTwoTone
              twoToneColor="#f57800"
              style={{ cursor: "pointer", marginRight: 15 }}
              onClick={() => {
                setDataUpdate(entity);
                setOpenModalUpdate(true);
              }}
            />
            <Popconfirm
              placement="leftTop"
              title={"Xác nhận xóa user"}
              description={"Bạn có chắc chắn muốn xóa user này ?"}
              onConfirm={() => handleDeleteUser(entity.uid)}
              okText="Xác nhận"
              cancelText="Hủy"
              okButtonProps={{ loading: isDeleteUser }}
            >
              <span style={{ cursor: "pointer", marginLeft: 20 }}>
                <DeleteTwoTone
                  twoToneColor="#ff4d4f"
                  style={{ cursor: "pointer" }}
                />
              </span>
            </Popconfirm>
          </>
        );
      }
    }
  ];

  const refreshTable = () => {
    actionRef.current?.reload();
  };

  return (
    <>
      <ProTable<IUser, TSearch>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params, sort, filter) => {
          let query = "";
          if (params) {
            query += `current=${params.current}&pageSize=${params.pageSize}`;
            // Cách viết /value/i là cú pháp RegExp trong MongoDB
            // if (params.email) {
            //   query += `&email=/${params.email}/i`;
            // }
            // if (params.name) {
            //   query += `&name=/${params.name}/i`;
            // }

            if (params.email) {
              query += `&email=${encodeURIComponent(params.email)}`;
            }
            if (params.name) {
              query += `&name=${encodeURIComponent(params.name)}`;
            }
          }

          const res = await getUsersAPI(query);
          if (res.data) {
            setMeta(res.data.meta);
            setCurrentDataTable(res.data?.result ?? []); // gán data để export
          }
          return {
            data: res.data?.result,
            page: 1,
            success: true,
            total: res.data?.meta.total
          };
        }}
        rowKey="uid"
        pagination={{
          current: meta.current,
          pageSize: meta.pageSize,
          showSizeChanger: true,
          total: meta.total,
          showTotal: (total, range) => {
            return (
              <div>
                {" "}
                {range[0]}-{range[1]} trên {total} rows
              </div>
            );
          }
        }}
        headerTitle="Table user"
        toolBarRender={() => [
          <CSVLink data={currentDataTable} filename="export-user.csv">
            <Button icon={<ExportOutlined />} type="primary">
              Export
            </Button>
          </CSVLink>,
          <Button
            icon={<CloudUploadOutlined />}
            type="primary"
            onClick={() => setOpenModalImport(true)}
          >
            Import
          </Button>,

          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              setOpenModalCreate(true);
            }}
            type="primary"
          >
            Add new
          </Button>
        ]}
      />
      <DetailUser
        openViewDetail={openViewDetail}
        setOpenViewDetail={setOpenViewDetail}
        dataViewDetail={dataViewDetail}
        setDataViewDetail={setDataViewDetail}
      />

      <CreateUser
        openModalCreate={openModalCreate}
        setOpenModalCreate={setOpenModalCreate}
        refreshTable={refreshTable}
      />

      <ImportUser
        openModalImport={openModalImport}
        setOpenModalImport={setOpenModalImport}
        refreshTable={refreshTable}
      />

      <UpdateUser
        openModalUpdate={openModalUpdate}
        setOpenModalUpdate={setOpenModalUpdate}
        refreshTable={refreshTable}
        setDataUpdate={setDataUpdate}
        dataUpdate={dataUpdate}
      />
    </>
  );
};

export default TableUser;
