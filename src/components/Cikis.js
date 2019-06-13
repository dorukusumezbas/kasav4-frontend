import React from 'react'
import axios from 'axios'
import moment from 'moment'
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
    InputNumber,
    Radio,
    DatePicker,
} from 'antd';


const { Option, } = Select;

const filter = (inputValue, path) => {
    return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
}

const base_url = 'http://127.0.0.1:8000'

class Cikis extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        one: [],
        residences: [],
    };

    componentDidMount() {
        axios.post(base_url + '/api/one/',{"transaction_type" : 2})
          .then(response => {
              this.setState({one: response.data.content})
          })
    }

    componentDidUpdate() {
        axios.get(base_url + 'api/one/')
          .then(response => {
              this.setState({one: response.data.content})
          })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    handleChange = value => {
        axios.post(base_url + '/api/categories/', {"id": value})
          .then(response => {
              this.setState({residences: response.data.content})
          })
    }



    render() {
        const { getFieldDecorator } = this.props.form;
        const { one, currencies } = this.state;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        return (
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
              <Form.Item label="Ödeme Yöntemi">
                  {getFieldDecorator('transaction_method', {
                      rules: [
                          {
                              required: true,
                              message: 'Ödeme Yöntemi Seçiniz',
                          },
                      ],
                  })(<Select>
                      <Option value="cash">Nakit</Option>
                      <Option value="bank">Banka</Option>
                      <Option value="check">Çek</Option>
                      <Option value="credit_card">Kredi Kartı</Option>
                  </Select>)}
              </Form.Item>

              <Form.Item label="Masraf Merkezi">
                  {getFieldDecorator('cost_center', {
                      rules: [
                          {
                              required: true,
                              message: 'Lütfen masraf merkezi seçiniz.',
                          },
                      ],
                  })(<Select onSelect={this.handleChange}>
                      {one.map((item) => (
                        <Option value = {item.id}>{item.title}</Option>
                          ))}
                  </Select>)}
              </Form.Item>
              <Form.Item label="Kategori">
                  <Row gutter={8}>
                      <Col span={12}>
                      {getFieldDecorator('residence', {
                      initialValue: ['zhejiang', 'hangzhou', 'xihu'],
                      rules: [
                          { type: 'array', required: true, message: 'Lütfen kategorileri seçin.' },
                      ],
                  })(<Cascader options={this.state.residences} placeholder="Please select"
                               showSearch={{ filter }} />)}
                      </Col>
                  </Row>
              </Form.Item>
              <Form.Item label="Açıklama">
                  <Row gutter={8}>
                      <Col span={12}>
                          {getFieldDecorator('description', {
                              rules: [{ required: true, message: 'Lütfen açıklama giriniz.' }],
                          })(<Input />)}
                      </Col>
                  </Row>
              </Form.Item>
              <Form.Item label="Tutar">
                  <Row gutter={8}>
                      <Col span={12} >
                          {getFieldDecorator('amount', {
                              rules: [{ required: true, message: 'Lütfen miktar giriniz.' }],
                          })(<InputNumber min={1} style={{width: "100%"}}/>)}
                      </Col>
                  </Row>
              </Form.Item>
              <Form.Item  label="Tarih">
                  {getFieldDecorator('date-time-picker', {
                      rules: [{ required: true, message: 'Lütfen tarih giriniz.' }],
                      initialValue: moment()
                  }  )(

                      <DatePicker style={{width:"50%"}}  format="DD-MM-YYYY HH:mm:ss" />,
                  )}
              </Form.Item>
              <Form.Item label="Para Birimi">
                  <Row gutter={8}>
                      <Col span={12} >
                          {getFieldDecorator('currency', {
                              rules: [{ required: true, message: 'Lütfen miktar giriniz.' }],
                              initialValue: 1
                          })(<Radio.Group>
                                <Radio value = {1}>₺</Radio>
                                <Radio value = {2}>$</Radio>
                                <Radio value = {3}>€</Radio>
                            </Radio.Group>
                          )}
                      </Col>
                  </Row>
              </Form.Item>


              <Form.Item {...tailFormItemLayout}>
                  <Button type="primary"  htmlType="submit">
                      Kaydet
                  </Button>
              </Form.Item>


          </Form>
        );
    }
}

export default Form.create({ name: 'register' })(Cikis);