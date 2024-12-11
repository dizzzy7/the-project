
import { Metadata } from 'next';
import dynamic from 'next/dynamic';

export const metadata: Metadata = {
  title: 'Pen Tool',
  description: 'This is a pen tool',
};

const PenToolApplication = dynamic(() => import('@/components/pen-tool/pen-tool'), {
  ssr: false,
});

const PenToolPage = () => {
  return (
    <div className='relative'>
      <PenToolApplication />
      <div className='absolute top-9 left-1/2 -translate-x-1/2 select-none pointer-events-none text-white text-2xl'>Click and drag anywhere!</div>
    </div>
  );
};

export default PenToolPage;
