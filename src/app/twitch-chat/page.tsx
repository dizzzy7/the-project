
import TwitchChat from '@/components/TwitchChat';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';

export const metadata: Metadata = {
  title: 'Twitch Chat',
  description: 'This is the Twitch Chat page',
};

const P2PChatPage = () => {
  return (
    <TwitchChat />
  );
};

export default P2PChatPage;
