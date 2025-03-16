import { useCallback } from "react";
import { SignUpInput, SignUpOutput } from "../types/auth";
import API_INSTANCE from "../api/api";
import { useMutation } from "@tanstack/react-query";
import { Output } from "../types/base";
import { useSnackbarContext } from "../context/SnackbarContext";

const useAuthentication = () => {
  const { openSnackbar } = useSnackbarContext();
  const signUpMutate = useCallback(
    async (variables: SignUpInput): Promise<Output<SignUpOutput>> => {
      try {
        const result = await API_INSTANCE.post(
          "/auth/email-password/register",
          variables
        );
        return result.data;
      } catch (error: any) {
        throw new Error(error.response.data.message);
      }
    },
    []
  );

  const { mutateAsync: registerUser, isPending: registerUserPending } =
    useMutation<Output<SignUpOutput>, Error, SignUpInput>({
      mutationFn: (variables) => signUpMutate(variables),
      onSuccess: (data) => {
        if (data.message) {
          openSnackbar("success", data.message);
        }
      },
    });

  return {
    registerUser,
    registerUserPending,
  };
};

export default useAuthentication;
