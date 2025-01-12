import * as React from 'react';
import { InjectedProps, parameterWrapped } from './ElementWrapper';
import { Colors } from '@blueprintjs/core';
import { NumberParameter } from 'rabbitcontrol';
import { NumberDefinition } from 'rabbitcontrol';
import { isBuffer } from 'util';

interface Props {
    style?: React.CSSProperties;
    label?: string;
    labelDisabled?: boolean;
    labelWidth?: number;
    large?: boolean;
    fixedNumber?: number;
    defaultValue?: any;
};

interface State {
};

export class ParameterTextWithLabelC extends React.Component<Props & InjectedProps, State> {

    constructor(props: Props & InjectedProps) {
        super(props);
    
        this.state = {
        };
    }    

    render() {

        const param = this.props.parameter;
        let unit = "";
        let value = this.props.defaultValue || "";
        let label = this.props.label;

        if (param) {
            label = param.label;
        }
        
        if (this.props.value !== undefined && this.props.value !== null) {
            value = this.props.value as string;
        }

        if (param instanceof NumberParameter) {
            const td = (param.typeDefinition as NumberDefinition);

            if (this.props.fixedNumber !== undefined) {
                value = this.props.value.toFixed(this.props.fixedNumber) as string;
            }

            if (td.unit) {
                unit = (param.typeDefinition as NumberDefinition).unit as string;
                value += " " + unit;
            }

            if (td.maximum && td.minimum) {
                if (param.value < td.minimum || param.value > td.maximum) {
                    value = "Err";
                }
            }
            
        }

        return (
            
            <section style={this.props.style}>
                
                <div style={{                    
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    margin: "1px 0px 2px 0px",
                }}>

                    <div style={{
                        width: this.props.labelDisabled ? 0 : (this.props.labelWidth ? this.props.labelWidth : undefined),
                        // fontSize: this.props.large ? "large" : "normal",
                        color: this.props.disabled ? Colors.VIOLET1 : Colors.VIOLET1,
                    }}>
                        {this.props.labelDisabled ? "" : label}
                    </div>


                    <div style={{
                        marginLeft: this.props.labelDisabled ? 0 : "6px",
                        background: Colors.VIOLET1,
                        flex: "content",
                        flexGrow: 1,
                    }}>

                        <div style={{
                            margin: this.props.labelDisabled ? 0 : "0px 0px 0px 6px",
                            // fontSize: this.props.large ? "large" : "normal",
                            color: this.props.disabled ? Colors.VIOLET1 : Colors.VIOLET1,
                            whiteSpace: "nowrap",
                        }}>
                            {value}
                        </div>
                    </div>

                </div>

            </section>
        );
    }
};

export const ParameterTextWithLabel = parameterWrapped({ignoreReadonly:true})(ParameterTextWithLabelC);