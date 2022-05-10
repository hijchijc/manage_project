import { FC, ReactElement, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import {reqLogin} from '../../api/index'
import storageUtils from '../../utils/storageUtils'
import memoryUtils from "../../utils/memoryUtils";
import "./login.less";
import logo from "./images/logo.png";

interface iProps {

}

const Login: FC<iProps> = (): ReactElement => {

  const navigate = useNavigate()
  const [form] = Form.useForm()

  useEffect(() => {
    if(memoryUtils.user && memoryUtils.user.id) {
      navigate('/')
    }
    form.setFieldsValue({username: 'admin', password: 'admin'})
  }, [])
 
  const onFinish = async (values: any) => {
    const {username, password} = values
    const result = await reqLogin(username, password)
    if(result.status === 0) {
      message.success('登录成功')
      const user = result.data
      storageUtils.saveUser(user)
      memoryUtils.user = user
      navigate('/')
    }
  };

  const checkData = (_:any, value: any, callback:(data? : string) => void) => {
    if(!value) {
      return Promise.reject('必须输入密码')
    } else if(value.length < 4) {
      return Promise.reject('密码必须大于等于4位')
    } else if(value.length > 12) {
      return Promise.reject('密码必须小于等于12位')
    } else if(!/^[a-zA-Z0-9_]+$/.test(value)) {
      return Promise.reject('密码必须由字母、数字、下划线组成')
    }
    return Promise.resolve()
  }

  return (
    <div className="login">
      <header className="login-header">
        <img src={logo} alt="logo" />
        <h1>管理系统项目</h1>
      </header>
      <section className="login-content">
        <h3>用户登录</h3>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: "请输入用户名!" },
              {min: 4, message: '用户名必须大于4位'},
              {max: 12, message: '用户名必须小于12位'},
              {pattern: /^[a-zA-Z0-9_]+$/, message: "用户名必须是下划线、数字和字母"}
            ]}
            key='username'
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="用户名"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {validator:checkData}
            ]}
            key='password'
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </section>
    </div>
  );
};

export default Login;
