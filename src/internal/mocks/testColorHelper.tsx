// (C) 2019 GoodData Corporation
import { DEFAULT_COLOR_PALETTE } from "../../interfaces/Config";
import { cloneDeep } from "lodash";

export function getLargePalette() {
    const largePalette = cloneDeep(DEFAULT_COLOR_PALETTE);

    for (let i = 0; i < DEFAULT_COLOR_PALETTE.length; i++) {
        const itemClon = cloneDeep(DEFAULT_COLOR_PALETTE[i]);
        itemClon.guid = i + "_" + itemClon.guid;
        largePalette.push(itemClon);
    }

    return largePalette;
}

export const colorPalette = [
    {
        guid: "01",
        fill: {
            r: 195,
            g: 49,
            b: 73,
        },
    },
    {
        guid: "02",
        fill: {
            r: 168,
            g: 194,
            b: 86,
        },
    },
    {
        guid: "03",
        fill: {
            r: 243,
            g: 217,
            b: 177,
        },
    },
    {
        guid: "04",
        fill: {
            r: 194,
            g: 153,
            b: 121,
        },
    },
    {
        guid: "05",
        fill: {
            r: 162,
            g: 37,
            b: 34,
        },
    },
];
