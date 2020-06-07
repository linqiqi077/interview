import React from 'react';

import { Form, Input, Button, Select, Card, Col, Row } from 'antd';
const { Option } = Select;

interface ISearchProps {
  onSearch: (value: any) => void;
  onAdd: () => void;
}
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};

const SearchContions = (props: ISearchProps) => {
  const [form] = Form.useForm();
  const { onAdd, onSearch } = props;


  const onFinish = (values: any) => {
    onSearch(values)
  }

  const onReset = () => {
    form.resetFields();
    onSearch({ title: undefined, type: undefined })
  }

  return (
    <Card style={{ marginBottom: 24 }}>
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        <Row>
          <Col span={8}>
            <Form.Item name="title" label="标题">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="type" label="类型">
              <Select
                placeholder="请选择类型"
                allowClear
              >
                <Option value="1">前端</Option>
                <Option value="2">后端</Option>
                <Option value="3">数据库</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button htmlType="button" onClick={onReset} style={{ margin: '0 8px' }}>
                重置
              </Button>
              <Button type="primary" onClick={onAdd}>
                新增
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  )
}

export default SearchContions;
