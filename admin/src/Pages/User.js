import React, {useEffect, useState} from 'react';
import { Table, Tag } from 'antd';
import '../static/css/User.css'
import axios from 'axios';




 const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="/#">{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <span>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            // if (tag === 'loser') {
            //   color = 'volcano';
            // }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="/#" style={{ marginRight: 16 }}>Invite {record.name}</a>
          <a href="/#" >Delete</a>
        </span>
      ),
    },
  ];



const User = () => {
const [list, setList] = useState([])
  const getList = () =>  {
    axios('http://yapi.demo.qunar.com/mock/14846/getPersonList').then((res) => {
     setList(res.data.data);
    console.log(res.data.data, 'data');
    })
  }
  
  useEffect(() => {
    getList();
  },[])
  
    return (
        <div>
        <div className="wrap">
        <Table columns={columns} dataSource={list} />
		</div>
        </div>
    )
}
export default User;

