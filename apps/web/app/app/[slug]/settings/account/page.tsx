import { H3 } from '../../../../../components/typography';
import { UpdateAccountForm } from './update-account-form';

export default function AccountSettingsPage() {
  return (
    <div>
      <H3>Account</H3>
      <span>Username and avatar settings</span>
      <div className="w-full mt-8">
        <UpdateAccountForm />
      </div>
    </div>
  );
}
