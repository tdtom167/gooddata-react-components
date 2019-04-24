// (C) 2007-2019 GoodData Corporation
import React, { Component } from 'react';
import { AfmComponents } from '@gooddata/react-components';
import '@gooddata/react-components/styles/css/main.css';
import Measure from 'react-measure';

import { projectId, totalSalesIdentifier, locationResortIdentifier } from '../utils/fixtures';

export class ResponsiveExample extends Component {
    constructor() {
        super();
        this.state = { size: [500, 400] };
    }

    resize(size) {
        this.setState({ size });
    }

    render() {
        const afm = {
            measures: [
                {
                    localIdentifier: 'amount',
                    definition: {
                        measure: {
                            item: {
                                identifier: totalSalesIdentifier
                            }
                        }
                    },
                    alias: '$ Total Sales',
                    format: '#,##0'
                }
            ],
            attributes: [
                {
                    displayForm: {
                        identifier: locationResortIdentifier
                    },
                    localIdentifier: 'location_resort'
                }
            ]
        };
        const [width, height] = this.state.size;

        return (
            <div>
                <button onClick={() => this.setState({ size: [500, 400] })} className="button button-secondary">500x400</button>
                <button onClick={() => this.setState({ size: [800, 200] })} className="button button-secondary s-resize-800x200">800x200</button>

                <hr className="separator" />

                <div style={{ width, height }} className="s-resizable-vis">
                    <Measure client>
                        {({ measureRef, contentRect }) => (
                            <div
                                ref={measureRef}
                                style={{ width: '100%', height: '100%' }}
                            >
                                <AfmComponents.BarChart
                                    width={contentRect.client.width}
                                    height={contentRect.client.height}
                                    projectId={projectId}
                                    afm={afm}
                                />
                            </div>
                        )}
                    </Measure>
                </div>
            </div>
        );
    }
}

export default ResponsiveExample;
