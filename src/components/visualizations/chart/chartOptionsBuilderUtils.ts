// (C) 2019 GoodData Corporation
import { AFM, Execution } from "@gooddata/typings";
import { findMeasureIndex } from "./colorFactoryUtils";
import get = require("lodash/get");

export function findParentMeasureIndex(afm: AFM.IAfm, measureItemIndex: number): number {
    const measureDefinition = afm.measures[measureItemIndex].definition;

    if (AFM.isPopMeasureDefinition(measureDefinition)) {
        const sourceMeasureIdentifier = measureDefinition.popMeasure.measureIdentifier;
        return findMeasureIndex(afm, sourceMeasureIdentifier);
    }
    if (AFM.isPreviousPeriodMeasureDefinition(measureDefinition)) {
        const sourceMeasureIdentifier = measureDefinition.previousPeriodMeasure.measureIdentifier;
        return findMeasureIndex(afm, sourceMeasureIdentifier);
    }

    return -1;
}

export function isDerivedMeasure(measureItem: Execution.IMeasureHeaderItem, afm: AFM.IAfm) {
    return afm.measures.some((measure: AFM.IMeasure) => {
        const measureDefinition =
            get(measure, "definition.popMeasure") || get(measure, "definition.previousPeriodMeasure");
        const derivedMeasureIdentifier = measureDefinition ? measure.localIdentifier : null;
        return (
            derivedMeasureIdentifier &&
            derivedMeasureIdentifier === measureItem.measureHeaderItem.localIdentifier
        );
    });
}
