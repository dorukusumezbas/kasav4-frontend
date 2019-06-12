import React, {useState, useEffect} from 'react'

import { Input, Button, Row, Col, Typography } from 'antd'
import { Select } from 'antd'
import 'antd/dist/antd.css'
import '../App.css'
import { DatePicker } from 'antd'
import moment from 'moment'
import axios from 'axios'


const {Text, Title} = Typography;
const dateFormatList = 'DD/MM/YYYY';

const { Option } = Select;

function Form1(){

    const [one, setOne] = useState([])
    const [two, setTwo] = useState([])
    const [three, setThree] = useState([])
    const [four, setFour] = useState([])
    const [five, setFive] = useState([])

    const [chosenone, setchosenOne] = useState()
    const [chosentwo, setchosenTwo] = useState()
    const [chosenthree, setchosenThree] = useState()
    const [chosenfour, setchosenFour] = useState()
    const [chosenfive, setchosenFive] = useState()

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/one')
          .then(function (response) {
              setOne(response.data.content)
          })
          .catch(function (error) {
              console.log(error)
          })
    },[])

    function handleChangeOne(value) {
        setchosenOne(value)
        setTwo([])
        setThree([])
        setFour([])
        setFive([])
        setchosenTwo(null)
        setchosenThree(null)
        setchosenFour(null)
        setchosenFive(null)
        axios.post('http://127.0.0.1:8000/api/two', {"id": value})
          .then(function(response) {
            setTwo(response.data.content)
          })
    }

    function handleChangeTwo(value) {
        setchosenTwo(value)
        setThree([])
        setFour([])
        setFive([])
        setchosenThree(null)
        setchosenFour(null)
        setchosenFive(null)
        axios.post('http://127.0.0.1:8000/api/three', {"id": value})
          .then(function(response) {
              setThree(response.data.content)
          })
    }
    function handleChangeThree(value) {
        setchosenThree(value)
        setFour([])
        setFive([])
        setchosenFour(null)
        setchosenFive(null)
        axios.post('http://127.0.0.1:8000/api/four', {"id": value})
          .then(function(response) {
              setFour(response.data.content)
          })
    }
    function handleChangeFour(value) {
        setchosenFour(value);
        setFive([])
        setchosenFive(null)
        axios.post('http://127.0.0.1:8000/api/five', {"id": value})
          .then(function(response) {
              setFive(response.data.content)
          })
    }

    function handleChangeFive(value) {
        setchosenFive(value)
    }

    return(
    <div>
        <Row className= "form-row" type="flex" justify="center" gutter={16}>
            <Col md={{span :4}} xs={{span:24, marginTop:40}}>
                <label>Ödeme Yöntemi</label>
                <Select className= "form-dropdown" size={"large"} defaultValue="Seçiniz"  >
                    <Option value="Banka">Banka</Option>
                    <Option value="Çek">Çek</Option>
                    <Option value="Nakit">Nakit</Option>
                    <Option value="Kredi Kartı">Kredi Kartı</Option>
                </Select>
            </Col>
            <Col md={{span :4}} xs={{span:24, marginTop:40}}>
                <label>Kaynak</label>
                <Select  className= "form-dropdown" size={"large"} value={chosenone ? chosenone : "Seçiniz."} onSelect={handleChangeOne} >
            {one.map((item) => (
              <Option value={item.id}>{item.title}</Option>
            ))}
                </Select>
            </Col>
            <Col md={{span :4}} xs={{span:24, marginTop:40}}>
                <label>Giriş Yöntemi</label>
                <Select  className= "form-dropdown" size={"large"} value={chosentwo ? chosentwo : "Seçiniz"} onSelect={handleChangeTwo} >
                    {two.map((item) => (
                      <Option value={item.id}>{item.title}</Option>
                    ))}
                </Select>
            </Col>
        </Row>
            <Row className= "form-row" gutter={16} type="flex" justify="center" >
            <Col md={{span :4}} xs={{span:24, marginTop:40}}>
                <label>Kategori</label>
            <Select  className= "form-dropdown" size={"large"} value={chosenthree ? chosenthree : "Seçiniz"} onSelect={handleChangeThree} >
                {three.map((item) => (
                  <Option value={item.id}>{item.title}</Option>
                ))}
            </Select>
        </Col>
            <Col md={{span :4}} xs={{span:24, marginTop:40}}>
                <label>Kategori</label>
            <Select className= "form-dropdown"  size={"large"} value={chosenfour ? chosenfour : "Seçiniz"} onSelect={handleChangeFour}  >
                {four.map((item) => (
                  <Option value={item.id}>{item.title}</Option>
                ))}
            </Select>
        </Col>
        <Col md={{span :4}} xs={{span:24, marginTop:40}}>
            <label>Kategori</label>
            <Select  className= "form-dropdown"  size={"large"} value={chosenfive ? chosenfive : "Seçiniz"} onSelect={handleChangeFive} >
            {five.map((item) => (
              <Option value={item.id}>{item.title}</Option>
            ))}
             </Select>
        </Col>
        </Row>

        <Row className = "form-row" gutter={16} type="flex" justify="center">
            <Col span = {4} style={{textAlign: "center"}} md={{span :4}} xs={{span:12, marginTop:15}}>
                <Text>Açıklama</Text>
                <Input size={"large"} placeholder="Touche" />
            </Col>
            <Col span = {4} style={{textAlign: "center"}} md={{span :4}} xs={{span:12, marginTop:15}}>
                <Text>Tutar</Text>
                <Input size={"large"} placeholder="Prive" />
            </Col>
            <Col span = {4} style={{textAlign: "center"}} md={{span :4}} xs={{span:24, marginTop:40}}>
                <Text>Tarih</Text><br/>
                <DatePicker size={"large"}  style = {{width: "100%"}} defaultValue={moment()} format={dateFormatList} />
            </Col>
        </Row>

        <Row className= "form-row"  gutter={16} type="flex" justify="center">
            <Button type="Primary" size={"large"}>Kaydet</Button>
        </Row>
    </div>

    )
};

export default Form1
