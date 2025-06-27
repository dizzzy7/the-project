
import PenToolApplication from '@/components/pen-tool/pen-tool';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';

export const metadata: Metadata = {
  title: 'Pen Tool',
  description: 'This is a pen tool',
};

const PenToolPage = () => {
  return (
    <div className='relative'>
      {typeof window !== 'undefined' ? <PenToolApplication /> : ""}
      <div className='absolute top-9 left-1/2 -translate-x-1/2 select-none pointer-events-none text-white text-2xl'>Click and drag anywhere!</div>
    </div>
  );
};

export default PenToolPage;
