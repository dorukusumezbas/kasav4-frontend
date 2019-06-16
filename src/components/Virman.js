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
  DatePicker,
  message
} from 'antd'

const { Option } = Select

const filter = (inputValue, path) => {
  return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1)
}

const base_url = 'http://127.0.0.1:8000'

class Virman extends React.Component {
  state = {
    banks_from: [],
    banks_to: [],
    description: "",
  }

  componentDidMount() {
    axios.get(base_url + '/api/bank/')
      .then(response => {
        console.log(response.data)
        this.setState({banks_from: response.data})
      })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values)
        values['datetime'] = values["date-time-picker"].toISOString()
        values['transaction_type'] = 3
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

  bankFromChange = event => {
    const selected_object = this.state.banks_from.filter(item => {
      return item.id === event.target.value
    })
    console.log(selected_object)
    const array_of_banks = selected_object[0].bank
    const filtered_banks_to = this.state.banks_from.filter(item => {
      return array_of_banks.includes(item.id)
    })
    this.setState({banks_to: filtered_banks_to})

  }

  bankToChange = event => {
    const bank_from_value = this.props.form.getFieldValue('bank_from')
    console.log(bank_from_value)
    const bank_from_object = this.state.banks_from.filter(item => {
      return item.id === bank_from_value
    })

    const bank_to_object = this.state.banks_from.filter(item => {
      return item.id === event.target.value
    })
    const bank_from = bank_from_object[0].title
    console.log(bank_from)
    const bank_to = bank_to_object[0].title
    console.log(bank_to)
    this.props.form.setFieldsValue({description: bank_from + " kaynağından " + bank_to + " hedefine virman"})
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { banks_from, banks_to } = this.state;

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


    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit} style = {{marginLeft: "50px", marginRight: "50px"}}>
        <Row gutter={8}>
          <Col span={24}>
            <Form.Item label="Nereden:">
              {getFieldDecorator('bank_from', {
                rules: [
                  {
                    required: true,
                    message: 'Lütfen para çıkışı olan kasayı seçiniz',
                  },
                ],
              })(<Radio.Group buttonStyle="solid" onChange={this.bankFromChange}>
                {banks_from.map((item) => (
                  <Radio.Button value={item.id}>{item.title}</Radio.Button>
                ))}
              </Radio.Group>)}
            </Form.Item>
            <Form.Item label="Nereye:">
              {getFieldDecorator('bank_to', {
                rules: [
                  {
                    required: true,
                    message: 'Lütfen alıcı kasa seçiniz',
                  },
                ],
              })(<Radio.Group buttonStyle="solid" onChange={this.bankToChange}>
                {banks_to.map((item) => (
                  <Radio.Button value={item.id}>{item.title}</Radio.Button>
                ))}
              </Radio.Group>)}
            </Form.Item>

            <Form.Item label="Açıklama">

              {getFieldDecorator('description', {
                rules: [{ required: true, message: 'Lütfen açıklama giriniz.' }]
              })(<Input/>)}

            </Form.Item>
            <Form.Item label="Tutar">

              {getFieldDecorator('amount', {
                rules: [{ required: true, message: 'Lütfen miktar giriniz.' }],
              })(<InputNumber min={1} style={{width: "50%"}}/>)}

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

export default Form.create({ name: 'virman' })(Virman);