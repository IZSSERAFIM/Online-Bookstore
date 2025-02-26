import React from "react";
import { ConfigProvider, theme } from "antd";
import AppRouter from "./components/router";
import interceptor from "./service/interceptor"; // 导入axios实例
import { ApolloProvider } from "@apollo/client";
import client from "./client";

const defaultData = {
  borderRadius: 6,
  colorPrimary: "#1677ff",
  Button: {
    colorPrimary: "#00B96B",
  },
};

function App() {
  const [data, setData] = React.useState(defaultData);

  // 使用api实例发送请求
  // React.useEffect(() => {
  //   interceptor.get('/**') // 更新为你实际的API路径
  //     .then(response => {
  //       console.log(response);
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }, []);

  return (
    <ApolloProvider client={client}>
      <ConfigProvider
        theme={{
          algorithm: theme.defaultAlgorithm,
          token: {
            colorPrimary: data.colorPrimary,
            borderRadius: data.borderRadius,
          },
          components: {
            Button: {
              colorPrimary: data.Button?.colorPrimary,
              algorithm: data.Button?.algorithm,
            },
          },
        }}
      >
        <AppRouter />
      </ConfigProvider>
    </ApolloProvider>
  );
}

export default App;
