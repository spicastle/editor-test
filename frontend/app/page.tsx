'use client';

import { useQuery } from '@tanstack/react-query';
import { GET } from '@/app/api/fetcher';

export default function Home() {
  const fetchTestResult = useQuery({
    queryKey: ['fetchTestResult'],
    queryFn: async () => {
      const response = await GET('/testApi.json');

      return response.json();
    },
  });

  const { data: testResult } = fetchTestResult;

  console.log('result', testResult);

  return (
    <>
      <div className="text-200">tailwind-Test</div>

      <div className="text-50">50</div>
      <div className="text-100">100</div>
    </>
  );
}
