import React from "react";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Switch from "../Switch/index";

function setUpSwitch(options = {}): any {
    const onChange = jest.fn();
    render(<Switch checked={false} onChange={onChange} disabled={false} {...options} />);
    const track = screen.getByRole("switch");
    const checkbox = screen.getByRole("checkbox");
    return [track, checkbox, onChange];
}
describe("<Switch />", () => {
    test("Switch on", () => {
        const [track, checkbox, onChange] = setUpSwitch();
        userEvent.click(track);
        expect(onChange).toBeCalledTimes(1);
        expect(checkbox).toBeChecked();
    });

    test("Swicth off", () => {
        const [track, checkbox, onChange] = setUpSwitch({checked: true});
        userEvent.click(track);
        expect(onChange).toBeCalledTimes(1);
        expect(checkbox).not.toBeChecked();
    });
});
