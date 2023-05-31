import { defineStore } from "pinia";
import { useLocalStorage, useSessionStorage, useStorage } from "@vueuse/core";
export const useOccurrenceStore = defineStore("occurrence", {
    state: () => ({
        occurrences: useStorage("occurrences", []),
        types: useStorage("types", []),
    }),
    getters: {
        getOccurrences() {
            return this.occurrences;
        },
        getTypes() {
            return this.types;
        },
    },
    actions: {
        addOccurrence(e) {
            this.occurrences.push(e);
        },
        addType(e) {
            this.types.push(e);
        },
    },
});
