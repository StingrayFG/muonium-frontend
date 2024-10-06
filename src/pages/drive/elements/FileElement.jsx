import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';

import { ContextMenuContext } from 'contexts/ContextMenuContext.jsx';
import { FolderContext } from 'contexts/FolderContext.jsx';
import { ModalContext } from 'contexts/ModalContext.jsx';

import FileService from 'services/FileService.jsx';

import RenameModal from 'pages/drive/modals/RenameModal';
import ImageModal from 'pages/drive//modals/ImageModal';
import FileElementIcon from 'pages/drive/elements/FileElementIcon';


export default function FileElement ({ file }) {
  const userData = useSelector(state => state.user);
  const driveData = useSelector(state => state.drive);
  const clipboardData = useSelector(state => state.clipboard);
  const settingsData = useSelector(state => state.settings);

  const contextMenuContext = useContext(ContextMenuContext);
  const folderContext = useContext(FolderContext);
  const modalContext = useContext(ModalContext);


  // GETS
  const getIsHovered = () => {
    if (contextMenuContext.hoveredElement) {
      return contextMenuContext.hoveredElement.uuid === file.uuid;
    } else {
      return false;
    }
  }

  const getIsClicked = () => {
    if (contextMenuContext.clickedElements.includes(file)) {
      return true;
    } else {
      return false;
    }
  }

  const getIsRenaming = () => {
    if (contextMenuContext.isRenaming && contextMenuContext.clickedElements.includes(file)) {
      return true;
    } else {
      return false;
    }
  }

  const getIsCut = () => {
    return clipboardData.cutElementsUuids.includes(file.uuid);
  }


  // HANDLERS
  useEffect(() => {
    if (getIsRenaming()) {
      modalContext.openModal(<RenameModal name={file.name} setName={handleNaming} stopNaming={stopNaming} 
        usedNames={folderContext.currentFolder.files.map(f => f.name)} />)
    }
  }, [getIsRenaming()])

  const stopNaming = () => {
    modalContext.closeModal();
    contextMenuContext.setIsRenaming(false);
  }

  const handleNaming = async (name) => {
    if (name && (name !== file.name)) {
      await FileService.handleRename(userData, driveData, { ...file, name: name })
      .then(() => {
        folderContext.reorderFiles({ ...file, name: name });
        contextMenuContext.setIsRenaming(false);
        modalContext.closeModal();
      })
      .catch(() => {
        contextMenuContext.setIsRenaming(false);
        modalContext.closeModal();
      })
    } else {
      contextMenuContext.setIsRenaming(false);
      modalContext.closeModal();
    }
  }

  const handleOnMouseDown = (event) => {
    contextMenuContext.handleOnElementMouseDown(event, file);
  }

  const handleOnMouseEnter = () => {
    contextMenuContext.setHoveredElement(file);
  }
  
  const handleOnMouseLeave = () => {
    contextMenuContext.clearHoveredElement();
  }
  
  const handleOnContextMenu = (event) => {
    contextMenuContext.handleFileContextMenuClick(event, file);
  }

  const handleOnDoubleClick = () => {
    if (file.thumbnail) {
      modalContext.openModal(<ImageModal file={file} />);
    }
  }
  

  // STYLES 
  const getNameStyle = () => {
    let res = '';
    if (getIsClicked()) {
      res = 'bg-sky-400/20 duration-0';
    } else {
      if (getIsHovered()) {
        res = 'bg-sky-400/10 duration-300';
      }
    } 
    return res;
  }

  const getIconStyle = () => { // File icon bg opacity = 0.4
    let res = '';
    if (getIsCut()) {
      res = 'opacity-25 duration-0';
    } else {
      if (getIsClicked()) {
        res = 'opacity-100 duration-0';
      } else {
        if (getIsHovered()) {
          res = 'opacity-75 duration-300';
        } else {
          res = 'opacity-50 duration-300';
        }
      }
    }  
    return res;
  }

  const getImageStyle = () => { // File icon bg opacity = 0.4
    let res = '';
    if (getIsCut()) {
      res = 'opacity-50';
    } else {
      res = 'opacity-100';
    }  
    return res;
  }

  
  // RENDER
  if (file) {
    if (settingsData.type === 'grid') {
      return (
        <Box className={`w-full h-full p-4 place-self-center border-box
        transition-all duration-300`}>
    
          <Box className={`w-full aspect-4-3 grid`}
          onMouseDown={handleOnMouseDown}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
          onContextMenu={handleOnContextMenu}
          onDoubleClick={handleOnDoubleClick}>
            {file.thumbnail ? 
              <img className={`w-full h-full object-contain 
              transition-all
              ${getImageStyle()}`}
              src={'data:image/png;base64,' + file.thumbnail} 
              draggable={false} />
              :
              <Box className={`w-full h-full place-self-center 
              transition-all
              pointer-events-none select-none 
              ${getIconStyle()}`}>
                <FileElementIcon file={file}/>
              </Box>
            }
          </Box>
    
          <Box className='w-full pt-2 place-self-center overflow-visible'
          onMouseDown={handleOnMouseDown}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
          onContextMenu={handleOnContextMenu}
          onDoubleClick={handleOnDoubleClick}>
            <p className={`w-fit max-w-full h-full min-h-6 mx-auto px-1 place-self-center 
            select-none pointer-events-none
            transition-all
            rounded-[0.3rem] overflow-hidden max-w-32
            leading-6 text-center break-words whitespace-pre-wrap second-line-ellipsis
            ${getNameStyle()}`}>
              {file.name}   
            </p>
          </Box>

        </Box>
      );
    } 
  }
    
}
