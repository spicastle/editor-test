/**
 * @description fetcher GET 요청
 * @param api
 * @constructor
 */
const GET = async (api: string) => {
  const response = await fetch(api, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response;
};

export {
  GET,
};
