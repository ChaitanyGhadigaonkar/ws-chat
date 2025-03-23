import { useCallback, useContext } from "react";
import { LoginInput, SignUpInput } from "../types/auth";
import API_INSTANCE from "../api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Output } from "../types/base";
import { useSnackbarContext } from "../context/SnackbarContext";
import { AuthContext } from "../context/AuthContext";

const useAuthentication = () => {
  const { openSnackbar } = useSnackbarContext();

  const { user, fetchUserDetailsLoading } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const signUpMutate = useCallback(
    async (variables: SignUpInput): Promise<Output<unknown>> => {
      try {
        const result = await API_INSTANCE.post(
          "/auth/email-password/register",
          variables
        );
        return result.data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        throw new Error(error.response.data.message);
      }
    },
    []
  );

  const { mutateAsync: registerUser, isPending: registerUserPending } =
    useMutation<Output<unknown>, Error, SignUpInput>({
      mutationFn: (variables) => signUpMutate(variables),
      onSuccess: (data) => {
        if (data.message) {
          openSnackbar("success", data.message);
        }
      },
    });

  const loginMutate = useCallback(async (variables: LoginInput) => {
    try {
      const result = await API_INSTANCE.post(
        "/auth/email-password/login",
        variables
      );
      return result.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }, []);

  const { mutateAsync: loginUser, isPending: loginUserPending } = useMutation<
    Output<unknown>,
    Error,
    SignUpInput
  >({
    mutationFn: (variables) => loginMutate(variables),
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ["userDetails"] });
      }
      if (data.message) {
        openSnackbar("success", data.message);
      }
    },
  });

  const logoutMutate = useCallback(async () => {
    try {
      const result = await API_INSTANCE.get("/auth/logout");
      return result.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }, []);

  const { mutateAsync: logoutUser, isPending: logoutUserPending } = useMutation<
    Output<unknown>,
    Error
  >({
    mutationFn: () => logoutMutate(),
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ["userDetails"] });
      }
      if (data.message) {
        openSnackbar("success", data.message);
      }
    },
  });

  return {
    user,
    fetchUserDetailsLoading,
    registerUser,
    registerUserPending,
    loginUser,
    loginUserPending,
    logoutUser,
    logoutUserPending,
  };
};

export default useAuthentication;
