import React from 'react';
import { ViewItem } from '../../Base/ViewItem';
import { MainListPageModel } from '../../Controllers/Pages/NewScreens/MainListPageModel';
import { HeaderPageWithName } from "~/src/Views/Components/HeaderPage/HeaderPageWithName";
import { MainCategoriesView } from "~/src/ViewsNew/MainListPage/Components/Categories/MainCategories";
import { IptvListPageView } from "~/src/ViewsNew/MainListPage/Components/Iptvs/IptvListPageView";
import { HEADER_HEIGHT } from "~/src/Views/Components/HeaderPage/HeaderPage";
import {COLORS, mainBG} from "~/src/assets/styles/colors";

class MainListPage extends ViewItem {
    private focusUnsub: any;
    get controller(): MainListPageModel {
        return this.props.controller;
    }
    componentDidMount(): void { this.controller.init(); }
    componentWillUnmount(): void { this.controller.blur(); this.focusUnsub?.(); }

    render() {
        const { categories, iptvPage, headerRef, controllerLogout } = this.controller;

        return (
            <div className="screen_container" style={styles.screenContainer}>
                <div style={styles.stickyHeader}>
                    <HeaderPageWithName ref={headerRef} controller={controllerLogout} />
                </div>

                <div style={{ ...styles.stickyCategories, top: HEADER_HEIGHT }}>
                    <MainCategoriesView ref={categories.set} controller={categories} />
                </div>

                <div className={'h100'}>
                    <IptvListPageView ref={iptvPage.set} controller={iptvPage} />
                </div>
            </div>
        );
    }
}

export { MainListPage };

const styles: Record<string, React.CSSProperties> = {
    screenContainer: {
        position: "relative",
        height: "100vh",
        overflow: "auto",
    },

    stickyHeader: {
        position: "sticky",
        top: 0,
        zIndex: 1000,
    },

    stickyCategories: {
        position: "sticky",
        zIndex: 1000,
        background: mainBG,
        display: "flex",
        alignItems: "center",
    },
};