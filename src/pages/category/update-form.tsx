import { Form, Select, Input, InputRef, FormInstance } from 'antd';
import React, { Component, RefObject } from 'react';

const Option = Select.Option

interface cate {
  name: string
}

interface data {
  form: RefObject<FormInstance>
}

interface Iprops {
  categoryName: string,
  setForm: (item: data) => (void)
}

class UpdateForm extends Component<Iprops, {}> {

  public refForm = React.createRef<FormInstance>()

  componentDidMount () {

    this.props.setForm({
      form: this.refForm
    })
  }

  render() {

    const {categoryName} = this.props

    return (
      <Form ref={this.refForm}>
        <Form.Item label='分类名称' name='categoryName' initialValue={categoryName}>
          <Input placeholder='请输入分类名称'></Input>
        </Form.Item>
      </Form>
    );
  }
}

export default UpdateForm;