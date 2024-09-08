import { useState, useMemo, createContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import FileTree from "../FileTree";
import { initialFolders } from "./sampleFiles.js"; // Sample folder structure
import BreadCrumbs from "../FileBreadCrumb";
import { prepareBreadCrumbItems } from "../FileBreadCrumb/utils";

import "./styles.css";

export const FolderContext = createContext();

function FolderTree() {
  const { pathname } = useLocation(); // Dynamic path from URL
  const navigate = useNavigate();

  const [foldersIdMap, setFoldersIdMap] = useState(initialFolders);

  const splittedPath = pathname.split("/");

  const activeCrumb =
    splittedPath[
      splittedPath?.length
        ? splittedPath?.length - 1 || splittedPath?.length - 2
        : "main"
    ] || splittedPath[splittedPath?.length - 2];

  const breadCrumbs = useMemo(() => {
    const crumbIds = prepareBreadCrumbItems(activeCrumb, foldersIdMap);

    let link = `/files`;
    const crumbs = crumbIds.map((crumbId) => {
      link = link + `/${crumbId}`;
      const breadCrumb = {
        ...foldersIdMap[crumbId],
        link,
      };
      if (activeCrumb === crumbId) breadCrumb.isActive = true;
      return breadCrumb;
    });

    return crumbs;
  }, [activeCrumb, foldersIdMap]);

  // Handle clicking on a folder to navigate
  const handleOnClick = (id) => {
    const newPath = pathname ? `${pathname}/${id}` : id;
    navigate(newPath); // Navigate to the constructed path
  };

  // Handle adding a new file or folder
  const handleOnAddNewFile = (newFile) => {
    setFoldersIdMap((prevMap) => ({
      ...prevMap,
      [activeCrumb]: {
        ...prevMap[activeCrumb],
        children: [...prevMap[activeCrumb].children, newFile.key],
      },
      [newFile.key]: newFile,
    }));
  };

  const handleOnTitleEdit = (id, newTitle) => {
    setFoldersIdMap({
      ...foldersIdMap,
      [id]: { ...foldersIdMap[id], title: newTitle },
    });
  };

  const handleOnDelete = (id) => {
    const filteredFoldersIdMap = { ...foldersIdMap };
    delete filteredFoldersIdMap[id];
    setFoldersIdMap(filteredFoldersIdMap);
  };

  return (
    <div className="page-wrapper">
      <FolderContext.Provider
        value={{
          foldersIdMap,
          handleOnTitleEdit,
          handleOnAddNewFile,
          handleOnDelete,
        }}
      >
        <BreadCrumbs breadCrumbs={breadCrumbs} />
        <FileTree
          foldersIdMap={foldersIdMap}
          activeId={activeCrumb}
          onClick={handleOnClick}
        />
      </FolderContext.Provider>
    </div>
  );
}

export default FolderTree;
