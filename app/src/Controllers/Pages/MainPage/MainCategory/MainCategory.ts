import  {OneCategory, type oneCategoryType} from "~/src/Controllers/Pages/MainPage/MainCategory/OneCategory";
import {Model} from "~/src/Base/Model";
import  {CategoryLine} from "~/src/Controllers/Pages/MainPage/MainCategory/CategoryLine";
import {loadData, UserDataProvider} from "~/src/Base/UserDataProvider";

type mainCategoryModel = {
    categoryChanged: (category: OneCategory) => void;
}

class MainCategory extends Model {
    private _items: Array<OneCategory> = []
    private _categoryLine: CategoryLine;
    private _model: mainCategoryModel
    private _sectionActive: boolean = false
    private _trapFocusDown: boolean = false

    constructor(model: mainCategoryModel){
        super()
        this._categoryLine = new CategoryLine();
        this._model = model
    }

    scrollFocused = () => {
        this._sectionActive = true
        this._categoryLine.setSectionEnabled(true)
    }

    scrollBlured = () => { 
        this._sectionActive = false
        this._categoryLine.setSectionEnabled(false)
    }

    get trapFocusDown() {
        return this._trapFocusDown
    }

    setTrapFocusDown = (bool:boolean) => {
        if(this._trapFocusDown === bool){
            return
        }
        // console.error("SET TRAP FOCUS", bool)
        this._trapFocusDown = bool
        this.updateMe()
    }

    get selectedCategory() {
        return this._items.find(oc=>oc.selected)
    }

    focusOnSelectedItem = () => { 
        // console.error("FOCUSED")
        if(this.selectedCategory && this.selectedCategory.ref && this.selectedCategory.ref.focusItem){
            // console.error("FOCUSED", this.selectedCategory)
            this.selectedCategory.ref.focusItem()
        }
    }

    loadCategories = async () => {
        const response = await loadData(UserDataProvider.loadCategoryIptv, {})
        const data:Array<oneCategoryType> = response.data
        const allCategory = new OneCategory({id: "-1",genre: "all", onSelect: this.onItemSelected, onFocus: this.onFocus, onBlur: this.onBlur, controlCategory: this })
        this._items = [allCategory,...data.map(oci=>new OneCategory({...oci, onSelect: this.onItemSelected, onFocus: this.onFocus, onBlur: this.onBlur, controlCategory: this}))]
        this.updateMe()
    }

    onItemSelected = (item: OneCategory) =>{ 
        this._items.forEach(itt=>{
            itt.setSelected(item.id === itt.id)
        })
    }

    public initCategoryLine = (layout:any) => {
        this._categoryLine.setLayout(layout)
        this._categoryLine.setVisible(true)
        this._categoryLine.updateMe()
    }

    onFocus = (layout:any) => {
        this.initCategoryLine(layout);
        this.onCategoryChanged()
    }

    onCategoryChanged = () => {
        const selected = this._items.find(oi=>oi.focused)
        if(selected){
            this._model.categoryChanged(selected)
        }
    }

    onBlur = () => {
        // this._categoryLine.setLayout(null)
        // this._categoryLine.setVisible(false)
        // this._categoryLine.updateMe()
    }

    get items(){
        return this._items
    }

    get categoryLine(){
        return this._categoryLine
    }

}

export { MainCategory }