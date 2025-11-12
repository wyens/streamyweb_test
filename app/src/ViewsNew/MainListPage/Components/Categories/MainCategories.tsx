import React from 'react';
import {ViewItem} from "~/src/Base/ViewItem";
import type {MainCategory} from "~/src/Controllers/Pages/MainPage/MainCategory/MainCategory";
import {OneCategoryView} from "~/src/ViewsNew/MainListPage/Components/Categories/OneCategoryView";
import {CategoryLineView} from "~/src/ViewsNew/MainListPage/Components/Categories/CategoryLineView";


class MainCategoriesView extends ViewItem {
  get controller(): MainCategory {
    return this.props.controller;
  }

  componentDidMount(): void {
    this.controller.loadCategories();
  }
    private handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
        // аналог trapFocusDown для ArrowDown
        if (e.key === 'ArrowDown') {
            if (typeof this.controller.trapFocusDown === 'function') {
                const shouldTrap = this.controller.trapFocusDown;
                if (shouldTrap) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            } else if (this.controller.trapFocusDown) {
                // якщо це флаг boolean
                e.preventDefault();
                e.stopPropagation();
            }
        }
    };

  render() {
    const { items, categoryLine, scrollFocused, scrollBlured, trapFocusDown } = this.controller;
    return (
        <div
            style={styles.container}
            onFocus={scrollFocused}
            onBlur={scrollBlured}
            onKeyDown={this.handleKeyDown}
            tabIndex={0}
        >
            <div style={styles.itemsContainer} className={'scroll-while'}
                 onWheel={(e) => {
                     if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                         (e.currentTarget as HTMLDivElement).scrollLeft += e.deltaY;
                     }
                 }}>
                {items && items.map((oi) => (
                    <OneCategoryView key={`${oi.id}_${oi.keyId}`} ref={oi.set} controller={oi} />
                ))}
                <CategoryLineView ref={categoryLine.set} controller={categoryLine} />
            </div>
        </div>
    );
  }
}

export { MainCategoriesView };

const styles: Record<string, React.CSSProperties> = {
    container: {
        outline: "none",
    },
    itemsContainer: {
        position: "relative",
        overscrollBehaviorX: "contain",
        // display: "flex",
        // flexDirection: "row",
        // paddingLeft: 10,
        // width: "100%",
        // borderColor: "#2C2F42",
        // borderBottomWidth: 1,
        // borderBottomStyle: "solid",
        // overflowX: "auto",
        // overflowY: "hidden",
        // scrollbarWidth: "thin",
    },
};