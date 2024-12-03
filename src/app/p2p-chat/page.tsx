import { Metadata } from 'next';
import dynamic from 'next/dynamic';

export const metadata: Metadata = {
  title: 'P2P Chat',
  description: 'This is the P2P Chat page',
};

const P2PChatPage = () => {
  return (
    <div>This is the P2PChatPage</div>
  );
};

export default P2PChatPage;
