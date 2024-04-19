/// <reference types="react" />
import type { StoryObj } from "@storybook/react";
declare const BasicTab: {
    title: string;
    component: import("react").ForwardRefExoticComponent<import("../MapBox").IAppProps & import("react").RefAttributes<unknown>>;
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
export default BasicTab;
type BasicTabStory = StoryObj<typeof BasicTab>;
export declare const Editor35: BasicTabStory;
export declare const Editor33: BasicTabStory;
export declare const Editor80: BasicTabStory;
export declare const Editor81: BasicTabStory;
export declare const Viewer81: BasicTabStory;
export declare const WPSite81: BasicTabStory;
export declare const Editor83: BasicTabStory;
export declare const Viewer83: BasicTabStory;
export declare const Editor84: BasicTabStory;
export declare const Viewer84: BasicTabStory;
export declare const DisplayApp84: BasicTabStory;
export declare const Viewer33: BasicTabStory;
export declare const RESPONSIVE: BasicTabStory;
export declare const Editor8: BasicTabStory;
export declare const Viewer: BasicTabStory;
export declare const WidthDefaultSelected: BasicTabStory;
export declare const YorkTownCenter: BasicTabStory;
export declare const BridgeWaterCommons: BasicTabStory;
export declare const EverGreenMall: BasicTabStory;
export declare const EverGreenMallWP: BasicTabStory;
export declare const EverGreenMallApple: BasicTabStory;
export declare const Editor84Responsive: BasicTabStory;
export declare const CentersSelector: BasicTabStory;
export declare const Editor84Zoom: BasicTabStory;
