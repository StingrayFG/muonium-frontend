import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { requestUpdate } from 'services/slice/PathSlice';

import FolderService from 'services/FolderService.jsx';

export default function FileContextMenu ({ point, folder, setRenaming }) {
  const dispatch = useDispatch();

  const userData = useSelector(state => state.user);

  const handleRemove = async () => {
    await FolderService.handleRemove(userData, folder)
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
      hover:bg-gradient-to-b hover:from-zinc-400 hover:to-zinc-500 rounded-md'
      onClick={() => {setRenaming(true)}}>
        <img src='/icons/pencil.svg' alt='prev' width='20' className='place-self-center'/>
        <p className='ml-2 place-self-center'>Rename</p>
      </button>

      <button className='w-full h-10 px-2 flex text-left 
      hover:bg-gradient-to-b hover:from-zinc-400 hover:to-zinc-500 rounded-md'
      onClick={handleRemove}>
        <img src='/icons/trash.svg' alt='prev' width='20' className='place-self-center'/>
        <p className='ml-2 place-self-center'>Move to trash</p>
      </button>
    </div>    
  );
};
