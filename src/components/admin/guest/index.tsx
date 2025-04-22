import { getGuestsAPI } from "@/services/api";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { useRef, useState } from "react";

type TSearch = {
  fullName: string;
  phone: string;
  email: string;
};

const TableGuest = () => {
  const actionRef = useRef<ActionType>();
  const [meta, setMeta] = useState({
    current: 1,
    pageSize: 10,
    pages: 0,
    total: 0
  });

  const columns: ProColumns<IGuest>[] = [
    {
      dataIndex: "index",
      valueType: "indexBorder",
      width: 48
    },
    {
      title: "ID",
      dataIndex: "kid",
      hideInSearch: true
      //   render(dom, entity, index, action, schema) {
      //     return <a href="#">{entity.kid}</a>;
      //   }
    },
    {
      title: "Full Name",
      dataIndex: "fullName"
    },
    {
      title: "Phone",
      dataIndex: "phone"
    },
    {
      title: "Email",
      dataIndex: "email"
    }
  ];

  return (
    <>
      <ProTable<IGuest, TSearch>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params, sort, filter) => {
          let query = "";
          if (params) {
            query += `current=${params.current}&pageSize=${params.pageSize}`;

            if (params.fullName) {
              query += `&fullName=/${params.fullName}/i`;
            }

            if (params.phone) {
              query += `&phone=/${params.phone}/i`;
            }

            if (params.email) {
              query += `&email=/${params.email}/i`;
            }
          }

          //default

          //   if (sort && sort.createdAt) {
          //     query += `&sort=${
          //       sort.createdAt === "ascend" ? "createdAt" : "-createdAt"
          //     }`;
          //   } else query += `&sort=-createdAt`;

          const res = await getGuestsAPI(query);
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
        rowKey="kid"
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
        headerTitle="Table Guests"
      />
    </>
  );
};

export default TableGuest;
