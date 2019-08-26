import React from "react";
//...
import LoadingScreen from "react-loading-screen";

const Loading = () => {
  return (
    <LoadingScreen loading={true} spinnerColor="#ef932e" classname="loading">
      <div>Loadable content</div>
    </LoadingScreen>
  );
};

export default Loading;
