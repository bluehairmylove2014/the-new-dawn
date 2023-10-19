"use client";

import CustomLink from "@/components/atoms/CustomLink/CustomLink";
import { stateType } from "@/storages/redux";
import { useSelector } from "react-redux";
import "./styles.scss";

const Breadcrumb = () => {
  const crumbsData = useSelector((state: stateType) => state.crumbs);
  return (
    <></>
    // <div className="breadcrumbs" aria-label="breadcrumbs">
    //   {crumbsData.map((crumb) => (
    //     <CustomLink href={crumb.pathname} key={Math.random()}>
    //       {crumb.name}
    //     </CustomLink>
    //   ))}
    // </div>
  );
};

export default Breadcrumb;
