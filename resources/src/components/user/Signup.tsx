import React, { useEffect } from 'react';
import { Form, Input, Button, Card, notification } from 'antd';
import { UserSignupRequestTypes } from '../../types/SignupType';
import { userSignupRequest } from '../../slices/signupSlice';
import { useIDispatch, useISelector } from '../../hooks';
import { NavigateFunction, useNavigate } from 'react-router';
import { getProfileRequest } from '../../slices/profileSlice';

export const Signup: React.FC = () => {
  const [form] = Form.useForm();

  const dispatch = useIDispatch();
  const onFinish = (values: UserSignupRequestTypes) => {
    dispatch(userSignupRequest(values))
  };

  const { pending, user, error } = useISelector((state) => state.signup)
  const [api, contextHolder] = notification.useNotification();
  const navigate: NavigateFunction = useNavigate();

  const handleUserRedirect = (userId: string) => {
    dispatch(getProfileRequest({ userId }));
    navigate(`/user/${userId}/profile/`);
  }

  useEffect(() => {
    if (!pending) {
        if (user) {
            const { message, id } = user;
            api.success({
                message,
                description: 'Redirecting to your profile ...',
                duration: 1,
                onClose: () => {
                    handleUserRedirect(id);
                }
            });
        }
        else if (error) api.error({ message: error });
    }
  })

  return (
    <>
        { contextHolder }
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
    </>
  );
};