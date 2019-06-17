// (C) 2007-2019 GoodData Corporation
import { ITotalWithData } from "../../../../../interfaces/Totals";
import { getFooterHeight, getHeaderOffset } from "../layoutUtils";
describe("Table utils - Utils", () => {
    describe("getFooterHeight", () => {
        const twoTotals: ITotalWithData[] = [
            { type: "sum", outputMeasureIndexes: [], values: [] },
            { type: "avg", outputMeasureIndexes: [], values: [] },
        ];

        describe("edit allowed and totals visible", () => {
            it("should return sum of aggregation rows and height of the row for adding aggregations", () => {
                const editAllowed: boolean = true;
                const totalsAreVisible: boolean = true;
                expect(getFooterHeight(twoTotals, editAllowed, totalsAreVisible)).toEqual(2 * 30 + 50);
            });
        });

        describe("edit not allowed and totals visible", () => {
            it("should return sum of aggregation rows", () => {
                const editAllowed: boolean = false;
                const totalsAreVisible: boolean = true;
                expect(getFooterHeight(twoTotals, editAllowed, totalsAreVisible)).toEqual(2 * 30);
            });
        });

        describe("edit not allowed and totals not visible", () => {
            it("should return sum of aggregation rows", () => {
                const editAllowed: boolean = false;
                const totalsAreVisible: boolean = false;
                expect(getFooterHeight(twoTotals, editAllowed, totalsAreVisible)).toEqual(0);
            });
        });

        describe("edit allowed and totals visible, empty totals", () => {
            it("should return height of the row for adding aggregations", () => {
                const editAllowed: boolean = true;
                const totalsAreVisible: boolean = true;
                const emptyTotals: ITotalWithData[] = [];
                expect(getFooterHeight(emptyTotals, editAllowed, totalsAreVisible)).toEqual(50);
            });
        });
    });

    describe("getHeaderOffset", () => {
        it("should return proper header offset", () => {
            const hasHiddenRows: boolean = true;
            expect(getHeaderOffset(hasHiddenRows)).toEqual(71);
        });

        it("should return zero header offset when table has no hidden rows", () => {
            const hasHiddenRows: boolean = false;
            expect(getHeaderOffset(hasHiddenRows)).toEqual(56);
        });
    });
});
