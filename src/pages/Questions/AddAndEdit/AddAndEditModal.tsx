import React, { useState, useEffect } from 'react';
import { Modal, message, Spin } from 'antd';
import BraftEditor from 'braft-editor';
import { Post, Get } from '../../../util/request';
import AddAndEditForm from './AddAndEditForm';
import { IresDataProps } from '../ResultTable';

interface IAddAndEditProps {
  addAndEditVisible: boolean;
  closeAddAndEdit: (isActive: boolean) => void;
  editRecord: IresDataProps;
  activeType: string;
}
const AddAndEditModal = (props: IAddAndEditProps) => {

  const { addAndEditVisible, closeAddAndEdit, activeType, editRecord } = props;

  const [record, setRecord] = useState(editRecord);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const [answerData, setAnswerData] = useState('')

  useEffect(() => {
    setRecord({ ...record, answer: answerData })
  }, [answerData])

  const initAnswer = (editRecord: { answer: any; }) => {
    setTimeout(() => {
      let { answer } = editRecord;
      new Promise((resole, reject) => {
        answer = BraftEditor.createEditorState(answer);
        resole()
      }).then(() => {
        console.log(answer)
        setAnswerData(answer);
        setFormLoading(false);
      })

    })
  }

  useEffect(() => {
    if (activeType === 'edit') {
      setFormLoading(true);
      Get('/api/questions/detail', { params: { id: record.id } }, (res: any) => {
        setRecord(res.data)
        initAnswer(res.data)
      })
    }
  }, [])

  const handleOk = () => {
    setLoading(true)
    let url;
    if (activeType === 'add') {
      url = '/api/questions/create'
    } else {
      url = '/api/questions/update'
    }
    Post(url, { ...record }, (res: any) => {
      message.success(`${activeType === 'add' ? '增加' : '修改'}成功！`);
      closeAddAndEdit(true)
      setLoading(false);
    })

  }

  const handleCancel = () => {
    closeAddAndEdit(false)
  }

  const change = (values: any) => {
    setRecord({ ...record, ...values })
  }

  const justOK = (record: IresDataProps) => {
    let isOK = false;
    if (record.title && record.type && record.answer) {
      isOK = true;
    }
    return isOK;
  }


  return (
    <Modal
      width="800px"
      style={{ top: 20 }}
      title={activeType === 'add' ? '新增试题' : '编辑试题'}
      visible={addAndEditVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      okButtonProps={{ disabled: !justOK(record), loading: loading }}
    >
      <Spin spinning={formLoading}>
        <AddAndEditForm onValChange={change} initData={record} answerData={answerData} />
      </Spin>

    </Modal>
  )
}

export default AddAndEditModal;