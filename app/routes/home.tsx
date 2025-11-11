import {controllers} from "~/src/Controllers/Controllers";
import {MainListPage} from "~/src/ViewsNew/MainListPage/MainListPage";


export default function Home() {
  return <MainListPage ref={controllers().main.mainListPage.set} controller={controllers().main.mainListPage} />
}
