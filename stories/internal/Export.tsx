// (C) 2007-2018 GoodData Corporation
import * as React from 'react';
import { IExportConfig, IExportResponse } from '@gooddata/gooddata-js';
import ExportDialog from '@gooddata/goodstrap/lib/Dialog/ExportDialog';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import { BarChart, Headline, PivotTable, Table } from '../../src';
import { Visualization } from '../../src/components/uri/Visualization';
import { IExportFunction, OnExportReady } from '../../src/interfaces/Events';

import { onErrorHandler } from '../mocks';
import {
    ATTRIBUTE_1,
    MEASURE_1,
    MEASURE_1_WITH_ALIAS,
    MEASURE_2
} from '../data/componentProps';

const WRAPPER_STYLE = { width: 800, height: 400 };
const INNER_STYLE = { width: 800, height: 370 };
const BUTTON_STYLE = { marginTop: 10, marginRight: 10 };

interface IWrapperComponentProps {
    children: (onExportReady: OnExportReady) => React.ReactChild;
}

interface IWrapperComponentState {
    showExportDialog: boolean;
}

class WrapperComponent extends React.Component<IWrapperComponentProps, IWrapperComponentState> {
    private exportResult: IExportFunction;

    constructor(props: IWrapperComponentProps) {
        super(props);
        this.state = {
            showExportDialog: false
        };

        this.onExportReady = this.onExportReady.bind(this);
        this.exportToCSV = this.exportToCSV.bind(this);
        this.exportToXLSX = this.exportToXLSX.bind(this);
        this.exportWithCustomName = this.exportWithCustomName.bind(this);
        this.exportWithMergeHeaders = this.exportWithMergeHeaders.bind(this);
        this.doExport = this.doExport.bind(this);

        this.hideExportDialog = this.hideExportDialog.bind(this);
        this.exportWithDialog = this.exportWithDialog.bind(this);
        this.getExportDialog = this.getExportDialog.bind(this);
    }

    public render() {
        const { showExportDialog } = this.state;

        let exportDialog;
        if (showExportDialog) {
            exportDialog = this.getExportDialog();
        }

        return (
            <div style={WRAPPER_STYLE}>
                <div style={INNER_STYLE}>
                    {this.props.children(this.onExportReady)}
                </div>
                <div>
                    <button style={BUTTON_STYLE} onClick={this.exportToCSV}>Export CSV</button>
                    <button style={BUTTON_STYLE} onClick={this.exportToXLSX}>Export XLSX</button>
                    <button style={BUTTON_STYLE} onClick={this.exportWithCustomName}>
                        Export with custom name "CustomName"
                    </button>
                    <button style={BUTTON_STYLE} onClick={this.exportWithDialog}>
                        Export with mergeHeaders
                    </button>
                </div>
                {exportDialog}
            </div>
        );
    }

    private onExportReady(exportResult: IExportFunction) {
        action('onExportReady')('fired');
        this.exportResult = exportResult;
    }

    private getExportDialog() {
        return (
            <ExportDialog
                headline="Export to XLSX"
                cancelButtonText="Cancel"
                submitButtonText="Export"
                isPositive={true}
                seleniumClass="s-dialog"

                mergeHeaders={true}
                mergeHeadersDisabled={false}
                mergeHeadersText="Keep attribute cells merged"
                mergeHeadersTitle="CELLS"

                onCancel={this.hideExportDialog}
                onSubmit={this.exportWithMergeHeaders}
            />
        );
    }

    private exportWithDialog() {
        this.setState({ showExportDialog: true });
    }

    private hideExportDialog() {
        this.setState({ showExportDialog: false });
    }

    private exportToCSV() {
        const options = {};
        action('Export CSV')(options);
        this.doExport(options);
    }

    private exportToXLSX() {
        const options: IExportConfig = { format: 'xlsx' };
        action('Export XLSX')(options);
        this.doExport(options);
    }

    private exportWithCustomName() {
        const options = { title: 'CustomName' };
        action('Export with custom name "CustomName"')(options);
        this.doExport(options);
    }

    private exportWithMergeHeaders() {
        this.hideExportDialog();

        const options: IExportConfig = { format: 'xlsx', mergeHeaders: true };
        action('Export with mergeHeaders')(options);
        this.doExport(options);
    }

    private doExport(exportConfig: IExportConfig) {
        this.exportResult(exportConfig)
            .then(this.doExportSuccess, this.doExportError);
    }

    private doExportSuccess(result: IExportResponse) {
        return action('exportResult success')(result);
    }

    private doExportError(error: Error) {
        return action('exportResult error')(error);
    }
}

storiesOf('Internal/Export', module)
    .add('export chart data', () => (
        <div style={WRAPPER_STYLE}>
            <WrapperComponent>
                {(onExportReady: OnExportReady) => (
                    <BarChart
                        projectId="storybook"
                        measures={[MEASURE_1, MEASURE_2]}
                        viewBy={ATTRIBUTE_1}
                        onExportReady={onExportReady}
                        onError={onErrorHandler}
                        LoadingComponent={null}
                        ErrorComponent={null}
                    />
                )}
            </WrapperComponent>
        </div>
    ))
    .add('export table data', () => (
        <div style={WRAPPER_STYLE}>
            <WrapperComponent>
                {(onExportReady: OnExportReady) => (
                    <Table
                        projectId="storybook"
                        measures={[MEASURE_1, MEASURE_2]}
                        attributes={[ATTRIBUTE_1]}
                        onExportReady={onExportReady}
                        onError={onErrorHandler}
                        LoadingComponent={null}
                        ErrorComponent={null}
                    />
                )}
            </WrapperComponent>
        </div>
    ))
    .add('export pivot table data', () => (
        <div style={WRAPPER_STYLE}>
            <WrapperComponent>
                {(onExportReady: OnExportReady) => (
                    <PivotTable
                        projectId="storybook"
                        measures={[MEASURE_1, MEASURE_2]}
                        rows={[ATTRIBUTE_1]}
                        onExportReady={onExportReady}
                        onError={onErrorHandler}
                        LoadingComponent={null}
                        ErrorComponent={null}
                    />
                )}
            </WrapperComponent>
        </div>
    ))
    .add('export visualization data', () => (
        <div style={WRAPPER_STYLE}>
            <WrapperComponent>
                {(onExportReady: OnExportReady) => (
                    <Visualization
                        projectId="storybook"
                        uri={'/gdc/md/storybook/obj/1003'}
                        onExportReady={onExportReady}
                        onError={onErrorHandler}
                        locale="en-US"
                        LoadingComponent={null}
                        ErrorComponent={null}
                    />
                )}
            </WrapperComponent>
        </div>
    ))
    .add('export headline data', () => (
        <div style={WRAPPER_STYLE}>
            <WrapperComponent>
                {(onExportReady: OnExportReady) => (
                    <Headline
                        projectId="storybook"
                        primaryMeasure={MEASURE_1_WITH_ALIAS}
                        secondaryMeasure={MEASURE_2}
                        onExportReady={onExportReady}
                        LoadingComponent={null}
                        ErrorComponent={null}
                    />
                )}
            </WrapperComponent>
        </div>
    ));
