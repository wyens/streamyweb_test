import { UpdateComponent } from "../../../../Base/UpdateComponent"
import { controllers } from "../../../../Controllers/Controllers"
import { UPDATE } from "../../../../Helpers/constants"
import { CantWatchView } from "./CantWatchView"
import { NoPaymentView } from "./NoPaymentView"


type videoProps = {
    children?: any
}
class PlayerAccessView extends UpdateComponent {
    props: videoProps
    constructor(props:videoProps){
        super(props)
        this.props = props
        this.type = UPDATE.USERINFO
    }

    render(){
        const {isLogin, dateWasEnded} = controllers().auth
        const {children} = this.props
 
        // console.error("END DATE", controllers().auth.userInfo?.endDate)
        // console.error("endDaysLeft", endDaysLeft)
        return !isLogin ? <CantWatchView/> :
        dateWasEnded() ? <NoPaymentView/> :
        children
    }
}

export { PlayerAccessView }