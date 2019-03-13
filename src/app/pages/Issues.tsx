import React, { FC, useCallback, useState } from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'urql';
import { Error, IssueList } from '../components';

import { Slider, Form, Icon, Switch, Button, Spin } from 'antd';

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

export const Issues: FC = () => {
  const [res, executeQuery] = useQuery<QueryResponse>({ query: IssueQuery });
  const refetch = useCallback(
    () => executeQuery({ requestPolicy: 'network-only' }),
    []
  );

  const [minLevel, setMinLevel] = useState(3);
  const [noPassOnly, setNoPassOnly] = useState(true)


  const getContent = () => {
    if (res.fetching || res.data === undefined) {
      return     <Spin style={{justifyContent:'center'}}/>      ;
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
        <Form className={"searching"} layout={"horizontal"} >
          <Form.Item
            label="仅显示未通过检查 - "
          ><Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />}
              defaultChecked onChange={(value) => setNoPassOnly(value)} />
          </Form.Item>
          <Form.Item
            label={"问题等级 - 高于：" + minLevel}
          ><Slider
              min={1} max={5} step={1}
              defaultValue={minLevel}
              onChange={(value) => setMinLevel((value as number))}
            />
          </Form.Item>
          <Form.Item>
          <Button onClick={refetch}>重新载入</Button>
          </Form.Item>
        </Form>
      </div>
      <div className="panel">
      {getContent()}
      </div>
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
