import React from "react";
import { ErrorText, WhiteBlock } from "..";
import { FormInput, FormTextarea } from "../form";
import { Textarea } from "../../ui";
import { AdressInput } from "../address-input";
import { Controller, useFormContext } from "react-hook-form";

interface Props {
  className?: string;
  
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
  const { control } = useFormContext();

  return (
    <WhiteBlock title="3. Адрес доставки" className={className}>
      <div className="flex flex-col gap-5">
        {/* <FormInput
          name="address"
          className="text-base"
          placeholder="Адрес доставки"
        /> */}
        <Controller
          control={control}
          name="address"
          render={({ field, fieldState }) => (
            <>
              <AdressInput onChange={field.onChange} />
              {fieldState.error?.message && (
                <ErrorText text={fieldState.error.message} />
              )}
            </>
          )}
        />
        <FormTextarea
          className="text-base"
          placeholder="Комментарий к заказу"
          rows={5}
          name="comment"
        />
      </div>
    </WhiteBlock>
  );
};
