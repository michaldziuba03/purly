import { Button } from "@/common/controls/Button";

export default {
  component: Button,
  title: 'Button',
};

export const Default = () => <Button>Hello world</Button>

export const Outline = () => <Button outline>Hello world</Button>

export const Full = () => <Button full>Hello world</Button>