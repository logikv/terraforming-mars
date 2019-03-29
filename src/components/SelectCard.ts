
import Vue, { VNode } from "vue";

interface SelectCardModel {
    cards: {[x: string]: number};
}

let unique: number = 0;

export const SelectCard = Vue.component("select-card", {
    props: ["playerinput", "onsave"],
    data: function () {
        return {
            cards: {}
        } as SelectCardModel;
    },
    render: function (createElement) {
        unique++;
        const children: Array<VNode> = [];
        children.push(createElement("div", this.playerinput.title + " - " + this.playerinput.message));
        let inputType: string = "checkbox";
        if (this.playerinput.maxCardsToSelect === 1 && this.playerinput.minCardsToSelect === 1) {
            inputType = "radio";
        }
        this.playerinput.cards.forEach((card: any) => {
            children.push(
                createElement("label", { style: { display: "block", fontSize: "12px" }}, [
                    createElement("input", { domProps: { name: "selectCard" + unique, className: "nes-" + inputType, type: inputType, value: card.name }, on: { change: (event: any) => {
                        if (event.target.checked) {
                            this.cards[event.target.value] = 1;
                        } else {
                            delete this.cards[event.target.value];
                        }
                    }}}),
                    createElement("card", { attrs: { card: card.name }})
                ])
            )
        });
        children.push(
            createElement("button", { domProps: { className: "nes-btn" }, on: { click: () => {
                this.onsave([Object.keys(this.cards)]);
            } } }, "Save")
        );
        return createElement("div", children);
    }
});


