import { Form, Select, Input, InputRef, FormInstance } from 'antd';
import React, { Component, RefObject } from 'react';

const Option = Select.Option

interface cate {
  _id: string,
  name: string
}

interface data {
  form: RefObject<FormInstance>
}

interface Iprops {
  categorys: cate[],
  parentId: string,
  setForm: (item: data) => (void)
}

class AddForm extends Component<Iprops, {}> {

  public parentId = this.props.parentId

  public refForm = React.createRef<FormInstance>()

  componentDidMount () {

    this.props.setForm({
      form: this.refForm
    })
  }

  render() {

    const {categorys, parentId} = this.props

    return (
      <Form ref={this.refForm}>
        <Form.Item 
          label='所属分类'
          name='parentId'
          initialValue={parentId}
          >
            <Select >
              <Option key='0' value='0'>一级分类</Option>
              {
                categorys.map(c => <Option key={c!._id} value={c!._id}>{c!.name}</Option>)
              }
            </Select>
        </Form.Item>
        <Form.Item label='分类名称' name='categoryName'>
          <Input placeholder='请输入分类名称'></Input>
        </Form.Item>
      </Form>
    );
  }
}

export default AddForm;