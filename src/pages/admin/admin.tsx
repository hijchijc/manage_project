import { ReactElement, useEffect } from "react";
import { useNavigate, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "antd";
import memoryUtils from "../../utils/memoryUtils";
import Header from "../../components/header";
import LeftNav from "../../components/left-nav";
import Home from "../home/home";
import Category from "../category/category";
import Product from "../product/product";
import Role from "../role/role";
import User from "../user/user";
import Bar from "../charts/bar";
import Line from "../charts/line";
import Pie from "../charts/pie";

const { Footer, Sider, Content } = Layout 

function Admin() : ReactElement {

  const navigate = useNavigate()
  const user = memoryUtils.user

  useEffect(() => {
    if(!user.id) {
      navigate('/login')
    }
  }, [])

  return (
      <Layout style={{height: '100%'}}>
        <Sider>
          <LeftNav/>
        </Sider>
        <Layout>
          <Header/>
          <Content style={{margin:20, backgroundColor: '#fff'}}>
            <Routes>
              <Route path="/home" element={<Home/>}/>
              <Route path="/category" element={<Category/>}/>
              <Route path="/product" element={<Product/>}/>
              <Route path="/role" element={<Role/>}/>
              <Route path="/user" element={<User/>}/>
              <Route path="/bar" element={<Bar/>}/>
              <Route path="/line" element={<Line/>}/>
              <Route path="/pie" element={<Pie/>}/>
              <Route path="*" element={<Navigate to="/home"/>}/>
            </Routes>
          </Content>
          <Footer style={{textAlign: 'center', color: '#aaaaaa'}}>
            推荐使用谷歌浏览器，可获得最佳页面操作体验
          </Footer>
        </Layout>
      </Layout>
  );
}

export default Admin;