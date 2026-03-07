import { getCurrentUser, loginAPI, logoutApi, protectUserAPI } from "@/API/axios";
import { logoutUser, setUser } from "@/Store/authSlice";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
export const useLoginHooks = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: loginAPI,
    onSuccess: (data) => {
      dispatch(setUser(data.user));
      toast.success(data?.message || "Login successful 🎉");
    },
    onError: (error) => {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Authentication failed";

      toast.error(message);
    },
  });
};
export const useLogoutHook = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: logoutApi,
    onSuccess: (data) => {
      dispatch(logoutUser());
      toast.success(data?.message || "Logout successful");
    },
    onError: (error) => {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Logout failed";

      toast.error(message);
    },
  });
};

export const useGetCurrentUser = () => {
  const dispatch = useDispatch();

  const query = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (query.isSuccess && query.data) {
      dispatch(setUser(query.data));
    }

    if (query.isError) {
      dispatch(logoutUser());
    }
  }, [query.isSuccess, query.isError, query.data, dispatch]);

  return query;
};
export const useProtectUser = () => {
  return useQuery({
    queryKey: ["protectUser"],
    queryFn: protectUserAPI,
    retry: false,
  });
};