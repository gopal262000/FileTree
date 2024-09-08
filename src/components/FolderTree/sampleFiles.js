export const initialFolders = {
  main: {
    title: "Main Directory",
    key: "main",
    children: ["documents", "projects", "designs"],
  },
  documents: {
    title: "Documents",
    key: "documents",
    children: ["notes"],
  },
  projects: {
    title: "Projects",
    key: "projects",
    children: ["archived"],
  },
  designs: {
    title: "Designs",
    key: "designs",
    children: ["wireframes", "mockups", "assets"],
  },
  notes: {
    title: "Project Notes.txt",
    key: "notes",
  },
  wireframes: {
    title: "Wireframes.pdf",
    key: "wireframes",
  },
  mockups: {
    title: "Mockups.psd",
    key: "mockups",
  },
  assets: {
    title: "Assets",
    key: "assets",
    children: ["logos", "icons", "backgrounds"],
  },
  logos: {
    title: "Logos.png",
    key: "logos",
  },
  icons: {
    title: "Icons.svg",
    key: "icons",
  },
  backgrounds: {
    title: "Backgrounds.jpg",
    key: "backgrounds",
  },
  archived: {
    title: "Archived Projects",
    key: "archived",
    children: ["old_designs", "past_notes"],
  },
  old_designs: {
    title: "Old Designs",
    key: "old_designs",
    children: ["archived_wireframes", "archived_mockups"],
  },
  archived_wireframes: {
    title: "Archived Wireframes.pdf",
    key: "archived_wireframes",
  },
  archived_mockups: {
    title: "Archived Mockups.psd",
    key: "archived_mockups",
  },
  past_notes: {
    title: "Past Project Notes.txt",
    key: "past_notes",
  },
};
