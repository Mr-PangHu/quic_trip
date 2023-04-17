import dynamic from 'next/dynamic';

const ChatPage = dynamic(() => import('../../components/chat'), { ssr: false });

export default ChatPage