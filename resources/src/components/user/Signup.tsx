import React from 'react';
import { Form, Input, Button, Card } from 'antd';
import { UserSignupRequestTypes } from '../../types/SignupType';

export const Signup: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: UserSignupRequestTypes) => {
    console.log('Received values:', values);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '5% auto' }}>
        <Card title="Create your account" hoverable>
            <Form
                form={form}
                name="sign-in"
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
                >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                    { required: true, message: 'Please enter your name!' },
                    ]}
                >
                    <Input placeholder="Name" />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                    { required: true, message: 'Please enter your email!' },
                    { type: 'email', message: 'Please enter a valid email!' },
                    ]}
                >
                    <Input placeholder="Email" />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                    { required: true, message: 'Please enter your password!' },
                    { min: 8, message: 'Must be at least 8 characters!' },
                    ]}
                >
                    <Input.Password placeholder="Password" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                    Sign In
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    </div>
  );
};