import { App, Modal, Table } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import type { UploadProps } from "antd";
import { useState } from "react";
import Exceljs from "exceljs";
import { Buffer } from "buffer";
import { bulkCreateMovieAPI } from "@/services/api";
import templateFile from "assets/template/user.xlsx?url";
const { Dragger } = Upload;

interface IProps {
  openModalImport: boolean;
  setOpenModalImport: (v: boolean) => void;
  refreshTable: () => void;
}

interface IDataImport {
  movieName: string;
  movieDescription: string;
  movieDirector: string;
  movieActor: string;
  movieType: IMovieType;
  movieTime: string;
  movieLanguage: IMovieLanguage;
  movieRated: IMovieRated;
  openday: Date;
  closedate: Date;
}

const ImportMovie = (props: IProps) => {
  const { setOpenModalImport, openModalImport, refreshTable } = props;

  const { message, notification } = App.useApp();
  const [dataImport, setDataImport] = useState<IDataImport[]>([]);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const propsUpload: UploadProps = {
    name: "file",
    multiple: false,
    maxCount: 1,

    // https://stackoverflow.com/questions/11832930/html-input-file-accept-attribute-file-type-csv
    accept:
      ".csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

    // https://stackoverflow.com/questions/51514757/action-function-is-required-with-antd-upload-control-but-i-dont-need-it
    customRequest({ file, onSuccess }) {
      setTimeout(() => {
        if (onSuccess) onSuccess("ok");
      }, 1000);
    },

    async onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        // console.log(info.file, info.fileList);
      }
      if (status === "done") {
        // console.log(info)
        message.success(`${info.file.name} file uploaded successfully.`);
        if (info.fileList && info.fileList.length > 0) {
          const file = info.fileList[0].originFileObj!;

          //load file to buffer
          const workbook = new Exceljs.Workbook();
          const arrayBuffer = await file.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          await workbook.xlsx.load(buffer);

          //convert file to json
          let jsonData: IDataImport[] = [];
          workbook.worksheets.forEach(function (sheet) {
            // read first row as data keys
            const firstRow = sheet.getRow(1);
            if (!firstRow.cellCount) return;

            const keys = firstRow.values as any[];

            sheet.eachRow((row, rowNumber) => {
              if (rowNumber == 1) return;
              const values = row.values as any;
              const obj: any = {};
              for (let i = 1; i < keys.length; i++) {
                obj[keys[i]] = values[i];
              }
              jsonData.push(obj);
            });
          });
          jsonData = jsonData.map((item, index) => {
            return { ...item, id: index + 1 };
          });
          setDataImport(jsonData);
        }
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      // console.log('Dropped files', e.dataTransfer.files);
    }
  };

  const handleImport = async () => {
    setIsSubmit(true);
    const dataSubmit = dataImport.map((item) => ({
      movieName: item.movieName,
      movieDescription: item.movieDescription,
      movieDirector: item.movieDirector,
      movieActor: item.movieActor,
      movieType: item.movieType,
      movieTime: item.movieTime,
      movieLanguage: item.movieLanguage,
      movieRated: item.movieRated,
      openday: item.openday,
      closedate: item.closedate,
      password: import.meta.env.VITE_USER_CREATE_DEFAULT_PASSWORD
    }));
    const res = await bulkCreateMovieAPI(dataSubmit);
    if (res.data) {
      notification.success({
        message: "Bulk Create Movies",
        description: `Success = ${res.data.countSuccess}. Error = ${res.data.countError}`
      });
    }
    setIsSubmit(false);
    setOpenModalImport(false);
    setDataImport([]);
    refreshTable();
  };

  return (
    <>
      <Modal
        title="Import data movie"
        width={"50vw"}
        open={openModalImport}
        onOk={() => handleImport()}
        onCancel={() => {
          setOpenModalImport(false);
          setDataImport([]);
        }}
        okText="Import data"
        okButtonProps={{
          disabled: dataImport.length > 0 ? false : true,
          loading: isSubmit
        }}
        //do not close when click outside
        maskClosable={false}
        destroyOnClose={true}
      >
        <Dragger {...propsUpload}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single upload. Only accept .csv, .xls, .xlsx . or
            &nbsp;
            <a
              onClick={(e) => e.stopPropagation()}
              href={templateFile}
              download
            >
              Download Sample File
            </a>
          </p>
        </Dragger>
        <div style={{ paddingTop: 20 }}>
          <Table
            rowKey={"id"}
            title={() => <span>Dữ liệu upload:</span>}
            dataSource={dataImport}
            columns={[
              { dataIndex: "movieName", title: "Tên phim" },
              { dataIndex: "movieDescription", title: "Mô tả phim" },
              { dataIndex: "movieDirector", title: "Đạo diễn" },
              { dataIndex: "movieActor", title: "Diễn viên" },
              { dataIndex: "movieType", title: "Thể loại" },
              { dataIndex: "movieTime", title: "Thời lượng" },
              { dataIndex: "movieLanguage", title: "Ngôn ngữ" },
              { dataIndex: "movieRated", title: "Giới hạn độ tuổi" },
              { dataIndex: "openday", title: "Ngày ra mắt" },
              { dataIndex: "closeday", title: "Ngày kết thúc" }
            ]}
          />
        </div>
      </Modal>
    </>
  );
};

export default ImportMovie;
