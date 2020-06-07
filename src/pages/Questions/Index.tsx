import React, { useState, Fragment, useEffect } from 'react';
import { Get } from '../../util/request';
import SearchContions from './SearchContions';
import ResultTable from './ResultTable';
import AddAndEditModal from './AddAndEdit/AddAndEditModal';
import DelModal from './DelModal';
import DetailMadal from './Detail/Detail';

const getData = async (params = {}) => {
  return await Get('/api/questions/list', params)
}
const Question = () => {

  const [addAndEditVisible, setAddAndEditVisible] = useState(false);
  const [delAndEditVisible, setDelAndEditVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [activeType, setActiveType] = useState('add');
  const [activeRecord, setActiveRecord] = useState(() => {
    return {
      id: 0,
      title: "",
      type: ""
    }
  });
  const [searchLoading, setSearchLoading] = useState(false);
  const [tableData, setTableData] = useState();
  const [pageData, setPageData] = useState(() => {
    return {
      total: 0, pageSize: 10, pageNumber: 1
    }
  });
  const [searchData, setSearchData] = useState(() => {
    return {
      pageSize: 6,
      pageNumber: 1,
    }
  })

  const getData = async (params = {}, callback = (data: any) => { }) => {
    setSearchLoading(false)
    let result = await Get('/api/questions/list', { params }, callback);
    return result;
  }

  const initData = (searchData: any) => {
    getData(searchData, (data) => {
      const { total, pageSize, pageNumber } = data;
      setTableData(data.data)
      setPageData({ total, pageSize, pageNumber })
      setSearchLoading(false)
    })
  }

  useEffect(() => {
    initData(searchData)
  }, [])

  const edit = (record: any) => {
    setAddAndEditVisible(true);
    setActiveType('edit')
    setActiveRecord(record)
  }

  const search = (values: any) => {
    initData({ ...searchData, pageNumber: 1, ...values })
  }

  const add = () => {
    setAddAndEditVisible(true);
    setActiveType('add')
    setActiveRecord({
      id: 0,
      title: "",
      type: ""
    })
  }

  const detail = (record: any) => {
    setDetailVisible(true);
    setActiveRecord(record)
  }

  const closeAddAndEdit = (isActive: boolean) => {
    if (isActive) {
      initData(searchData)
    }
    setAddAndEditVisible(false)
  }

  const onPageChange = (cur: any) => {
    setSearchData({ ...searchData, pageNumber: cur })
    initData({ ...searchData, pageNumber: cur })
  }

  const del = (record: any) => {
    setActiveRecord(record)
    setDelAndEditVisible(true)
  }

  const closeDelModal = (isDel: boolean) => {
    setDelAndEditVisible(false)
    if (isDel) {
      initData({ ...searchData })
    }
  }

  const closeDetailMadal = () => {
    setDetailVisible(false)
  }

  return (
    <Fragment>
      <SearchContions onSearch={search} onAdd={add} />
      <ResultTable
        onEdit={edit}
        loading={searchLoading}
        resData={tableData}
        pageData={pageData}
        pageChange={onPageChange}
        onDel={del}
        onDetail={detail}
      />
      {!addAndEditVisible ?
        "" :
        <AddAndEditModal
          addAndEditVisible={addAndEditVisible}
          closeAddAndEdit={closeAddAndEdit}
          editRecord={activeRecord}
          activeType={activeType}
        />}
      {
        !delAndEditVisible ?
          "" :
          <DelModal
            visible={delAndEditVisible}
            handleCancel={closeDelModal}
            record={activeRecord}
          />
      }
      {
        !detailVisible ?
          "" :
          <DetailMadal
            detailVisible={detailVisible}
            closeDetail={closeDetailMadal}
            editRecord={activeRecord}
          />
      }
    </Fragment>
  )
}

export default Question