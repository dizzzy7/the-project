import PenToolSvg from '@/components/pen-tool/pen-tool-svg';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pen Tool SVG',
  description: 'This is the Pen Tool SVG Page',
};

const PenToolSvgPage = () => {
  return (
    <div className='bg-slate-700 h-screen text-white'>
      <PenToolSvg />
    </div>
  );
};

export default PenToolSvgPage;
