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
export declare const StagingPortal: BasicTabStory;
export declare const StagingWpSite: BasicTabStory;
export declare const StagingDisplayApp: BasicTabStory;
export declare const ProdPortal: BasicTabStory;
export declare const ProdWpSite: BasicTabStory;
export declare const ProdDisplayApp: BasicTabStory;
