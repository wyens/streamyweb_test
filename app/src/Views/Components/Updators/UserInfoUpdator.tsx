import { UpdateComponent } from "../../../Base/UpdateComponent";
import { UPDATE } from "../../../Helpers/constants";

type baseProps = {
    children: any
}
class UserInfoUpdator extends UpdateComponent {
    props: baseProps
    constructor(props: baseProps){
        super(props)
        this.props = props
        this.type = UPDATE.USERINFO
    }

    render(){
        return <>
            {this.props.children}
        </>
    }
}