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
            if (this.props.hasOwnProperty("checked") && this.props.hasOwnProperty("onChange")) {
                this.setState({checked: !this.props.checked});
                onChange!(!checked);
            } else {
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
