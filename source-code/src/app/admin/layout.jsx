import { Layout } from "antd";
import { Content } from "antd/lib/layout/layout";
import HeaderComponent from "@/components/Layout/Header";
import SiderWithState from "@/components/Layout/Sidebar";


const LayoutComponent = ({ children }) => {
  return (
    <Layout style={{ minHeight: "100vh" }} hasSider>
      {/* Include the client-side subcomponent */}
      <SiderWithState />
      <Layout>
        <HeaderComponent />
        <Content
          style={{
            margin: "1rem",
            display: "flex",
            minHeight: "calc(100vh - 2rem)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              overflowX: "auto",
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;
