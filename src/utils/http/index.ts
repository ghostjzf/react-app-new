// 文档查看：https://github.com/mzabriskie/axios
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import qs, { IStringifyOptions } from 'qs';
// import security from 'stores/security';
import Modal from '@/components/Modal';
// doc:  https://github.com/ljharb/qs

declare module 'axios' {
  interface AxiosRequestConfig {
    useJson?: boolean;
    qsOptions?: IStringifyOptions;
    noAuth?: boolean;
    check401?: boolean;
  }

  interface AxiosResponse {
    [key: string]: any;
  }
}

export default axios;

type ErrorCode = number | string;
type ErrorMsg = string;
interface IError extends Error {
  error_code: ErrorCode;
  error_msg: ErrorMsg;
  response: AxiosResponse;
}

interface IData {
  error_msg?: ErrorMsg;
  errmsg?: ErrorMsg;
  error_description?: ErrorMsg;
  error_message?: ErrorMsg;
  message?: ErrorMsg;
  description?: ErrorMsg;
  msg?: ErrorMsg;

  error_code?: ErrorCode;
  errcode?: ErrorCode;
  code?: ErrorCode;
}

const ERROR_MSG = {
  /* 网络类异常 */
  OFF_LINE: __('抱歉，您貌似还没连接到网络，请检查网络连接'),
  CANCEL: '抱歉，请求已取消',
  200: '抱歉，请求失败',
  401: __('抱歉，您貌似还没有登录'),
  403: '抱歉，您没有权限访问该页面',
  413: '抱歉，您上传文件太大',

  404: '抱歉，您访问的接口地址貌似不存在',
  500: '抱歉，当前服务器异常，请稍后再试',
  503: '抱歉，当前服务器异常，请稍后再试'
};

axios.defaults.withCredentials = true;

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  if (!config.timeout) {
    config.timeout = 60 * 1000;
  }

  config.params = Object.assign(
    {
      _s: Date.now()
      //   timezone: ui.settings.timezone,
      //   lang: i18n.language
    },
    config.params
  );

  // 增加对表单数组提交的支持
  if (!config.useJson && (config.method === 'post' || config.method === 'put')) {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';

    config.transformRequest = (data: any) => {
      if (typeof data === 'string') {
        return data;
      }

      return qs.stringify(data, config.qsOptions);
    };
  }

  // 请求添加token头
  // if (!config.noAuth && security.token) {
  //   config.headers.Authorization = `Basic ${security.token}`;
  // }

  return config;
});

// 针对请求预期文件却返回json格式的请求，尝试进行解析
// const parseJsonResponseData = (response) => {
//   const isReqArrayBufferType = response.request.responseType === 'arraybuffer';

//   if (!isReqArrayBufferType) {
//     return response.data;
//   }

//   const contentType = response.headers['content-type'];
//   const isJsonResponseType = !!contentType && contentType.indexOf('json') !== -1;

//   if (isJsonResponseType && isReqArrayBufferType) {
//     const resText = Buffer.from(response.data).toString('utf8');
//     const resJson = JSON.parse(resText);

//     return resJson;
//   }

//   return response.data;
// };

// 请求图片等文件资源，返回却是JSON（错误信息）, 需要对response.data做下处理
// axios.interceptors.response.use(
//   (response: AxiosResponse) => {
//     response.data = parseJsonResponseData(response);

//     return response;
//   },
//   (responseError: AxiosError) => {
//     if (responseError && responseError.response) {
//       responseError.response.data = parseJsonResponseData(responseError.response);
//     }

//     return Promise.reject(responseError);
//   }
// );

axios.interceptors.response.use((response: AxiosResponse) => {
  const data = response.data;

  // if (data && typeof data === 'object') {
  //   if (
  //     ('code' in data && data.code * 1 !== 0 && data.code * 1 !== 200) || // code !== 200 针对CMP相关业务接口添加
  //     ('status' in data && data.status !== 'ok' && `${data.status}` !== '200') ||
  //     ('is_succ' in data && !data.is_succ) ||
  //     ('errcode' in data && data.errcode * 1 !== 0)
  //   ) {
  //     return createError({ response } as AxiosError);
  //   }

  //   return data;
  // }

  return data;
}, createError);

/**
 * @description 返回一个以包装后的error对象为拒绝原因的promise
 *
 * @return {promise}
 */
function createError(responseError: AxiosError): Promise<any> {
  let error_code!: ErrorCode;
  let error_msg!: ErrorMsg;
  let response: AxiosResponse = {} as AxiosResponse;

  const pickError = function (data: IData) {
    if (data && typeof data === 'object') {
      const msg =
        data.error_msg ||
        data.error_description ||
        data.error_message ||
        data.errmsg ||
        data.message ||
        data.msg ||
        data.description;
      const code = data.error_code || data.errcode || data.code;

      if (msg && !error_msg) {
        error_msg = msg;
      }

      if (code && !error_code) {
        error_code = code;
      }
    }
  };

  // 请求已经发送，并且服务器有返回
  if (responseError.response) {
    response = responseError.response;

    // 接口的返回内容
    const body = response.data;

    if (body && typeof body === 'object') {
      // 有的接口错误描述还被包了一层，所以也尝试解析
      pickError(body.data);
      pickError(body);
    }

    // 如果依然没有取到错误code，这使用http code当作错误code
    if (!error_code) {
      error_code = response.status;
    }
  } else if (responseError.request) {
    // 请求已发送但是没有收到服务器响应
    if ('onLine' in navigator && navigator.onLine === false) {
      error_code = 'OFF_LINE';
    } else if (responseError.code === 'ECONNABORTED') {
      error_code = 504;
      error_msg = `网络请求超时(${responseError.config.timeout}ms)，请确认网络正常并重试`;
    }
  } else {
    // 请求未发出
    error_msg = responseError.message;

    if (axios.isCancel(responseError)) {
      error_code = 'CANCEL';
    }
  }

  if (!error_code) {
    error_code = -1;
  }

  if (!error_msg) {
    error_msg = ERROR_MSG[error_code] || response.statusText || `抱歉，当前请求异常(${error_code})`;
  }

  const error = new Error(error_msg) as IError;

  error.error_code = error_code;
  error.error_msg = error_msg;
  error.response = response;

  // 未登录
  if (error.error_code === 401 && (!response.config || response.config.check401 !== false)) {
    // security.clearToken();

    return new Promise((resolve, reject) => {
      Modal.confirm({
        title: __('您貌似登录已失效'),
        content: __('是否立即去登录？'),
        okText: __('去登录'),
        onOk(close) {
          close();

          //   ui.router.history.push(`/login?next=${ui.router.location.pathname}`);
        },
        onCancel(close) {
          close();
          reject(error);
        }
      });
    });
  }

  return Promise.reject(error as IError);
}
