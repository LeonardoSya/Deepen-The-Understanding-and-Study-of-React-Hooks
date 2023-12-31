import React, { useState, Component } from 'react';
import { Checkbox, Input, Button } from 'antd';
import './App.css'

const ThemeContext: any = React.createContext(null);

// Theme style
const theme = {
  dark: {
    color: "#5B8FF9",
    background: "#5B8FF9",
    border: "1px solid #5B8FF9",
    type: "dark",
    buttomType: "primary",
  },
  light: {
    color: "#E86452",
    background: "#E86452",
    border: "1px solid #E86452",
    type: "light",
    buttomType: "default",
  },
};

const App: React.FC<any> = () => {
  const [themeContextValue, setThemeContext] = useState(theme.dark)

  return (
    <ThemeContext.Provider
      value={{ ...themeContextValue, setTheme: setThemeContext }}
    >
      <Child />
    </ThemeContext.Provider>
  )
};

class Child extends Component<any, any> {
  static contextType = ThemeContext;

  render() {
    const { border, setTheme, color, background, buttomType }: any = this.context;  // * 获取Theme Context

    return (
      // * 所有的样式都用变量替换了，变量来自context的解构
      // * 使用主题样式信息渲染组件
      <div style={{ border, color, padding: 20 }}>
        <div>
          <span> 选择主题： </span>
          <CheckboxView
            label="主题1"
            name="dark"
            onChange={() => setTheme(theme.dark)}
          />
          <CheckboxView
            label="主题2"
            name="light"
            onChange={() => setTheme(theme.light)}
          />
        </div>
        <div style={{ color, marginTop: 8 }}>
          大家好，我是Sya，一起玩转Hooks吧！
        </div>
        <div style={{ marginTop: 8 }}>
          <Input
            placeholder="请输入你的名字"
            style={{ color, border, marginBottom: 10 }}
          />
          <Button type={buttomType}>提交</Button>
        </div>
      </div >
    )
  }
}

class CheckboxView extends Component<any, any> {
  static contextType = ThemeContext;

  render() {
    const { label, name, onChange } = this.props;
    const { color, type }: any = this.context;  // * 获取Theme Context(主题上下文)

    return (
      <div
        style={{
          display: "inline-block",
          marginLeft: 10,
        }}
      >
        <Checkbox
          checked={type === name}  // * checkbox选中状态根据当前Theme的类型(dark/light)判断
          style={{ color }}
          onChange={onChange}>
          {label}
        </Checkbox>
      </div>
    )
  }
}


export default App;