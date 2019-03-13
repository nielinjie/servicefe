import React from 'react';

import { format } from 'timeago.js';
import { Typography, Row, Col, Statistic, List, Icon, Avatar } from 'antd';




export const Issue = props => {

    const { Text } = Typography;

    return (
        <li>
            <p>{props.message}</p>
            <p>{props.pass ? "通过" : "失败"}</p>
            <Text type="secondary">{format(props.date, 'zh_CN')}</Text>
            <p>{props.inspectPoint.id}</p>
            <Text type={props.inspectPoint.level >= 5 ? "danger" : "warning"}>{props.inspectPoint.level}</Text>
        </li>
    );
};

export const IssueList = props => {
    const result = props.issues.filter(issue => {
        return ((props.noPassOnly && !issue.pass) || (!props.noPassOnly)) && issue.inspectPoint.level >= props.minLevel
    })
    return (
        <>
            <Row gutter={16} className={"counting"}>
                <Col span={12}>
                    <Statistic title="显示问题总数 - " value={result.length} />
                </Col>
            </Row>
            <List className="issue-list"
                itemLayout="horizontal"
                //TODO pageing机制
                dataSource={result.slice(0,100)}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar className={"level-"+item.inspectPoint.level}>{item.inspectPoint.level}</Avatar>}
                            title={item.inspectPoint.id}
                            description={item.message}
                        />
                    </List.Item>
                )}
            />
        </>
    )
}
