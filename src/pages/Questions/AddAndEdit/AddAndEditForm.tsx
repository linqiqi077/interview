import React, { useState, useEffect } from 'react';
import BraftEditor, { ControlType } from 'braft-editor';
import { Form, Select, Input } from 'antd';
import { IresDataProps } from '../ResultTable';
import 'braft-editor/dist/index.css';
import './styles.css';

const Option = Select.Option;
const { TextArea } = Input;

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};
const menuList: ControlType[] = [
  'undo', 'redo', 'font-size', 'font-family', 'line-height', 'letter-spacing',
  'text-color', 'bold', 'italic', 'strike-through',
  'superscript', 'subscript', 'remove-styles', 'emoji', 'text-align', 'headings',
  'blockquote', 'code', 'link', 'hr', 'clear'
];

interface IAddAndEditFormProps {
  onValChange: (values: any) => void;
  initData: IresDataProps;
  answerData?: any
}

const AddAndEditForm = (props: IAddAndEditFormProps) => {
  const { onValChange, initData, answerData } = props;
  const [data, setData] = useState(initData)
  console.log(initData)

  
  useEffect(() => {
    
    onValChange({ answer: answerData })
    setData({ ...initData, answer: answerData })
  }, [answerData])
  return (
    <Form className="addAndEditQuestionsForm">
      <Form {...layout} name="add-edit-questions">
        <Form.Item label="题目" required>
          <TextArea rows={4} placeholder="请输入题目" defaultValue={data.title} onChange={e => {
            onValChange({ title: e.target.value })
          }} />
        </Form.Item>
        <Form.Item label="类型" required>
          <Select
            placeholder="请选择类型"
            allowClear
            defaultValue={data.type}
            onChange={e => {
              console.log(e)
              onValChange({ type: e })
            }}
          >
            <Option value="1">前端</Option>
            <Option value="2">后端</Option>
            <Option value="3">数据库</Option>
          </Select>
        </Form.Item>
        <Form.Item label="题目解析" {...layout} required>
          <BraftEditor  value={initData.answer} style={{ border: ' 1px solid red', height: 350 }} controls={menuList} onChange={e => {
            onValChange({ answer: e.toHTML() })
          }} />
        </Form.Item>
      </Form>

    </Form>
  );
}
export default AddAndEditForm;