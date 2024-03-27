'use client';

import { useQuery } from '@tanstack/react-query';
import { GET, POST } from '@/api/fetcher';
import React, { useEffect, useState } from 'react';
import { useSocket } from '@/utils/socket-io-provider';

export default function Home() {
  const fetchTestResult = useQuery({
    queryKey: ['fetchTestResult'],
    queryFn: async () => {
      const response = await GET('/testApi.json');

      return response.json();
    },
  });
  const { data: testResult } = fetchTestResult;

  // socket.io 테스트 코드
  const [inputValue, setInputValue] = useState('');
  const [chatData, setChatData] = useState<string[]>([]);
  const { socket, isConnected } = useSocket();

  const getChatData = () => {
    socket?.on('response', (newChatData: string) => setChatData([...chatData, newChatData]));
  };

  /**
   * @description nativeEvent 내의 isComposing 속성을 통해 한글입력이 완료됐는지 확인 가능하다.
   * @param e
   */

  const sendChat = () => {
    if (!inputValue || !isConnected) return;

    socket?.emit('message', inputValue);
    setInputValue('');
    getChatData();
  };

  const onKeydownEnterToInput = (e: React.KeyboardEvent) => {
    if (e.code === 'Enter' && !e.nativeEvent.isComposing) {
      sendChat();
    }
  };

  useEffect(() => {
    if (!socket) return;
    getChatData();
  }, [socket]);

  return (
    <>
      <div className="text-200">tailwind-Test</div>
      <div className="text-200">{testResult}</div>

      <div className="text-50">50</div>
      <div className="text-100">100</div>

      <div className="ml-20 mt-20">
        <div className="w-500 h-200 border rounded-10 overflow-y-scroll">
          {chatData?.map((chat, index) => <p key={index}>{chat}</p>)}
        </div>

        <div className="mt-10">
          <input
            type="text"
            className="border mr-10"
            value={inputValue}
            onKeyDown={(e) => onKeydownEnterToInput(e)}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="button" onClick={sendChat}>보내기</button>
        </div>
      </div>
    </>
  );
}
