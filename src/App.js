import React from "react";
import { ConfigProvider, theme } from "antd";
import AppRouter from "./components/router";
import intercepter from './service/intercepter'; // 导入axios实例

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
  React.useEffect(() => {
    intercepter.get('/some-endpoint')
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
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
  );
}

export default App;