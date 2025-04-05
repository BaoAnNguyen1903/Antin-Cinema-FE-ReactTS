import { UUDAI } from "@/helpers/data";
import { Col, Row } from "antd";
import UudaiCard from "./uuDaiCard";
import { Link } from "react-router-dom";

const UuDai = () => {
    return (
        <>
            <Row>
                <Col xs={12}>
                    <div>
                        <h3 className="text-center">
                            Khuyến Mãi & Ưu Đãi
                        </h3>
                    </div>
                </Col>
            </Row>

            <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
                {UUDAI?.map(item => {
                    return(
                        <Col md={4} className="uudai-card" key={item.id}>
                            <Link to='qua-mung-len-hang-uu-dai-thanh-vien-antin-2025'>
                                <UudaiCard
                                    imgPath={item.imgPath}
                                    title={item.title}
                                    duration={item.duration}
                                />
                            </Link>
                        </Col>
                    )
                })}
            </Row>
        </>
    )
}

export default UuDai;