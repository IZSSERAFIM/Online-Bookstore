import React from "react";
import { ConfigProvider, theme } from "antd";
import AppRouter from "./components/router";

const defaultData = {
  borderRadius: 6,
  colorPrimary: "#1677ff",
  Button: {
    colorPrimary: "#00B96B",
  },
};

function App() {
  const [data, setData] = React.useState(defaultData);
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
