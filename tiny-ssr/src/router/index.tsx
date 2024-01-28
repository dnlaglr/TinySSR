import React, { createContext } from "react";

export const RouterContext = createContext({
  path: "",
  pushState: (path: string) => {},
  replaceState: (path: string) => {}
});

const canWindow = () => typeof window !== "undefined";

export const Route = ({ path, children } : { path: string; children: React.ReactNode; }) => {
  const { path: currentPath } = React.useContext(RouterContext);

  if (currentPath.split("?")[0] === path.split("?")[0]) {
    return <>{children}</>;
  }

  return null;
};

export const Router = ({ children } : { children: React.ReactNode; }) => {
  const [path, setPath] = React.useState<string>(
    canWindow() ? window.location.pathname : ""
  );
  
  const pushState = (path: string) => {
    window.history.pushState({}, "", path);
    setPath(path);
  };

  const replaceState = (path: string) => {
    window.history.replaceState({}, "", path);
    setPath(path);
  };

  React.useEffect(() => {
    window.addEventListener("popstate", () => {
      setPath(window.location.pathname);
    });
  }, []);

  return (
    <RouterContext.Provider value={{ path, pushState, replaceState }}>
      {children}
    </RouterContext.Provider>
  )
};