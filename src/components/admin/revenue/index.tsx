// import { getDashboardAPI } from "@/services/api";
import { Card, Col, Row, Statistic } from "antd";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import RcResizeObserver from "rc-resize-observer";
import { ProCard, StatisticCard } from "@ant-design/pro-components";

const RevenueDashboard = () => {
  const [responsive, setResponsive] = useState(false);

  const [dataDashboard, setDataDashboard] = useState({
    countBooking: 0,
    countUser: 0,
    countMovie: 0
  });

  useEffect(() => {
    const initDashboard = async () => {
      // const res = await getDashboardAPI();
      if (res && res.data) setDataDashboard(res.data);
    };
    initDashboard();
  }, []);

  const formatter = (value: any) => <CountUp end={value} separator="," />;
  return (
    <Row gutter={[40, 40]}>
      <Col span={8}>
        <Card title="" bordered={false}>
          <Statistic
            title="Tổng Vé Đã Bán"
            value={dataDashboard.countBooking}
            precision={2}
            formatter={formatter}
          />
        </Card>
      </Col>

      <Col span={8}>
        <Card title="" bordered={false}>
          <Statistic
            title="Tổng Users"
            value={dataDashboard.countUser}
            formatter={formatter}
          />
        </Card>
      </Col>

      <Col span={8}>
        <Card title="" bordered={false}>
          <Statistic
            title="Tổng Phim"
            value={dataDashboard.countMovie}
            precision={2}
            formatter={formatter}
          />
        </Card>
      </Col>
      
      <Col span={24}>
        <RcResizeObserver
          key="resize-observer"
          onResize={(offset) => {
            setResponsive(offset.width < 596);
          }}
        >
          <ProCard
            title="数据概览"
            extra="2019年9月28日 星期五"
            split={responsive ? "horizontal" : "vertical"}
            headerBordered
            bordered
          >
            <ProCard split="horizontal">
              <ProCard split="horizontal">
                <ProCard split="vertical">
                  <StatisticCard
                    statistic={{
                      title: "昨日全部流量",
                      value: 234,
                      description: (
                        <Statistic
                          title="较本月平均流量"
                          value="8.04%"
                          trend="down"
                        />
                      )
                    }}
                  />
                  <StatisticCard
                    statistic={{
                      title: "本月累计流量",
                      value: 234,
                      description: (
                        <Statistic title="月同比" value="8.04%" trend="up" />
                      )
                    }}
                  />
                </ProCard>
                <ProCard split="vertical">
                  <StatisticCard
                    statistic={{
                      title: "运行中实验",
                      value: "12/56",
                      suffix: "个"
                    }}
                  />
                  <StatisticCard
                    statistic={{
                      title: "历史实验总数",
                      value: "134",
                      suffix: "个"
                    }}
                  />
                </ProCard>
              </ProCard>
              <StatisticCard
                title="流量走势"
                chart={
                  <img
                    src="https://gw.alipayobjects.com/zos/alicdn/_dZIob2NB/zhuzhuangtu.svg"
                    width="100%"
                  />
                }
              />
            </ProCard>
            <StatisticCard
              title="流量占用情况"
              chart={
                <img
                  src="https://gw.alipayobjects.com/zos/alicdn/qoYmFMxWY/jieping2021-03-29%252520xiawu4.32.34.png"
                  alt="大盘"
                  width="100%"
                />
              }
            />
          </ProCard>
        </RcResizeObserver>
      </Col>
    </Row>
  );
};

export default RevenueDashboard;
