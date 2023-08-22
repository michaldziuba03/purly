import { UseFormReturn, useWatch } from 'react-hook-form';
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
import { useMemo, useState } from 'react';
import { Label } from '../../../../../components/label';

interface IUtmBuilderProps {
  form: UseFormReturn<any>;
}

export function UtmBuilder({ form }: IUtmBuilderProps) {
  const [showFields, setShowFields] = useState(false);
  const utmParams = useWatch({
    control: form.control,
    name: 'utm',
  });

  const paramsPreview = useMemo(() => {
    const url = new URLSearchParams();

    for (const param in utmParams) {
      const value = utmParams[param];
      if (value) {
        url.set(param, value);
      }
    }

    return url.toString();
  }, [utmParams]);

  function handleSwitch(checked: boolean) {
    form.setValue('enableUtm', checked);
    setShowFields(checked);
  }

  return (
    <>
      <div className="flex gap-2 text-sm items-center">
        <Switch onCheckedChange={handleSwitch} />
        <span>Add UTMs to track web traffic in analytics tools</span>
      </div>

      {showFields && (
        <>
          <FormField
            name="utm.utm_source"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Source</FormLabel>
                <FormTextControl>
                  <Input placeholder="eg. google, facebook" {...field} />
                </FormTextControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="utm.utm_medium"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Medium</FormLabel>
                <FormTextControl>
                  <Input placeholder="eg. email, banner" {...field} />
                </FormTextControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="utm.utm_campaign"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Campaign</FormLabel>
                <FormTextControl>
                  <Input placeholder="eg. spring_sale" {...field} />
                </FormTextControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="utm.utm_term"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Term</FormLabel>
                <FormTextControl>
                  <Input placeholder="eg. something" {...field} />
                </FormTextControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="utm.utm_content"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormTextControl>
                  <Input placeholder="eg. something_else" {...field} />
                </FormTextControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Label>UTM Preview</Label>
          <div className="text-sm break-words max-w-md text-muted-foreground">
            {paramsPreview ? paramsPreview : '-'}
          </div>
        </>
      )}
    </>
  );
}
