'use client';

import { useQuery } from '@tanstack/react-query';
import { GET, POST } from '@/api/fetcher';

export default function Home() {
  const fetchTestResult = useQuery({
    queryKey: ['fetchTestResult'],
    queryFn: async () => {
      const response = await GET('/testApi.json');

      return response.json();
    },
  });

  const fetchTestResultPost = async () => {
    await POST('/testApi.json', { id: 1 });
  };

  const { data: testResult } = fetchTestResult;

  console.log('result', testResult);

  return (
    <>
      <div className="text-200">tailwind-Test</div>

      <div className="text-50">50</div>
      <div className="text-100">100</div>

      <button onClick={fetchTestResultPost}>Click</button>
    </>
  );
}
