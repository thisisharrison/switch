import React from "react";
import "./index.css";

// If you wanna implement by TypeScript (Advanced Requirement 1), then rename this file to index.tsx and remove index.jsx
// Otherwise, remove this file

interface Props {
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
}

export default class Switch extends React.PureComponent<Props> {
    render() {
        return <div className="comp-switch">To Be Done</div>;
    }
}
