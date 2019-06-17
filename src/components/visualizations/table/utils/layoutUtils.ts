// (C) 2019 GoodData Corporation
import {
    DEFAULT_FOOTER_ROW_HEIGHT,
    DEFAULT_HEADER_HEIGHT,
    DEFAULT_ROW_HEIGHT,
    TOTALS_ADD_ROW_HEIGHT,
} from "../constants/tableConstants";
import { ITotalWithData } from "../../../../interfaces/Totals";

export function getHeaderOffset(hasHiddenRows: boolean): number {
    return DEFAULT_HEADER_HEIGHT + (hasHiddenRows ? 1.5 : 1) * DEFAULT_ROW_HEIGHT;
}

export function getFooterHeight(
    totals: ITotalWithData[],
    totalsEditAllowed: boolean,
    totalsAreVisible: boolean,
): number {
    return (
        (totalsAreVisible ? totals.length * DEFAULT_FOOTER_ROW_HEIGHT : 0) +
        (totalsEditAllowed ? TOTALS_ADD_ROW_HEIGHT : 0)
    );
}
