// (C) 2007-2018 GoodData Corporation
import * as React from 'react';
import Measure from 'react-measure';
import { IHeaderPredicate } from '../../../interfaces/HeaderPredicate';

import { TableVisualization, ITableVisualizationProps } from './TableVisualization';

export interface ITableProps extends ITableVisualizationProps {
    containerWidth?: number;
    containerHeight?: number;
    drillablePredicates?: IHeaderPredicate[];
}

export class Table extends React.Component<ITableProps> {
    public render(): JSX.Element {
        const { containerHeight, containerWidth } = this.props;
        return (
            <Measure client={true}>
                {({ measureRef, contentRect }: any) => (
                    <div
                        className="viz-table-wrap"
                        style={{ height: '100%', width: '100%', position: 'relative' }}
                        ref={measureRef}
                    >
                        <TableVisualization
                            {...this.props}
                            containerHeight={containerHeight || contentRect.client.height}
                            containerWidth={containerWidth || contentRect.client.width}
                        />
                    </div>
                )}
            </Measure>
        );
    }
}
