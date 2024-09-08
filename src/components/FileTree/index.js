import React, { useEffect, useRef, useState, useContext } from "react";
import { Edit } from "react-feather";

import { FolderCloseIcon, FileIcon } from "./icons.js";
import Modal from "../Modal.js";
import NewFile from "./NewFile";
import Button from "../IconButton/index.js";
import { FolderContext } from "../FolderTree/index.js";
import "./styles.css";
import { Trash2 } from "react-feather";
import DeleteButton from "../DeleteButton/index.js";

const FileTree = ({ foldersIdMap, activeId, onClick }) => {
  const { handleOnAddNewFile } = useContext(FolderContext);
  // const [count, setCount] = useState(0)
  const [isNewFileModalVisible, setIsNewFileModalVisible] = useState(false);

  const root = foldersIdMap[activeId];
  const mainFolderIds = root?.children || [];

  const handleOnNewFileSave = (values) => {
    handleOnAddNewFile(values);
    setIsNewFileModalVisible(false);
  };

  return (
    <div className="folder-wrapper">
      <ol style={{ paddingLeft: 0 }}>
        {mainFolderIds.map((id) => {
          return (
            <SubFolder
              key={id}
              rootId={id}
              foldersIdMap={foldersIdMap}
              onClick={onClick}
            />
          );
        })}
        <li
          className="folder-child"
          onClick={() => setIsNewFileModalVisible(true)}
        >
          + New
        </li>
        <Modal
          isOpen={isNewFileModalVisible}
          onClose={() => setIsNewFileModalVisible(false)}
        >
          <NewFile onSubmit={handleOnNewFileSave} />
        </Modal>
      </ol>
    </div>
  );
};

const SubFolder = ({ foldersIdMap, rootId, onClick }) => {
  const { handleOnTitleEdit, handleOnDelete } = useContext(FolderContext);

  console.log(foldersIdMap);
  const subItem = foldersIdMap[rootId] || null;

  // const [isOpen, setIsOpen] = useState(false);
  const titleInputRef = useRef(null);
  const [editableKey, setEditableKey] = useState(null);
  const [editedTitle, setEditedTitle] = useState(subItem?.title || "");

  const showLine = false;

  useEffect(() => {
    const inputElement = titleInputRef.current;

    const handleOnTitleSave = (event) => {
      if (event.code === "Enter") {
        handleOnTitleEdit(editableKey, editedTitle);
        setEditableKey(null);
      }
    };

    if (inputElement) {
      inputElement.addEventListener("keydown", handleOnTitleSave);
    }

    return () => {
      if (inputElement)
        inputElement.removeEventListener("keydown", handleOnTitleSave);
    };
  }, [editableKey, editedTitle]);

  if (!subItem) return null;
  const { key, title, children } = subItem;

  return (
    <li
      className="folder-child"
      data-show-line={showLine}
      onClick={(event) => {
        event.stopPropagation();
        if (!children || editableKey === rootId) return;

        // setIsOpen(!isOpen);

        onClick(key);
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="icon-title-wrapper">
          {/* {children && (isOpen ? <FolderCloseIcon /> : <FolderOpenIcon />)} */}
          {children && <FolderCloseIcon />}
          {!children && <FileIcon />}
          {editableKey !== rootId ? (
            <span className="folder-title">
              {/* {title} {children && `[ ${children.length} Files ]`} */}
              {title}
            </span>
          ) : (
            <input
              ref={titleInputRef}
              className="input-file-name"
              value={editedTitle}
              onBlur={() => {
                setEditableKey(null);
                handleOnTitleEdit(editableKey, editedTitle);
              }}
              onChange={(event) => {
                event.stopPropagation();
                setEditedTitle(event.target.value);
              }}
            />
          )}
        </div>
        <div className="file-actions">
          <Button
            title="Edit"
            icon={<Edit size={15} />}
            type="link"
            onClick={() => setEditableKey(rootId)}
          />
          <DeleteButton
            title="Delete"
            icon={<Trash2 color="#d11a2a" size={15} />}
            type="link"
            handleOnConfirm={() => handleOnDelete(rootId)}
          />
        </div>
      </div>
      {/* {children && (
        <ol style={{ paddingLeft: "25px", display: isOpen ? "block" : "none" }}>
          {children?.map((childId) => {
            return (
              <SubFolder
                key={childId}
                foldersIdMap={foldersIdMap}
                rootId={childId}
              />
            );
          })}
        </ol>
      )} */}
    </li>
  );
};

export default FileTree;
