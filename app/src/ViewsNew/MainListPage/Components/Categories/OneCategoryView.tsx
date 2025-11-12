import {ViewItem} from "~/src/Base/ViewItem";
import type {OneCategory} from "~/src/Controllers/Pages/MainPage/MainCategory/OneCategory";
import {mergeStyles} from "~/src/Helpers/Helpers";
import {TextItem} from "~/src/Views/Components/TextItem";
import React from "react";
import {FONTCOLOR} from "~/src/assets/styles/colors";


type stateCategory = {
    focused: boolean;
}
class OneCategoryView extends ViewItem {
    state: stateCategory = {
        focused: false
    }

    private containerRef = React.createRef<HTMLDivElement>();
    private buttonRef = React.createRef<HTMLButtonElement>();
    private resizeObs?: ResizeObserver;

    get controller():OneCategory{
        return this.props.controller
    }

    focusItem = () => {
        this.setState({focused: true})
    }

    onBlur = () => {
        this.controller.onBlurItem()
        this.setState({focused: false})
    }

    componentDidMount(): void {
        const { setLayout, setTouchableRef } = this.controller;

        // передаємо реф кнопки в контролер (аналог RN ref)
        if (typeof setTouchableRef === "function") {
            setTouchableRef(this.buttonRef as any);
        }

        // емулюємо onLayout
        this.reportLayout();
        if ("ResizeObserver" in window && this.containerRef.current) {
            this.resizeObs = new ResizeObserver(() => this.reportLayout());
            this.resizeObs.observe(this.containerRef.current);
        } else {
            window.addEventListener("resize", this.reportLayout);
        }
    }

    componentWillUnmount(): void {
        if (this.resizeObs && this.containerRef.current) {
            this.resizeObs.unobserve(this.containerRef.current);
        } else {
            window.removeEventListener("resize", this.reportLayout);
        }
    }

    private reportLayout = () => {
        const { setLayout } = this.controller;
        const el = this.containerRef.current;
        if (!el || typeof setLayout !== "function") return;
        const rect = el.getBoundingClientRect();
        // передай те, що очікує контролер (у RN це event.nativeEvent.layout)
        setLayout({
            nativeEvent: {
                layout: {
                    x: rect.left,
                    y: rect.top,
                    width: rect.width,
                    height: rect.height,
                },
            },
        } as any);
    };

    render(){
        const { genre, focused, selected, onFocusItem, onBlurItem, setLayout, setTouchableRef } = this.controller
        // return <View style={styles.container} onLayout={setLayout}>
        //         <Pressable
        //             ref={setTouchableRef}
        //             onPress={() => {}}
        //             focusable={true}
        //             isTVSelectable={true}
        //             onFocus={onFocusItem}
        //             onBlur={this.onBlur}
        //             hasTVPreferredFocus={this.state.focused}
        //             style={[styles.oneCategory, focused && styles.oneCategoryFocused, selected && styles.oneCategoryFocused]}
        //             >
        //         <Text style="categoryItem" customStyle={[styles.textDefault, focused && styles.textSelected, , selected && styles.textSelected]}>{genre}</Text>
        //     </Pressable>
        // </View>

        const oneCategoryStyle = mergeStyles(
            styles.oneCategory,
            (focused || selected) && styles.oneCategoryFocused
        );

        const textStyle = mergeStyles(
            styles.textDefault,
            (focused || selected) && styles.textSelected
        );
        return (
            <div ref={this.containerRef} style={styles.container}>
                <button
                    ref={setTouchableRef}
                    type="button"
                    onClick={() => {}}
                    onFocus={onFocusItem}
                    onBlur={this.onBlur}
                    onMouseEnter={this.focusItem}
                    onMouseLeave={this.onBlur}
                    tabIndex={0}
                    style={oneCategoryStyle}
                >
                    <TextItem style="categoryItem" customStyle={textStyle}>
                        {genre}
                    </TextItem>
                </button>
            </div>
        )
    }
}

export { OneCategoryView }
const styles: Record<string, React.CSSProperties> = {
    container: {},
    oneCategory: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        outline: "none",
        borderBottom: "2px solid transparent",
        transition: "border-color 120ms ease, transform 120ms ease",
    },
    oneCategoryFocused: {
        borderBottom: "2px solid #0DB1FD",
        transform: "scale(1.02)",
    },
    textDefault: {
        color: "#636262",
    },
    textSelected: {
        color: FONTCOLOR,
    },
};