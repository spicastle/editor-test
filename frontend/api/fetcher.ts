/**
 * @description fetcher GET 요청
 * @param api
 * @param options
 * @constructor
 */
const GET = async (api: string, options?: any) => {
  const hasMethodKey = Object.keys(options).includes('method');
  // TODO: 예외처리 alert 컴포넌트 생성 필요
  // TODO: 빈 값 처리 공통 함수 생성 필요
  if (hasMethodKey && options.method && options.method !== 'GET') alert('올바른 메소드 형식이 아닙니다.');

  const response = await fetch(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  // TODO: 예외처리 response.status 로 약속하면, stauts 로 에러 메세지 표출하는 공통함수 생성
  if (!response.ok) {
    // TODO: 예외처리 alert 컴포넌트 생성 필요
    alert(response.statusText);
    throw new Error(response.statusText);
  }

  return response;
};

const POST = async (api: string, params: any, options?: any) => {
  const hasMethodKey = Object.keys(options).includes('method');

  if (hasMethodKey && options.method !== 'POST') alert('올바른 메소드 형식이 아닙니다.');

  if (!params) alert('params 값이 없습니다.');

  const response = await fetch(api, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
    ...options,
  });

  if (!response.ok) {
    alert(response.statusText);
    throw new Error('Network response was not ok');
  }

  return response;
};

export {
  GET,
  POST,
};
