import { UUDAI } from "@/helpers/data";
import { Col, Row } from "antd";
import UudaiCard from "./uuDaiCard";
import { Link } from "react-router-dom";

const UuDai = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ maxWidth: "1200px", width: "100%", padding: "20px" }}>
        <Row justify="center" style={{ marginBottom: 20 }}>
          <Col>
            <h1 className="text-center">Khuyến Mãi & Ưu Đãi</h1>
          </Col>
        </Row>

        <Row gutter={[20, 20]} justify="center">
          {UUDAI?.map((item) => (
            <Col md={6} sm={12} xs={24} key={item.id} className="uudai-card">
              <Link to="qua-mung-len-hang-uu-dai-thanh-vien-antin-2025">
                <UudaiCard
                  imgPath={item.imgPath}
                  title={item.title}
                  duration={item.duration}
                />
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default UuDai;
