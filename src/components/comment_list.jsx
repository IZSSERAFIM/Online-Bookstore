import {React,useEffect} from 'react';
import { Card, Avatar, Typography, Button, Space } from 'antd';
import { LikeOutlined, MessageOutlined } from '@ant-design/icons';

const { Meta } = Card;
const { Paragraph } = Typography;

function CommentList({ commentData }) {
    // console.log({ commentData });
    return commentData.length ? commentData.map((com) => (
        <Card
            key={com.id} // assuming each comment has a unique id
            style={{ marginTop: 16 }}
            actions={[
                <Space>
                    <Button type="text" icon={<LikeOutlined />} />
                    <span>{com.likes}</span>
                </Space>,
                <Button type="text" icon={<MessageOutlined />} />
            ]}
        >
            <Meta
                avatar={<Avatar src={com.user && process.env.PUBLIC_URL + com.user.avatar} />}
                title={com.user && com.user.name}
                description={<Paragraph>{com.text}</Paragraph>}
            />
        </Card>
    )) : null;
}

export default CommentList;
