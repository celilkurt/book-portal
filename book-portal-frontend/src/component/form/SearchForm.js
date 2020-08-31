import React from 'react';
import { Form, Input, Button,Card } from 'antd';

const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  export const SearchForm = (props) => {

    const onFinish = props.onFinish;
    const label = props.label;

      const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
      };
    
      return (
          <Card title={"Search by " + label} style={{ width: 400 }}>

        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label={label}
            name="key"
            rules={[
              {
                required: true,
                message: 'Please input search key!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
          </Form.Item>
        </Form>
        </Card>);
}
