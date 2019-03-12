import React, { FC, useCallback, useState } from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'urql';
import { Error, Loading, Issue, IssueList } from './components';

import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import "antd/dist/antd.css";
import "./index.css"
import { Slider, Form, Input, Checkbox, Icon, Switch, Rate } from 'antd';

interface QueryResponse {
  issues: Array<{
    id: string;
    message: string;
    pass: boolean;
    inspectPoint: {
      level: number
    }
  }>;
}

export const Home: FC = () => {
  const [res, executeQuery] = useQuery<QueryResponse>({ query: IssueQuery });
  const refetch = useCallback(
    () => executeQuery({ requestPolicy: 'network-only' }),
    []
  );

  const [minLevel, setMinLevel] = useState(3);
  const [noPassOnly, setNoPassOnly] = useState(true)


  const getContent = () => {
    if (res.fetching || res.data === undefined) {
      return <Loading />;
    }

    if (res.error) {
      return <Error>{res.error.message}</Error>;
    }

    return (
      <IssueList issues={res.data.issues} minLevel={minLevel} noPassOnly={noPassOnly}></IssueList>
    );
  };

  return (
    <>
      <div>
        <Form className={"searching"}>
          <Form.Item
            label="仅显示未通过检查 - "
          >
            <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />}
              defaultChecked onChange={(value) => setNoPassOnly(value)} />
          </Form.Item>
          <Form.Item
            label={"问题等级 - 高于：" + minLevel}
          >
            <Slider
              min={1} max={5} step={1}
              defaultValue={minLevel}
              onChange={(value) => setMinLevel((value as number))}
            />
          </Form.Item>
        </Form>
      </div>
      {getContent()}
      <button onClick={refetch}>Refetch</button>
    </>
  );
};

const IssueQuery = gql`
query{
  issues{
    id
    message
    pass
    date
    inspectPoint{
      id
      level
    }
  }
}
`;
