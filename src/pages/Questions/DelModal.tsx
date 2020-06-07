import React, { useState } from 'react';
import { Modal, Input, message } from 'antd';
import { Post } from '../../util/request';
import { IresDataProps } from './ResultTable';

interface IDelProps {
  record: IresDataProps;
  visible: boolean;
  handleCancel: (isDel: boolean) => void;
}
const DelModal = (props: IDelProps) => {
  const { visible, handleCancel, record } = props;
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false)


  const justOK = (value: any) => {
    let isOK = false;
    if (value) {
      isOK = true;
    }
    return isOK;
  }

  const handleOk = () => {
    setLoading(true)
    Post('/api/questions/delete', { id: record.id, reason: value }, (res) => {
      message.success('删除成功！');
      handleCancel(true)
      setLoading(false);
    })
  }

  const handClose = () => {
    handleCancel(false)
  }
  return (
    <Modal
      title={<span>确认删除<span style={{ color: 'red' }}>{record.title}</span>?</span>}
      visible={visible}
      onOk={handleOk}
      onCancel={handClose}
      okButtonProps={{ disabled: !justOK(value), loading: loading }}
    >
      <Input placeholder="请输入删除理由" onChange={(e) => { setValue(e.target.value) }} value={value} />
    </Modal>
  );
}

export default DelModal;