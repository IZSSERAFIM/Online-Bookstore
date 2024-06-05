import { Column } from "@ant-design/plots";

export default function CustomerRankChart({ customers }) {

  console.log(customers);
  const data = customers.map((customer) => ({
    level: customer.level,
    name: customer.name,
  }));
  const config = {
    data,
    xField: "name",
    yField: "level",
    label: {
      position: "inside",
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: true,
      },
    },
    meta: {
      title: {
        alias: "书名",
      },
      sales: {
        alias: "销量",
      },
    },
  };
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Column {...config} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
      </div>
    </div>
  );
}
