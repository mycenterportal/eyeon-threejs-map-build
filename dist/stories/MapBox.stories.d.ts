import type { StoryObj } from "@storybook/react";
import MapBox from "../MapBox";
declare const meta: {
    title: string;
    component: typeof MapBox;
    parameters: {
        layout: string;
    };
    tags: string[];
    argTypes: {
        config: {
            control: string;
            description: string;
        };
        stats: {
            control: string;
            description: string;
        };
        mapitData: {
            control: string;
            description: string;
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Editor35: Story;
export declare const Editor33: Story;
export declare const Editor80: Story;
export declare const Editor81: Story;
export declare const Viewer81: Story;
export declare const WPSite81: Story;
export declare const Editor83: Story;
export declare const Viewer83: Story;
export declare const Editor84: Story;
export declare const Viewer84: Story;
export declare const DisplayApp84: Story;
export declare const Viewer33: Story;
export declare const RESPONSIVE: Story;
export declare const Editor8: Story;
export declare const Viewer: Story;
export declare const WidthDefaultSelected: Story;
export declare const YorkTownCenter: Story;
export declare const BridgeWaterCommons: Story;
export declare const EverGreenMall: Story;
export declare const EverGreenMallWP: Story;
export declare const EverGreenMallApple: Story;
