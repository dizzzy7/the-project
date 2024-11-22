
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
  return (<PenToolApplication />);
};

export default PenToolPage;
