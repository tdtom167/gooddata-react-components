// (C) 2007-2019 GoodData Corporation
import * as React from "react";
import { omit } from "lodash";
import { VisualizationObject } from "@gooddata/typings";
import { AreaChart as AfmAreaChart } from "./afm/AreaChart";
import { convertBucketsToAFM } from "../helpers/conversion";
import { getStackingResultSpec } from "../helpers/resultSpec";
import { ATTRIBUTE, MEASURES, STACK } from "../constants/bucketNames";
import { getBucketsProps, getConfigProps, verifyBuckets } from "../helpers/optionalStacking/areaChart";
import { sanitizeComputeRatioOnMeasures, sanitizeConfig } from "../helpers/optionalStacking/common";
import { IAreaChartBucketProps, IAreaChartNonBucketProps, IAreaChartProps } from "../proptypes/AreaChart";

/**
 * [AreaChart](http://sdk.gooddata.com/gooddata-ui/docs/area_chart_component.html)
 * is a component with bucket props measures, viewBy, stacksBy, filters
 */
export function AreaChart(props: IAreaChartProps): JSX.Element {
    verifyBuckets(props);

    const { measures, viewBy, stackBy } = getBucketsProps(props);
    const sanitizedMeasures = sanitizeComputeRatioOnMeasures(measures);
    const configProp = getConfigProps(props);

    const buckets: VisualizationObject.IBucket[] = [
        {
            localIdentifier: MEASURES,
            items: sanitizedMeasures,
        },
        {
            localIdentifier: ATTRIBUTE,
            items: viewBy,
        },
        {
            localIdentifier: STACK,
            items: stackBy,
        },
    ];

    const newProps: IAreaChartNonBucketProps = omit<IAreaChartProps, keyof IAreaChartBucketProps>(props, [
        "measures",
        "viewBy",
        "stackBy",
        "filters",
        "sortBy",
    ]);
    const sanitizedConfig = sanitizeConfig(measures, {
        ...newProps.config,
        ...configProp,
    });

    return (
        <AfmAreaChart
            {...newProps}
            config={sanitizedConfig}
            projectId={props.projectId}
            afm={convertBucketsToAFM(buckets, props.filters)}
            resultSpec={getStackingResultSpec(buckets, props.sortBy)}
        />
    );
}
