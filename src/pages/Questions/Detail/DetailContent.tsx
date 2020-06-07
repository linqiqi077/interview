import React, { useState, useEffect } from 'react';
import BraftEditor, { ControlType } from 'braft-editor';
import { Form, Select, Input } from 'antd';
import { IresDataProps } from '../ResultTable';
import './style.css';


const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};
interface IDeatilFormProps {
  initData: IresDataProps;
}

const AddAndEditForm = (props: IDeatilFormProps) => {
  const { initData } = props;
  const [data, setData] = useState(initData)


  useEffect(() => {
    setData(initData)
  }, [initData])
  return (
    <Form className="questions-detail">
      <Form {...layout} name="detail-questions">
        <Form.Item label="题目">
          <div className="item">{data.title}</div>
        </Form.Item>
        <Form.Item label="类型" >
          <div className="item">{data.type}</div>
        </Form.Item>
        <Form.Item label="题目解析" {...layout} >
          <div className="item" dangerouslySetInnerHTML={{ __html: data.answer as string }}></div>
        </Form.Item>
      </Form>
    </Form>
  );
}
export default AddAndEditForm;