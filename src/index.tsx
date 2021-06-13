import React from "react";
import ReactDOM from "react-dom";
import Switch from "./Switch";

import "./index.css";

interface State {
    isSwitchChecked: boolean;
    isSwitchDisabled: boolean;
    isUncontrolledChecked: boolean;
    isUncontrolledDisabled: boolean;
}

class App extends React.Component<{}, State> {
    public state: State = {
        isSwitchChecked: false,
        isSwitchDisabled: false,
        isUncontrolledChecked: false,
        isUncontrolledDisabled: false,
    };

    ref = React.createRef<Switch>();

    componentDidMount() {
        this.state.isUncontrolledChecked = this.ref.current!.value;
    }

    onToggleDisable = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {name} = event.currentTarget;
        if (name === "disable-controlled") {
            this.setState({isSwitchDisabled: !this.state.isSwitchDisabled});
        } else {
            this.setState({isUncontrolledDisabled: !this.state.isUncontrolledDisabled});
        }
    };

    onChange = (checked: boolean) => this.setState({isSwitchChecked: checked});

    getUncontrolledSwitch = () => {
        this.setState({isUncontrolledChecked: this.ref.current!.value});
    };

    render() {
        return (
            <div style={{display: "flex", flexWrap: "wrap", justifyContent: "space-around"}}>
                <div>
                    <h2>Controlled Switch</h2>
                    <Switch checked={this.state.isSwitchChecked} disabled={this.state.isSwitchDisabled} onChange={this.onChange} />
                    <p>Disabled status: {JSON.stringify(this.state.isSwitchDisabled)}</p>
                    <p>Prop status: {JSON.stringify(this.state.isSwitchChecked)}</p>
                    <button type="button" onClick={this.onToggleDisable} name="disable-controlled">
                        Toggle Disable
                    </button>
                </div>
                <div>
                    <h2>Uncontrolled Switch</h2>
                    <Switch defaultChecked={false} ref={this.ref} disabled={this.state.isUncontrolledDisabled} />
                    <p>Disabled status: {JSON.stringify(this.state.isUncontrolledDisabled)}</p>
                    <p>Ref status: {JSON.stringify(this.state.isUncontrolledChecked)}</p>
                    <p style={{fontSize: "0.8rem"}}>(Click 'Get Latest Status' to update Ref status)</p>
                    <button type="button" onClick={this.getUncontrolledSwitch}>
                        Get Latest Status
                    </button>
                    <br />
                    <button type="button" onClick={this.onToggleDisable} name="disable-uncontrolled">
                        Toggle Disable
                    </button>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app")!);
