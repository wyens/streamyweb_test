import React from "react";

type modalFocusProps = { 
    onFocus?: ()=>void;
    onBlur?: ()=>void;
}

class ModalFocus extends React.Component {
    props: modalFocusProps
    constructor(props: modalFocusProps){
        super(props)
        this.props = props
    }

    componentDidMount(): void {
        if(this.props.onFocus){
            this.props.onFocus()
        }
    }

    componentWillUnmount(): void {
        if(this.props.onBlur){
            this.props.onBlur()
        }
    }

    render() {
        return null
    }
}

export { ModalFocus }