import React, { useContext, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';

import { FolderContext } from 'contexts/FolderContext.jsx';
import { ContextMenuContext } from 'contexts/ContextMenuContext.jsx';

import FileElement from 'pages/drive/elements/FileElement.jsx';
import FolderElement from 'pages/drive/elements/FolderElement.jsx';


export default function FolderContents ({ children }) {
  const folderContext = useContext(FolderContext);
  const contextMenuContext = useContext(ContextMenuContext);

  const settingsData = useSelector(state => state.settings);


  const defaultSize = 200;
  const windowRef = useRef(window.innerWidth);
  const [columnsCount, setColumnsCount] = useState(Math.floor(windowRef.current/ defaultSize));

  const handleResize = (width) => {
    setColumnsCount(Math.floor(width / defaultSize));
  }

  useEffect(() => {
    window.addEventListener('resize', () => handleResize(window.innerWidth));
    return () => window.removeEventListener('resize', handleResize);
  }, [])

  
  return (
    <Box className={`scrollbar scrollbar-sky-300/20 scrollbar-corner-sky-300/20 scrollbar-track-transparent
    ${settingsData.type === 'grid' &&  'w-full h-fit max-h-full grid overflow-y-auto'}`}
    style={{
      gridTemplateColumns: `repeat(${columnsCount}, minmax(0, 1fr))`
    }}>
      {contextMenuContext.isCreatingFolder && (
        <FolderElement />
      )}

      {folderContext.currentFolder.uuid && <>
        {folderContext.currentFolder.folders.map((folder) => (
          <FolderElement key={folder.uuid} folder={folder} />
        ))}
        {folderContext.currentFolder.files.map((file) => (
          <FileElement key={file.uuid} file={file}/>
        ))}
      </>}
    </Box>  
  )  
}