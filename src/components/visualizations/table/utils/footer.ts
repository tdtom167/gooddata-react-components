// (C) 2007-2019 GoodData Corporation
import { getHiddenRowsOffset } from "./row";
import { IPositions, ITableDimensions } from "../../../../interfaces/Table";
import { ITotalWithData } from "../../../../interfaces/Totals";
import { getFooterHeight, getHeaderOffset } from "./layoutUtils";

export function isFooterAtDefaultPosition(
    hasHiddenRows: boolean,
    tableBottom: number,
    windowHeight: number,
): boolean {
    const hiddenRowsOffset: number = getHiddenRowsOffset(hasHiddenRows);

    return tableBottom - hiddenRowsOffset <= windowHeight;
}

export function isFooterAtEdgePosition(
    hasHiddenRows: boolean,
    totals: ITotalWithData[],
    windowHeight: number,
    totalsEditAllowed: boolean,
    totalsAreVisible: boolean,
    tableDimensions: ITableDimensions,
): boolean {
    const { height: tableHeight, bottom: tableBottom } = tableDimensions;

    const footerHeight: number = getFooterHeight(totals, totalsEditAllowed, totalsAreVisible);
    const headerOffset: number = getHeaderOffset(hasHiddenRows);

    const footerHeightTranslate: number = tableHeight - footerHeight;

    return tableBottom + headerOffset >= windowHeight + footerHeightTranslate;
}

export function getFooterPositions(
    hasHiddenRows: boolean,
    totals: ITotalWithData[],
    windowHeight: number,
    totalsEditAllowed: boolean,
    totalsAreVisible: boolean,
    tableDimensions: ITableDimensions,
): IPositions {
    const { height: tableHeight, bottom: tableBottom } = tableDimensions;

    const footerHeight = getFooterHeight(totals, totalsEditAllowed, totalsAreVisible);
    const hiddenRowsOffset = getHiddenRowsOffset(hasHiddenRows);
    const headerOffset = getHeaderOffset(hasHiddenRows);

    const footerHeightTranslate = tableHeight - footerHeight;

    return {
        defaultTop: -hiddenRowsOffset,
        edgeTop: headerOffset - footerHeightTranslate,
        fixedTop: windowHeight - footerHeightTranslate - footerHeight,
        absoluteTop: windowHeight - tableBottom,
    };
}
