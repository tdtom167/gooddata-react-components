// (C) 2007-2019 GoodData Corporation
import { ISeparators } from "@gooddata/numberjs";
import { AFM } from "@gooddata/typings";

export interface IMenu {
    aggregations?: boolean;
    aggregationsSubMenu?: boolean;
}

export interface IPivotTableConfig {
    separators?: ISeparators;
    menu?: IMenu;
    maxHeight?: number;
}

export interface IMenuAggregationClickConfig {
    type: AFM.TotalType;
    measureIdentifiers: string[];
    attributeIdentifier: string;
    include: boolean;
}

export interface IAggregationsMenuColumnTotal {
    type: AFM.TotalType;
    attributes: string[];
}
