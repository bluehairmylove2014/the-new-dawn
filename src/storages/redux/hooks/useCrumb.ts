import { CRUMBS_TEMPLATE } from "@/constants/pages";
import { useDispatch, useSelector } from "react-redux";
import { setCrumbs, stateType } from "..";

type useCrumbType = {
  addNewCrumb: (pathname: string) => void;
};
export const useCrumb = (): useCrumbType => {
  const crumbsData = useSelector((state: stateType) => state.crumbs);
  const dispatch = useDispatch();

  const addNewCrumb = (pathname: string) => {
    const targetCrumb = CRUMBS_TEMPLATE.find(
      (crumb) => crumb.pathname === pathname
    );
    if (targetCrumb) {
      const cloneCrumbsData = [...crumbsData];
      const sameCrumbIndex = cloneCrumbsData.indexOf(targetCrumb);
      console.log("FOUND INDEX: ", sameCrumbIndex);
      console.log("FROM: ", cloneCrumbsData);
      if (sameCrumbIndex !== -1) {
        console.log([1, 2, 3].splice(0, 2));
        cloneCrumbsData.splice(0, sameCrumbIndex);
      } else {
        console.log("PUSH: ", targetCrumb);
        cloneCrumbsData.push(targetCrumb);
      }
      dispatch(setCrumbs(cloneCrumbsData));
    }
  };

  return { addNewCrumb };
};
