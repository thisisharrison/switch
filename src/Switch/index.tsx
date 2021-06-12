import React from "react";
import "./index.css";

interface Props {
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
}

interface State {
    checked: boolean;
}

export default class Switch extends React.PureComponent<Props> {
    public state: State = {
        checked: this.props.checked,
    };
    input: React.RefObject<HTMLInputElement>;

    constructor(props: Readonly<Props>) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.input = React.createRef<HTMLInputElement>();
    }

    handleClick() {
        const {disabled, checked, onChange} = this.props;
        if (disabled) {
            return;
        } else {
            onChange(!checked);
            this.setState({checked: !checked});
            const checkbox = this.input.current;
            if (checkbox) {
                checkbox.checked = !checked;
            }
        }
    }

    handleChange() {
        this.handleClick();
    }

    render() {
        return (
            <>
                <div className="comp-switch" onClick={this.handleClick}>
                    <input ref={this.input} type="checkbox" checked={this.state.checked} disabled={this.props.disabled} onChange={this.handleChange} />
                    <span className="track" role="switch" />
                </div>
                <div>props checked: {JSON.stringify(this.props.checked)}</div>
                <div>state checked: {JSON.stringify(this.state.checked)}</div>
                <div>ref checked: {JSON.stringify(this.input.current && this.input.current.checked)}</div>
                <div>props disabled: {JSON.stringify(this.props.disabled)}</div>
            </>
        );
    }
}
