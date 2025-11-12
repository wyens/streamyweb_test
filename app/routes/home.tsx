import {controllers} from "~/src/Controllers/Controllers";
import {MainListPage} from "~/src/ViewsNew/MainListPage/MainListPage";


export default function Home() {
    console.log('controllers().main.mainListPage.set', controllers().main.mainListPage.set)
  return <MainListPage ref={controllers().main.mainListPage.set} controller={controllers().main.mainListPage} />
}
