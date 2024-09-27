import React from "react";
import toast from "react-hot-toast";
import { FormProvider, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";

import { formLoginSchema, TFormLoginValues } from "./schemas";

import { FormInput, Title } from "../../..";
import { Button } from "@/shared/components";

interface Props {
  onClose?: VoidFunction;
}

export const LoginForm: React.FC<Props> = ({ onClose }) => {
  const form = useForm<TFormLoginValues>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: TFormLoginValues) => {
    try {
      const resp = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (!resp?.ok) {
        return toast.error("Не удалось войти в аккаунт");
      }

      toast.success("Вы успешно вошли в аккаунт");
      onClose?.();
    } catch (error) {
      console.log("Error [LOGIN]", error);
      toast.error("Произошла ошибка при входе в аккаунт");
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <Title text="Войти в аккаунт" size="md" className="font-bold" />
            <p className="text-gray-400">
              Введите свою почту, чтобы войти в свой аккаунт
            </p>
          </div>
          <img
            src="/images/phone-icon.png"
            alt="phone-alt"
            width={60}
            height={60}
          />
        </div>

        <FormInput name="email" label="E-mail" required />
        <FormInput name="password" label="Пароль" type="password" required />

        <Button
          loading={form.formState.isSubmitting}
          className="h-12 text-base"
          type="submit"
        >
          Войти
        </Button>
      </form>
    </FormProvider>
  );
};
