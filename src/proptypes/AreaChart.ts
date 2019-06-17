// (C) 2019 GoodData Corporation
import { ICommonChartProps } from "../components/core/base/BaseChart";
import { Subtract } from "../typings/subtract";
import { VisualizationInput } from "@gooddata/typings";

export interface IAreaChartBucketProps {
    measures: VisualizationInput.AttributeOrMeasure[];
    viewBy?: VisualizationInput.IAttribute | VisualizationInput.IAttribute[];
    stackBy?: VisualizationInput.IAttribute;
    filters?: VisualizationInput.IFilter[];
    sortBy?: VisualizationInput.ISort[];
}

export interface IAreaChartProps extends ICommonChartProps, IAreaChartBucketProps {
    projectId: string;
}

export type IAreaChartNonBucketProps = Subtract<IAreaChartProps, IAreaChartBucketProps>;
