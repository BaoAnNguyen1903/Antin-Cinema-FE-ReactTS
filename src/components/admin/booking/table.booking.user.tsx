// import { getOrdersAPI } from "@/services/api";
import { dateRangeValidate } from "@/services/helper";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { useRef, useState } from "react";

type TSearch = {
  name: string;
};

const TableBookingUser = () => {
  const actionRef = useRef<ActionType>();
  const [meta, setMeta] = useState({
    current: 1,
    pageSize: 10,
    pages: 0,
    total: 0
  });

  const columns: ProColumns<IBookingTable>[] = [
    {
      dataIndex: "index",
      valueType: "indexBorder",
      width: 48
    },
    {
      title: "ID",
      dataIndex: "bid",
      hideInSearch: true,
      render(dom, entity, index, action, schema) {
        return <a href="#">{entity._id}</a>;
      }
    },
    {
      title: "Name",
      dataIndex: "name"
    },
    {
      title: "Email",
      dataIndex: "email"
    },
    {
      title: "Giá tiền",
      dataIndex: "totalPrice",
      hideInSearch: true,
      sorter: true,
      // https://stackoverflow.com/questions/37985642/vnd-currency-formatting
      render(dom, entity, index, action, schema) {
        return (
          <>
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND"
            }).format(entity.totalPrice)}
          </>
        );
      }
    }
  ];

  return (
    <>
      <ProTable<IBookingTable, TSearch>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params, sort, filter) => {
          let query = "";
          if (params) {
            query += `current=${params.current}&pageSize=${params.pageSize}`;

            if (params.name) {
              query += `&name=/${params.name}/i`;
            }
          }

          //default

          if (sort && sort.createdAt) {
            query += `&sort=${
              sort.createdAt === "ascend" ? "createdAt" : "-createdAt"
            }`;
          } else query += `&sort=-createdAt`;

          const res = await getBookingsAPI(query);
          if (res.data) {
            setMeta(res.data.meta);
          }
          return {
            data: res.data?.result,
            page: 1,
            success: true,
            total: res.data?.meta.total
          };
        }}
        rowKey="_id"
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
        headerTitle="Table User Booking"
      />
    </>
  );
};

export default TableBookingUser;
