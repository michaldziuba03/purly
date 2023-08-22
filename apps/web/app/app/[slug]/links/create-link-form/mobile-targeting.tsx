import { UseFormReturn } from 'react-hook-form';
import {
  FormTextControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  optionalField,
} from '../../../../../components/form';
import { Input } from '../../../../../components/input';
import { Switch } from '../../../../../components/switch';
import { useState } from 'react';

interface IMobileTargetingFieldsProps {
  form: UseFormReturn<any>;
}

export function MobileTargetingFields(props: IMobileTargetingFieldsProps) {
  const [showFields, setShowFields] = useState(false);
  const form = props.form;

  return (
    <>
      <div className="flex gap-2 text-sm items-center">
        <Switch
          onCheckedChange={(checked) => {
            form.resetField('androidRedirect');
            form.resetField('iosRedirect');
            setShowFields(checked);
          }}
        />
        <span>Add mobile targeting</span>
      </div>

      {showFields && (
        <>
          <FormField
            name="androidRedirect"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Android URL (Optional)</FormLabel>
                <FormTextControl>
                  <Input
                    placeholder="https://play.google.com/store/apps/details?id=xxx"
                    {...optionalField(field)}
                  />
                </FormTextControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="iosRedirect"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>iOS URL (Optional)</FormLabel>
                <FormTextControl>
                  <Input
                    placeholder="https://apps.apple.com/app/xxx"
                    {...optionalField(field)}
                  />
                </FormTextControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}
    </>
  );
}
