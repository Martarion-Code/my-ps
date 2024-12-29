import { SearchOutlined } from "@ant-design/icons";
import { Input, Col, Form, Select, ConfigProvider, Row } from "antd";
import { debounce } from "lodash";
import { useState } from "react";
import { searchTransactions } from "../../../actions";
import MainRangePicker from "@/components/Forms/Input/Date/RangePicker";

const SearchTransactions = ({ onSearch }) => {
  const [loading, setLoading] = useState(false);

  const handleSearch = async ({ search, status, date }) => {
    setLoading(true);
    const result = await searchTransactions({
      search: search,
      status: status,
      date: date,
    });

    if ([200, 404].includes(result.status)) {
      setLoading(false);
      onSearch(result);
    }

    console.log("result", result);
  };

  return (
    <Form
      // initialValues={{
      //   search: _search,
      //   status: _status,
      // }}
      onValuesChange={debounce((values) => handleSearch(values), 300)}
    >
      <Row gutter={[20, 20]} justify="end" style={{ justifyContent: "end" }}>
        <Col
          {...{
            xxl: 6,
            xl: 6,
            lg: 6,
            md: 6,
            sm: 6,
            xs: 24,
          }}
        >
          <Form.Item name="search">
            <Input
              size="medium"
              prefix={
                <>
                  <SearchOutlined />
                </>
              }
              style={{
                backgroundColor: "#eff6ff",
                borderRadius: "5px",
                border: "none",
                padding: "5px 1rem",
                fontSize: ".9rem",
              }}
              placeholder="Search"
              allowClear
            />
          </Form.Item>
        </Col>
        <Col
          {...{
            xxl: 6,
            xl: 6,
            lg: 6,
            md: 6,
            sm: 6,
            xs: 24,
          }}
        >
          <ConfigProvider
            theme={{
              token: {
                colorBgBase: "#eff6ff",
                colorBorder: "transparent",
                colorPrimaryHover: "transparent",
              },
            }}
          >
            <Form.Item name="status">
              <Select
                dropdownStyle={{ background: "white" }}
                options={[
                  {
                    label: "Diterima",
                    value: true,
                  },
                  {
                    label: "Ditolak",
                    value: false,
                  },
                  {
                    label: "Belum Ditentukan",
                    value: "pending",
                  },
                ]}
                size="medium"
                prefix={<SearchOutlined />}
                style={{
                  borderRadius: "5px",
                  border: "none",
                  fontSize: ".9rem",
                }}
                placeholder="Status"
                allowClear
              />
            </Form.Item>
          </ConfigProvider>
        </Col>
        <Col
          {...{
            xxl: 6,
            xl: 6,
            lg: 6,
            md: 6,
            sm: 6,
            xs: 24,
          }}
        >
          <Form.Item name="date">
            <MainRangePicker
              style={{
                backgroundColor: "#eff6ff",
                borderRadius: "5px",
                border: "none",
                padding: "5px 1rem",
                fontSize: ".9rem",
              }}
              valueFormat="YYYY-MM-DD"
              parseFormat="YYYY-MM-DD"
              format="YYYY-MM-DD"
            />
          </Form.Item>
          {/* <Button></Button>  */}
        </Col>
      </Row>
    </Form>
  );
};

export default SearchTransactions;
