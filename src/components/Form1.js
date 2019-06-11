import React from 'react';
import { Input, Button, Row, Col } from 'antd';
import { Select } from 'antd';
import 'antd/dist/antd.css';
import '../App.css'
import { DatePicker } from 'antd';
import moment from 'moment';


const dateFormatList = 'DD/MM/YYYY';

const { Option } = Select;

function Form1(){
    return(
    <div>
        <Row className= "form-row" type="flex" justify="center">
            <Col span={4}>
        <Select  className= "form-dropdown" size={"large"} defaultValue="Seçiniz"  >
                <Option value="jack">uıpoıpu</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="Yiminghe">yiminghe</Option>
        </Select>
            </Col>
            <Col span={4}>
                <Select  className= "form-dropdown" size={"large"} defaultValue="Seçiniz"  >
                    <Option value="jack">poıu</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="Yiminghe">yiminghe</Option>
                </Select>
            </Col>
            <Col span={4}>
            <Select  className= "form-dropdown" size={"large"} defaultValue="Seçiniz"  >
                <Option value="jack">oıu</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="Yiminghe">yiminghe</Option>
            </Select>
        </Col>
            <Col span={4}>
            <Select className= "form-dropdown"  size={"large"} defaultValue="Seçiniz"  >
                <Option value="jack">oıu</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="Yiminghe">yiminghe</Option>
            </Select>
        </Col>
            <Col span={4}>
            <Select  className= "form-dropdown"  size={"large"} defaultValue="Seçiniz"  >
                <Option value="jack">oıu</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="Yiminghe">yiminghe</Option>
            </Select>
        </Col>
        </Row>

        <Row className = "form-row" gutter={16} type="flex" justify="center">
            <Col span =  {4}>
                <Input size={"large"} placeholder="Touche" />
            </Col>
            <Col span = {4}>
                <Input size={"large"} placeholder="Prive" />
            </Col>
            <Col span = {4}>
            <DatePicker size={"large"} defaultValue={moment()} format={dateFormatList} />
            </Col>
        </Row>

        <Row className= "form-row"  gutter={16} type="flex" justify="center">
            <Button type="Primary" size={"large"}>Kaydet</Button>
        </Row>
    </div>

    )
};

export default Form1
