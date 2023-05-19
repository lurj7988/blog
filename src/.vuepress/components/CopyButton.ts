import { type VNode, defineComponent, h } from "vue";

import {
    useThemeData,
    useThemeLocaleData,
} from "@theme-hope/composables/index";
import { CopyIcon } from "./icons";
import juice from 'juice';

import "../styles/copy-button.scss";

export default defineComponent({
    name: "CopyButton",

    setup() {
        const themeData = useThemeData();
        const themeLocale = useThemeLocaleData();
        function mergeCss(html: string) {
            // return juice(html, {
            //     inlinePseudoElements: true,
            //     preserveImportant: true,
            // })
            //const css = document.styleSheets;
            let css = '';
            // for (var i = 0; i < css.length; i++) {
            //     const a = css.item(i)?.cssRules;
            //     if (a) {
            //         //console.log(a);
            //         for (var j = 0; j < a?.length; j++) {
            //             //console.log(a?.item[j])
            //             const b = a[j]?.cssText
            //             txt += b;
            //         }
            //     }
            // }
            // console.log(txt);

            return juice.inlineContent('<article class="markdown-body">' + html + '</article>', css,
                {
                    inlinePseudoElements: true,
                    preserveImportant: true,
                })
        }

        return (): VNode | null =>
            themeData.value.print === false
                ? null
                : h(
                    "button",
                    {
                        type: "button",
                        class: "copy-button",
                        title: "复制",
                        onClick: () => {
                            const elements: HTMLCollectionOf<Element> = document.getElementsByClassName('theme-hope-content');

                            const clipboardDiv: HTMLElement = elements[0] as HTMLElement;;
                            const output = clipboardDiv.innerHTML;
                            //document.getElementsByClassName('line-numbers-mode')[3].removeChild(document.getElementsByClassName('copy-code-button')[0])
                            //console.log(clipboardDiv.innerHTML);
                            clipboardDiv.innerHTML = mergeCss(clipboardDiv.innerHTML)
                            console.log(clipboardDiv.innerHTML);
                            clipboardDiv.focus();
                            window.getSelection()?.removeAllRanges();
                            let range = document.createRange();
                            const firstChild: Node | null = clipboardDiv.firstChild;
                            if (firstChild != null) {
                                range.setStartBefore(firstChild);
                            }
                            const lastChild: Node | null = clipboardDiv.lastChild;
                            if (lastChild != null) {
                                range.setEndAfter(lastChild);
                            }
                            window.getSelection()?.addRange(range);
                            document.execCommand(`copy`);
                            window.getSelection()?.removeAllRanges();
                            clipboardDiv.innerHTML = output;
                        },
                    },
                    h(CopyIcon)
                );
    },
});
