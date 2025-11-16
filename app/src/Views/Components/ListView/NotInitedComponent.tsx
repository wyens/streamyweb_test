import React from "react";
import { TextItem } from "~/src/Views/Components/TextItem";


type notInitedProps = {
    message: string;
    style?: string;
};

class NotInitedComponent extends React.Component<notInitedProps> {
    constructor(props: notInitedProps) {
        super(props);
    }

    render() {
        const { message } = this.props;

        return (
            <div className="notinit-container">
                <TextItem className="notinit-text">{message}</TextItem>
            </div>
        );
    }
}

export { NotInitedComponent };