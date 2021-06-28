import React from "react";
import "./index.css";

interface Props {
    // props for controlled component
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
    // props for uncontrolled component
    defaultChecked?: boolean;
}

interface State {
    checked: boolean;
}

export default class Switch extends React.PureComponent<Props, State> {
    state: State = {
        checked: !!(this.props.checked || this.props.defaultChecked),
    };
    input: React.RefObject<HTMLInputElement>;

    constructor(props: Readonly<Props>) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.input = React.createRef<HTMLInputElement>();
    }

    componentDidMount() {
        if (this.input.current) {
            this.input.current.checked = this.state.checked;
        }
    }

    // controlled mode can utilize props change to update internal state
    static getDerivedStateFromProps(props: any, state: any) {
        if (props.hasOwnProperty("checked") && props.checked !== state.checked) {
            return {
                checked: props.checked,
            };
        }
        return null;
    }

    handleClick() {
        const {disabled, checked, onChange} = this.props;
        if (disabled) {
            return;
        } else {
            const checkbox = this.input.current;
            if (checkbox) {
                checkbox.focus();
                checkbox.checked = !this.state.checked;
            }
            if (onChange !== undefined) {
                // we don't have to setState here now,
                // because after onChange is called, new props are passed for controlled component
                // we will update state in getDerivedStateFromProps
                // 🙅 this.setState({checked: !this.props.checked});
                onChange(!checked);
            } else {
                // component in uncontrolled mode (no onChange handler), we setState here
                this.setState(prevState => ({checked: !prevState.checked}));
            }
        }
    }

    // for parent to access checked in an uncontrolled component
    get value() {
        return this.state.checked;
    }

    render() {
        return (
            <>
                <div className="comp-switch" onClick={this.handleClick}>
                    <input ref={this.input} type="checkbox" disabled={!!this.props.disabled} />
                    <span className="track" role="switch" />
                </div>
            </>
        );
    }
}
