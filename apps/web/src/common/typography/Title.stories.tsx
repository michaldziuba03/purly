import { Title } from "@/common/typography/Title";
import { GradientText } from "@/common/typography/GradientText";

export default {
    component: Title,
    title: 'Title',
};

export const H1 = () => <Title>Hello world</Title>

export const H1Gradient = () => (
    <Title>
        Hello world. My name is <GradientText>Michał</GradientText>
    </Title>
)

export const H2 = () => <Title size={2}>Hello world</Title>

export const H3 = () => <Title size={3}>Hello world</Title>

export const H4 = () => <Title size={4}>Hello world</Title>
