import dynamic from 'next/dynamic';

const ThreeDRoomScene = dynamic(() => import('@/components/three/ThreeDRoomScene'), { ssr: false })


const ThreeDRoom = () => {

  return (
    <main className='bg-slate-800 h-screen text-white'>
      <ThreeDRoomScene />
    </main>
  );
};

export default ThreeDRoom;
