import { useRef, useContext } from 'react';

import { DropzoneContext } from 'components/drive/main/context/DropzoneContext';
import { ContextMenuContext } from 'components/drive/main/context/ContextMenuContext.jsx';

export default function DefaultContextMenu ({ point }) {
  const dropzoneContext = useContext(DropzoneContext);
  const contextMenuContext = useContext(ContextMenuContext);

  const windowWidth = useRef(window.innerWidth).current;
  const windowHeight = useRef(window.innerHeight).current;

  const menuWidth = 240;
  const menuHeight = 4 + 40 * 3 + 2 * 1;

  if (point.x + menuWidth > windowWidth) { point.x -= menuWidth; }
  if (point.y + menuHeight > windowHeight) { point.y -= menuHeight; }

  return (
    <div className='w-60
    bg-gradient-to-b from-zinc-600 to-zinc-700 
    border-solid border-2 border-zinc-800 rounded-md
    text-lg font-semibold font-sans text-neutral-200' 
    style={{position: 'absolute', top: point.y, left: point.x}}
    onMouseEnter={() => { contextMenuContext.setHoveredOverMenu(true) }}
    onMouseLeave={() => { contextMenuContext.setHoveredOverMenu(false) }}>
      <button className='w-full h-10 px-2 flex text-left 
      hover:bg-gradient-to-b hover:from-sky-200/50 hover:to-sky-400/50 rounded'
      onClick={dropzoneContext.open}>
        <img src='/icons/upload.svg' alt='prev' width='20' className='place-self-center'/>
        <p className='ml-2 place-self-center'>Upload a file</p>
      </button>    

      <button className='w-full h-10 px-2 flex text-left 
      hover:bg-gradient-to-b hover:from-sky-200/50 hover:to-sky-400/50 rounded'
      onClick={() => { contextMenuContext.setCreatingFolder(true) }}>
        <img src='/icons/file-plus.svg' alt='prev' width='20' className='place-self-center'/>
        <p className='ml-2 place-self-center'>New folder</p>
      </button>    

      <div className='mx-1 border-solid border-t-2 border-zinc-800 border-top'></div>

      <button className='w-full h-10 px-2 flex text-left 
      hover:bg-gradient-to-b hover:from-sky-200/50 hover:to-sky-400/50 rounded'
      onClick={contextMenuContext.handlePaste}>
        <img src='/icons/clipboard-minus.svg' alt='prev' width='20' className='place-self-center'/>
        <p className='ml-2 place-self-center'>Paste</p>
      </button>    
    </div>    
  );
};
