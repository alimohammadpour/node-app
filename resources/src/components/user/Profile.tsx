import React from "react";
import { Card, Progress, Space, Spin, Typography } from "antd";
import { useISelector } from "../../hooks";;

const { Text } = Typography;

export const Profile: React.FC = () => {
    const { pending, profile } = useISelector(({ profile }) => profile);
    
    const getProgressPercent = (): number => {
        return profile ? parseInt(profile.progress.completion) : 0; 
    }

    const renderUserProfile = () => {
        return (
            <Space direction="vertical">
                <Text type="secondary">Level: { profile?.progress.level }</Text>
                <Progress
                    type="dashboard"
                    steps={10}
                    percent={getProgressPercent()}
                    trailColor="rgba(0, 0, 0, 0.06)"
                    strokeWidth={20}
                    strokeColor="#87d068"
                    style={{ marginTop: '10%' }}
                />
            </Space>
        );
    }

    return (
        <div style={{ maxWidth: '400px', margin: '5% auto', textAlign: 'center' }}>
            <Card title='Your Progress Detail' hoverable>
                { pending ? <Spin /> : renderUserProfile() }
            </Card>
        </div>
    )
}