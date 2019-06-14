import React from 'react'
import axios from 'axios'
import moment from 'moment'
import {
    Form,
    Input,
    Cascader,
    Select,
    Row,
    Col,
    Button,
    InputNumber,
    Radio,
    DatePicker, message,
} from 'antd'

const { Option } = Select

const filter = (inputValue, path) => {
    return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1)
}

const base_url = 'http://127.0.0.1:8000'

class Cikis extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        one: [],
        residences: [],
        paymentMethod: null,
        banks: []
    }

    componentDidMount() {
        axios.post(base_url + '/api/one/',{"transaction_type" : 2})
          .then(response => {
              this.setState({one: response.data.content})
          })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                values['datetime'] = values["date-time-picker"].toISOString()
                values['transaction_type'] = 2
                values['two'] = values["residence"][0]
                values['three'] = values["residence"][1]
                values['four'] = values["residence"][2]
                axios.post(base_url + '/api/transaction/',values)
                  .then(response => {
                      console.log(response)
                      message.success('İşlem başarıyla oluşturuldu.')
                      this.props.form.resetFields()
                  })
                  .catch(error => {
                      message.error('İşlem tamamlanamadı: ' + error.toString())
                  })
            }
        })
    }

    handleChange = value => {
        axios.post(base_url + '/api/categories/', {"id": value})
          .then(response => {
              this.setState({residences: response.data.content})
          })
    }

    handlePaymentChange = value => {
        if(value === "bank") {
            axios.get(base_url + '/api/bank/')
              .then(response => {
                  this.setState({paymentMethod: "bank"})
                  return response
              })
              .then(response => {
                  this.setState({banks: response.data.filter(el=> el.isBank)})

              })
        }
        else {
            this.setState({paymentMethod: value, banks: []})
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { one, banks, paymentMethod } = this.state;

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
                    span: 8,
                    offset: 8,
                },
            },
        };
        const bankRadios = <Form.Item label="Banka Seçiniz:">
            {getFieldDecorator('bank', {
                rules: [
                    {
                        required: paymentMethod === "bank",
                        message: 'Lütfen banka seçiniz',
                    },
                ],
            })(<Radio.Group buttonStyle="solid">
            {banks.map((item) => (
              <Radio.Button value={item.id}>{item.title}</Radio.Button>
            ))}
        </Radio.Group>)}
        </Form.Item>

        return (
          <Form {...formItemLayout} onSubmit={this.handleSubmit} style = {{marginLeft: "50px", marginRight: "50px"}}>
              <Row gutter={8}>
                  <Col span={24}>
              <Form.Item label="Ödeme Yöntemi">
                  {getFieldDecorator('transaction_method', {
                      rules: [
                          {
                              required: true,
                              message: 'Ödeme Yöntemi Seçiniz',
                          },
                      ],
                  })(<Select onSelect = {this.handlePaymentChange}>
                      <Option value="cash">Nakit</Option>
                      <Option value="bank">Banka</Option>
                      <Option value="check">Çek</Option>
                      <Option value="credit_card">Kredi Kartı</Option>
                  </Select>)}
              </Form.Item>

                      {paymentMethod==="bank" ? bankRadios : null}

              <Form.Item label="Masraf Merkezi">
                  {getFieldDecorator('one', {
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
                      {getFieldDecorator('residence', {
                      initialValue: ['zhejiang', 'hangzhou', 'xihu'],
                      rules: [
                          { type: 'array', required: true, message: 'Lütfen kategorileri seçin.' },
                      ],
                  })(<Cascader options={this.state.residences} placeholder="Please select"
                               showSearch={{ filter }} />)}

              </Form.Item>
              <Form.Item label="Açıklama">

                          {getFieldDecorator('description', {
                              rules: [{ required: true, message: 'Lütfen açıklama giriniz.' }],
                          })(<Input />)}

              </Form.Item>
              <Form.Item label="Tutar">

                          {getFieldDecorator('amount', {
                              rules: [{ required: true, message: 'Lütfen miktar giriniz.' }],
                          })(<InputNumber min={1} style={{width: "100%"}}/>)}

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

                          {getFieldDecorator('currency', {
                              rules: [{ required: true, message: 'Lütfen miktar giriniz.' }],
                              initialValue: 1
                          })(<Radio.Group>
                                <Radio value = {1}>₺</Radio>
                                <Radio value = {2}>$</Radio>
                                <Radio value = {3}>€</Radio>
                            </Radio.Group>
                          )}

              </Form.Item>
              <Form.Item {...tailFormItemLayout} style={{textAlign: "center"}}>
                  <Button type="primary"  htmlType="submit">
                      Kaydet
                  </Button>
              </Form.Item>
                  </Col>
              </Row>


          </Form>
        )
    }
}

export default Form.create({ name: 'cikis' })(Cikis);