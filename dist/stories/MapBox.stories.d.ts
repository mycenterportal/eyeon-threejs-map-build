/// <reference types="react" />
import type { StoryObj } from "@storybook/react";
declare const BasicTab: {
    title: string;
    component: import("react").ForwardRefExoticComponent<import("../MapBox").AppProps & import("react").RefAttributes<unknown>>;
    parameters: {
        layout: string;
    };
    tags: string[];
    argTypes: {
        config: {
            control: string;
            description: string;
        };
    };
};
export default BasicTab;
type BasicTabStory = StoryObj<typeof BasicTab>;
export declare const Editor33: BasicTabStory;
export declare const YorkTownCenter: BasicTabStory;
export declare const Editor84Zoom: BasicTabStory;
