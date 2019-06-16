import { Table } from 'antd';
import axios from 'axios';
import React, {useState, useEffect} from 'react'


const paymentMap = {
  bank: "Banka",
  cash: "Nakit",
  credit_card: "Kredi Kartı",
  check: "Çek"
}

const columns = [
  {
    title: 'Tarih',
    dataIndex: 'datetime',
    sorter: true,
    render: (datetime) => {
      return datetime.substring(0, 10);
    },
    width: '7%',
  },
  {
    title: 'İşlem Türü',
    dataIndex: 'transaction_type.title',
    filters: [{ text: 'Merkez', value: '1' }, { text: 'Online', value: '2' }],
    width: "5%"
  },
  {
    title: 'Banka',
    dataIndex: 'bank.title',
    filters: [{ text: 'Merkez', value: '1' }, { text: 'Online', value: '2' }],
    width: "7%"
  },
  {
    title: 'Masraf / Ciro Merkezi',
    dataIndex: 'one.title',
    filters: [{ text: 'Merkez', value: '1' }, { text: 'Online', value: '2' }],
    width: "10%"
  },
  {
    title: 'Alt Kategori 1',
    dataIndex: 'two.title',
    filters: [{ text: 'Merkez', value: '1' }, { text: 'Online', value: '2' }],
    width: "10%"
  },
  {
    title: 'Alt Kategori 2',
    dataIndex: 'three.title',
    filters: [{ text: 'Merkez', value: '1' }, { text: 'Online', value: '2' }],
    width: "10%"
  },
  {
    title: 'Alt Kategori 3',
    dataIndex: 'four.title',
    filters: [{ text: 'Merkez', value: '1' }, { text: 'Online', value: '2' }],
    width: "10%"
  },
  {
    title: 'Açıklama',
    dataIndex: 'description',
    sorter: true,
  },
  {
    title: 'Miktar',
    dataIndex: 'amount',
    width: '5%',
  },
  {
    title: 'Para Birimi',
    dataIndex: 'currency.title',
    width: '5%',
  },
  {
    title: 'Ödeme Yöntemi / Kanalı',
    dataIndex: 'transaction_method',
    width: '5%',
    render: transaction_method => paymentMap[transaction_method]
  },


];

const base_url = 'http://127.0.0.1:8000'

function Tablo(){
  const [data, setData] = useState([])
  const [page, setPage] = useState({pageSize: 15})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios.get(base_url + '/api/table/')
      .then((response) => {
        const temp_pagination = {...page}
        temp_pagination.total = response.data.count
        setData(response.data.results)
        setLoading(false)
        setPage(temp_pagination)
      })
  },[])

  const handleTableChange = (pagination, filters, sorter) => {
    console.log(sorter)
    const pager = { ...pagination };
    pager.current = pagination.current;
    setPage(pager)
    const page = 'page=' + pagination.current
    let filter_url_parameters = ""
    for (const [key, value] of Object.entries(filters)) {
      filter_url_parameters = filter_url_parameters + key.split('.')[0] + "__in="
      for (const [i, item] of value.entries()) {
        if(i===0) {
          filter_url_parameters = "&" + filter_url_parameters + item
        }
        else {
          filter_url_parameters = filter_url_parameters + ',' + item
        }
      }

    }
    let sorter_string = ""
    if (sorter.field && sorter.order) {
      let asc_desc_string = sorter.order === "ascend" ? "" : "-"
      sorter_string = "&ordering=" + asc_desc_string + sorter.field.split('.')[0]
    }

    const url = base_url + '/api/table/?' + page + sorter_string + filter_url_parameters
    axios.get(url)
      .then((response)=> {
        const temp_pagination = {...page}
        temp_pagination.total = response.data.count
        setData(response.data.results)
        setLoading(false)
        setPage(temp_pagination)
      })

  };


  return (
    <Table
      bordered={true}
      columns={columns}
      // rowKey={record => record.login.uuid}
      size={"small"}
      dataSource={data}
      pagination={page}
      loading={loading}
      onChange={handleTableChange}
    />
  );
}

export default Tablo