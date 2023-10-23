// Import necessary modules and functions
import { IUser } from "@/modules/services/entities";
import { useGetUserQuery } from "../../fetching/query";
import { useUserContext } from "../context";

type useGetUserType = IUser | undefined;
export const useGetUser = (): useGetUserType => {
  const { state } = useUserContext();
  const { data } = useGetUserQuery(state.accessToken);
  return data;
};
