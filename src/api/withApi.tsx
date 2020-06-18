import React from 'react';
import { api, Api } from "./index";

interface IProps {
  api: Api;
}

export const withApi = (WrappedComponent: any): any => {
  return function Component(props: any) {
    return <WrappedComponent api={api} {...props} />;
  };
};
