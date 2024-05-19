import React from "react";
import style from "./loader.module.scss";

export const Loader: React.FC = () => {
  return (
    <div className={style.loader}>
      <div className={style.circle1}></div>
      <div className={style.circle2}></div>
      <div className={style.circle3}></div>
    </div>
  );
};
