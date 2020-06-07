import React, { useMemo, useState, useEffect } from 'react';
import { Card, Table, Space, } from 'antd';
import { ColumnsType } from 'antd/lib/table';

interface IpageProps {
  pageSize: number;
  pageNumber: number;
  total: number;

}

export interface IresDataProps {
  id: number;
  title: string;
  type: string;
  answer?: string;
}

interface IresTableProps {
  onEdit: (record: object) => void;
  onDel: (record: object) => void;
  onDetail: (record: object) => void;
  loading?: boolean;
  resData: IresDataProps[] | undefined;
  pageData: IpageProps;
  pageChange: (cur: any) => void;
}

const ResultTable = (props: IresTableProps) => {

  const { loading = false, onEdit, resData, pageData, pageChange, onDel, onDetail } = props;
  const [data, setData] = useState([])

  useEffect(() => {
    if (resData) {
      let result: object[] = [...resData];
      setData(result as any)
    }
  }, [resData])

  const col: ColumnsType<IresDataProps> = useMemo(() => {
    return [
      {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
        render: (text,record) => {
          return <a onClick={() =>{onDetail(record)}}>{record.id}</a>
        }
      },
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        width: "50%"
      },
      {
        title: '操作',
        key: 'active',
        render: (record) => {
          return (
            <Space size="middle">
              <a onClick={() => { onEdit(record) }}>编辑</a>
              <a onClick={() => { onDel(record) }}>删除</a>
            </Space>
          )
        }
      },
    ];
  }, [])

  const pagination = {
    current: + pageData.pageNumber,
    showTotal: (total: any) => {
      return `共${total}条数据`
    },
    total: pageData.total,
    pageSize: pageData.pageSize,
    onChange: (cur: any) => {
      pageChange(cur)
    }
  }

  return (
    <Card>
      <Table
        dataSource={data}
        columns={col}
        loading={loading}
        pagination={pagination}
        rowKey={(record: IresDataProps) => record.id}
      />;
    </Card>)
}
export default ResultTable;