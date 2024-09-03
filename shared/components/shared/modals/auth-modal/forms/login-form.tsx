import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { formLoginSchema, TFormLoginValues } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput, Title } from "../../..";
import { Button } from "@/shared/components";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

interface Props {
  onCLose?: VoidFunction;
}

export const LoginForm: React.FC<Props> = ({ onCLose }) => {
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
      onCLose?.();
    } catch (error) {
      console.log("Error [LOGIN]", error);
      toast.error("Произошла ошибка при войти в аккаунт");
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
          {/* {form.formState.isSubmitting ? "Вход..." : "Войти"} */} Войти
        </Button>
      </form>
    </FormProvider>
  );
};
