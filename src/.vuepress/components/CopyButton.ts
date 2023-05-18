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
        function mergeCss(html) {
            // return juice(html, {
            //     inlinePseudoElements: true,
            //     preserveImportant: true,
            // })
            //const css = document.styleSheets;
            let txt = '';
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

            return juice.inlineContent('<article class="markdown-body">' + html + '</article>', txt,
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
                            const clipboardDiv = document.getElementsByClassName('theme-hope-content')[0];
                            const output = clipboardDiv.innerHTML;
                            //document.getElementsByClassName('line-numbers-mode')[3].removeChild(document.getElementsByClassName('copy-code-button')[0])
                            //console.log(clipboardDiv.innerHTML);
                            clipboardDiv.innerHTML = mergeCss(clipboardDiv.innerHTML)
                            console.log(clipboardDiv.innerHTML);
                            clipboardDiv.focus();
                            window.getSelection().removeAllRanges();
                            let range = document.createRange();
                            range.setStartBefore(clipboardDiv.firstChild);
                            range.setEndAfter(clipboardDiv.lastChild);
                            window.getSelection().addRange(range);
                            document.execCommand(`copy`);
                            window.getSelection().removeAllRanges();
                            clipboardDiv.innerHTML = output;
                        },
                    },
                    h(CopyIcon)
                );
    },
});
