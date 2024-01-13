import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { requestUpdate } from 'services/slice/PathSlice';

import FileService from 'services/FileService.jsx';

export default function TrashFileContextMenu ({ point, file }) {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user);

  const handleRecover = async () => {
    await FileService.handleRecover(userData, file)
    .then(() => { dispatch(requestUpdate()); })
  }

  const handleDelete = async () => {
    await FileService.handleDelete(userData, file)
    .then(() => { dispatch(requestUpdate()); })
  }

  const windowWidth = useRef(window.innerWidth).current;
  const windowHeight = useRef(window.innerHeight).current;

  const menuHeight = 4 + 40 * 2;

  if (point.x + 192 > windowWidth) { point.x -= 192; }
  if (point.y + menuHeight > windowHeight) { point.y -= menuHeight; }

  return (
    <div className='w-48
    bg-gradient-to-b from-zinc-600 to-zinc-700 
    border-solid border-2 border-zinc-800 rounded-md
    text-lg font-semibold font-sans text-neutral-200' 
    style={{position: 'absolute', top: point.y, left: point.x}}>
      <button className='w-full h-10 px-2 flex text-left 
      hover:bg-gradient-to-b hover:from-sky-200/50 hover:to-sky-400/50 rounded'
      onClick={handleRecover}>
        <img src='/icons/arrow-clockwise.svg' alt='prev' width='20' className='place-self-center'/>
        <p className='ml-2 place-self-center'>Recover</p>
      </button>

      <button className='w-full h-10 px-2 flex text-left 
      hover:bg-gradient-to-b hover:from-sky-200/50 hover:to-sky-400/50 rounded'
      onClick={handleDelete}>
        <img src='/icons/trash.svg' alt='prev' width='20' className='place-self-center'/>
        <p className='ml-2 place-self-center'>Delete</p>
      </button>
    </div>    
  );
};