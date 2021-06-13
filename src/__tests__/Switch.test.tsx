import React from "react";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Switch from "../Switch/index";

function setUpControlledSwitch(options = {}): any {
    const onChange = jest.fn();
    render(<Switch checked={false} onChange={onChange} disabled={false} {...options} />);
    const track = screen.getByRole("switch");
    const checkbox = screen.getByRole("checkbox");
    return [track, checkbox, onChange];
}

function setUpUncontrolledSwitch(options = {}): any {
    const ref = React.createRef<Switch>();
    render(<Switch defaultChecked={false} ref={ref} {...options} />);
    const track = screen.getByRole("switch");
    const checkbox = screen.getByRole("checkbox");
    return [track, checkbox, ref];
}

describe("Controlled <Switch />", () => {
    test("Switch on", () => {
        const [track, checkbox, onChange] = setUpControlledSwitch();
        userEvent.click(track);
        expect(onChange).toBeCalledTimes(1);
        expect(onChange).toBeCalledWith(true);
        expect(checkbox).toBeChecked();
    });

    test("Swicth off", () => {
        const [track, checkbox, onChange] = setUpControlledSwitch({checked: true});
        userEvent.click(track);
        expect(onChange).toBeCalledTimes(1);
        expect(onChange).toBeCalledWith(false);
        expect(checkbox).not.toBeChecked();
    });

    test("Switch disabled", () => {
        const [track, checkbox, onChange] = setUpControlledSwitch({disabled: true});
        expect(checkbox).not.toBeChecked();
        userEvent.click(track);
        expect(onChange).toBeCalledTimes(0);
        expect(checkbox).not.toBeChecked();
    });
});

describe("Uncontrolled <Switch />", () => {
    test("Switch on", () => {
        const [track, checkbox, ref] = setUpUncontrolledSwitch();
        expect(ref.current.value).toBe(false);
        expect(checkbox).not.toBeChecked();
        userEvent.click(track);
        expect(ref.current.value).toBe(true);
        expect(checkbox).toBeChecked();
    });

    test("Switch off", () => {
        const [track, checkbox, ref] = setUpUncontrolledSwitch({defaultChecked: true});
        expect(ref.current.value).toBe(true);
        expect(checkbox).toBeChecked();
        userEvent.click(track);
        expect(ref.current.value).toBe(false);
        expect(checkbox).not.toBeChecked();
    });

    test("Switch disabled", () => {
        const [track, checkbox, ref] = setUpUncontrolledSwitch({disabled: true});
        expect(ref.current.value).toBe(false);
        expect(checkbox).not.toBeChecked();
        userEvent.click(track);
        expect(ref.current.value).toBe(false);
        expect(checkbox).not.toBeChecked();
    });
});
