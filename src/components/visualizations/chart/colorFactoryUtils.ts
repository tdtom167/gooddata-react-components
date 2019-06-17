// (C) 2019 GoodData Corporation
import { AFM } from "@gooddata/typings";

export function findMeasureIndex(afm: AFM.IAfm, measureIdentifier: string): number {
    return afm.measures.findIndex((measure: AFM.IMeasure) => measure.localIdentifier === measureIdentifier);
}
