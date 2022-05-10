import { Component, ReactElement, RefObject } from 'react';
import { Card, Table, Button, message, Modal, InputRef, FormInstance} from 'antd'
import Icon, {PlusOutlined, RightOutlined} from '@ant-design/icons';
import LinkButton from '../../components/link-button';
import { reqAddCategory, reqCategorys, reqUpdateCategory } from '../../api';
import AddFrom from './add-form'
import React from 'react';
import UpdateForm from './update-form';

interface cate {
  _id: string,
  name: string
}

interface data {
  form: RefObject<FormInstance>
}



class Category extends Component {

  public refForm = React.createRef<FormInstance>()

  public category = {
    _id: '',
    name: ''
  }

  state = {
    categorys: [],
    subCategorys: [],
    parentId: '0',
    parentName: '',
    loading: false,
    showStatus: 0,
  }

  getCategorys = async (parentId?:string) => {
    this.setState({loading: true})
    parentId = parentId || this.state.parentId
    const result = await reqCategorys(parentId)
    this.setState({loading: false})
    if(result.status === 0) {
      const category = result.data
      if(parentId === '0') {
        this.setState({categorys: category})
      } else {
        this.setState({subCategorys: category})
      }
    } else {
      message.error('获取列表失败')
    }
  }

  showCategorys = ():void => {
    this.setState({
      parentId: '0',
      parentName: '',
      subCategorys: []
    })
  }

  showSubCategorys  = (category: cate):void => {
    this.setState({
      parentId:category._id,
      parentName: category.name
    }, () => {
      this.getCategorys()
    })
  }

  handleCancel = (): void => {
    this.setState({
      showStatus: 0
    })
  }

  showAdd = (): void => {
    this.setState({
      showStatus: 1
    })
  }

  getData = (item: data): void => {
    this.refForm = item.form
  }

  addCategory = async ():Promise<void> => {
    const {parentId, categoryName} = this.refForm.current?.getFieldsValue()
    this.setState({
      showStatus: 0
    })
    const result = await reqAddCategory(parentId, categoryName)
    if(result.status === 0) {
      if(parentId === this.state.parentId) {
        this.getCategorys()
      } else if( parentId === '0') {
        this.getCategorys(parentId)
      }
    }
    
  }

  showUpdate = (category: cate): void => {

    this.category = category

    this.setState({
      showStatus: 2
    })
  }

  updateCategory = async ():Promise<void> => {
    const id = this.category._id
    const {categoryName} = this.refForm.current?.getFieldsValue()
    this.setState({
      showStatus: 0
    })
    const result = await reqUpdateCategory(id, categoryName)
    if(result.status === 0) {
      this.getCategorys()
    }
  }

  componentDidMount() {
    this.getCategorys()
  }
    
  render() {
    const category = this.category || {}

    const { parentId, categorys, subCategorys, parentName, showStatus} = this.state

    const title = parentId === '0' ? '一级分类列表' : (
      <span>
        <LinkButton onClick={() => {this.showCategorys()}}>一级分类列表</LinkButton> &nbsp;&nbsp;
        <RightOutlined/>&nbsp;&nbsp;
        <span>{parentName}</span>
      </span>
    )

    const extra = (
      <Button type='primary' onClick={this.showAdd}>
        <PlusOutlined/>添加
      </Button>
    )
    
    const columns = [
      {
        title: '分类名称',
        dataIndex: 'name',
      },
      {
        title: '操作',
        width:300,
        render: (category: cate) => (
          <span>
            <LinkButton onClick={() => this.showUpdate(category)}>修改分类</LinkButton>&nbsp;&nbsp;
            {this.state.parentId === '0' ? 
              <LinkButton onClick={() => {this.showSubCategorys(category)}}>查看子分类</LinkButton>
              :
              null
            }
          </span>
        )
      },
    ];

    return (
      <div className='category'>
        <Card title={title} extra={extra}>
        <Table 
        bordered
        rowKey='_id'
        dataSource={parentId === '0' ?  categorys : subCategorys} 
        columns={columns} 
        pagination={{pageSize: 5, showQuickJumper: true, showSizeChanger: true}}
        />;
          <Modal 
            title="添加分类" 
            visible={showStatus===1} 
            onOk={this.addCategory} 
            onCancel={this.handleCancel}
            destroyOnClose
          >
            <AddFrom 
              categorys={categorys}
              parentId={parentId}
              setForm={(data) => this.getData(data)}
            />
          </Modal>
          <Modal 
            title="更新分类" 
            visible={showStatus===2} 
            onOk={this.updateCategory} 
            onCancel={this.handleCancel}
          >
            <UpdateForm categoryName={category.name} setForm={(item) => this.refForm = item.form}/>
          </Modal>
        </Card>
      </div>
    );
  }
}

export default Category;