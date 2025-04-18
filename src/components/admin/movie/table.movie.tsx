import { deleteUserAPI, getMoviesAPI } from "@/services/api";
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
import DetailMovie from "./detail.movie";
import CreateMovie from "./create.movie";
import ImportMovie from "./import.movie";
import { CSVLink } from "react-csv";
import UpdateMovie from "./update.movie";
import dayjs from "dayjs";

type TSearch = {
  movieName: string;
  movieType: string;
  openday: string;
  opendayAtRange: string;
};

const TableMovie = () => {
  const actionRef = useRef<ActionType>();  
  const [meta, setMeta] = useState({
    current: 1,
    pageSize: 10,
    pages: 0,
    total: 0
  });

  const [openViewDetail, setOpenViewDetail] = useState<boolean>(false);
  const [dataViewDetail, setDataViewDetail] = useState<IMovie | null>(null);

  const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);
  const [openModalImport, setOpenModalImport] = useState<boolean>(false);

  const [currentDataTable, setCurrentDataTable] = useState<IMovie[]>([]); // tạo state để lưu data để export

  const [openModalUpdate, setOpenModalUpdate] = useState<boolean>(false);
  const [dataUpdate, setDataUpdate] = useState<IMovie | null>(null);

  const [isDeleteMovie, setIsDeleteMovie] = useState<boolean>(false);
  const { message, notification } = App.useApp();

  const handleDeleteMovie = async (mid: number) => {
    setIsDeleteMovie(true);
    const res = await deleteUserAPI(mid);
    if (res && res.data) {
      message.success("Xóa movie thành công");
      refreshTable();
    } else {
      notification.error({
        message: "Đã có lỗi xảy ra",
        description: res.message
      });
    }
    setIsDeleteMovie(false);
  };

  const columns: ProColumns<IMovie>[] = [
    {
      dataIndex: "index",
      valueType: "indexBorder",
      width: 48
    },
    {
      title: "ID",
      dataIndex: "mid",
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
            {entity.mid}
          </a>
        );
      }
    },
    {
      title: "Tên phim",
      dataIndex: "movieName"
    },
    {
      title: "Thể loại",
      dataIndex: ["movieType", "movieTypeName"], // Truy xuất nested object
      render: (_, record) => record.movieType?.movieTypeName || "-"
    },
    {
      title: "Thời lượng",
      dataIndex: "movieTime",
      hideInSearch: true
    },
    {
      title: "Ngày ra mắt",
      dataIndex: "openday",
      valueType: "date",
      sorter: true,
      hideInSearch: true,
      render(dom, entity, index, action, schema) {
        return (
          <>
            {entity.openday ? dayjs(entity.openday).format("DD-MM-YYYY") : null}
          </>
        );
      }
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "closeday",
      valueType: "date",
      sorter: true,
      hideInSearch: true,
      render(dom, entity, index, action, schema) {
        return (
          <>
            {entity.closeday
              ? dayjs(entity.closeday).format("DD-MM-YYYY")
              : null}
          </>
        );
      }
    },
    {
      title: "Ngày ra mắt",
      dataIndex: "opendayAtRange",
      valueType: "dateRange",
      hideInTable: true
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
              title={"Xác nhận xóa movie"}
              description={"Bạn có chắc chắn muốn xóa movie này ?"}
              onConfirm={() => handleDeleteMovie(entity.mid)}
              okText="Xác nhận"
              cancelText="Hủy"
              okButtonProps={{ loading: isDeleteMovie }}
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
      <ProTable<IMovie, TSearch>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params, sort, filter) => {
          let query = "";
          if (params) {
            query += `current=${params.current}&pageSize=${params.pageSize}`;
            if (params.movieName) {
              query += `&movieName=/${params.movieName}/i`;
            }
            if (params.movieType) {
              query += `&movieType=/${params.movieType}/i`;
            }

            const createDateRange = dateRangeValidate(params.opendayAtRange);
            if (createDateRange) {
              query += `&createdAt>=${createDateRange[0]}&createdAt<=${createDateRange[1]}`;
            }
          }

          //default

          if (sort && sort.createdAt) {
            query += `&sort=${
              sort.createdAt === "ascend" ? "createdAt" : "-createdAt"
            }`;
          } else query += `&sort=-createdAt`;

          const res = await getMoviesAPI(query);
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
        rowKey="mid"
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
        headerTitle="Table Movie"
        toolBarRender={() => [
          <CSVLink data={currentDataTable} filename="export-movie.csv">
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
      <DetailMovie
        openViewDetail={openViewDetail}
        setOpenViewDetail={setOpenViewDetail}
        dataViewDetail={dataViewDetail}
        setDataViewDetail={setDataViewDetail}
      />

      <CreateMovie
        openModalCreate={openModalCreate}
        setOpenModalCreate={setOpenModalCreate}
        refreshTable={refreshTable}
      />

      <ImportMovie
        openModalImport={openModalImport}
        setOpenModalImport={setOpenModalImport}
        refreshTable={refreshTable}
      />

      <UpdateMovie
        openModalUpdate={openModalUpdate}
        setOpenModalUpdate={setOpenModalUpdate}
        refreshTable={refreshTable}
        setDataUpdate={setDataUpdate}
        dataUpdate={dataUpdate}
      />
    </>
  );
};

export default TableMovie;
