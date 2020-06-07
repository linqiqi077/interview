import React, { useState, useEffect } from 'react';
import { Modal, Spin,Button } from 'antd';
import { Get } from '../../../util/request';
import { IresDataProps } from '../ResultTable';
import DetailContent from './DetailContent';

interface IAddAndEditProps {
  detailVisible: boolean;
  closeDetail: () => void;
  editRecord: IresDataProps;
}
const DetailModal = (props: IAddAndEditProps) => {

  const { detailVisible, closeDetail, editRecord } = props;

  const [record, setRecord] = useState(editRecord);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    Get('/api/questions/detail', { params: { id: record.id } }, (res: any) => {
      setRecord(res.data)
      setLoading(false)
    })
  }, [])

  const handleCancel = () => {
    closeDetail()
  }

  return (
    <Modal
      width="800px"
      style={{ top: 20 }}
      title={record.title}
      visible={detailVisible}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          关闭
        </Button>
      ]}
    >
      <Spin spinning={loading}>
        <DetailContent initData={record} />
      </Spin>

    </Modal>
  )
}

export default DetailModal;