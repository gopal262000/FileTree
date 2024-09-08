export const prepareBreadCrumbItems = (activeCrumb, foldersIdMap) => {
  // Create an array to store the breadcrumb items
  const crumbsIds = [];

  // Create a parent map to keep track of each folder's parent
  const parentMap = {};

  // Populate the parentMap based on the children relationships in foldersIdMap
  Object.entries(foldersIdMap).forEach(([parentKey, { children }]) => {
    children?.forEach((child) => {
      parentMap[child] = parentKey;
    });
  });

  // Traverse from the active crumb upwards using the parentMap
  let currentCrumb = activeCrumb;
  while (currentCrumb && parentMap[currentCrumb]) {
    const parent = parentMap[currentCrumb];

    // Avoid duplicates and maintain correct order
    if (!crumbsIds.includes(parent)) {
      crumbsIds.unshift(parent); // Use unshift to maintain correct order from root to active crumb
    }

    currentCrumb = parent;
  }

  // Add the active crumb as the last item in the breadcrumb trail
  crumbsIds.push(activeCrumb);

  // Return the completed array of breadcrumbs
  return crumbsIds;
};
