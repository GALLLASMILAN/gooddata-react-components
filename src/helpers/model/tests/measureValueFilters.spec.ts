// (C) 2019 GoodData Corporation
import { measureValueFilter } from "../measureValueFilters";
import * as Operators from "../../../constants/measureValueFilterOperators";

const comparisonValue = {
    value: 200,
};

const rangeValue = {
    from: 100,
    to: 300,
};

describe("measureValueFilters", () => {
    describe("getFilter", () => {
        const comparasionFilter = measureValueFilter.getFilter(
            "76-comparison",
            Operators.EQUAL_TO,
            comparisonValue,
        );

        const rangeFilter = measureValueFilter.getFilter("52-range", Operators.BETWEEN, rangeValue);

        describe("isComparisonCondition", () => {
            it("should return false id empty condition is passed", () => {
                const result = measureValueFilter.isComparisonCondition(null);
                expect(result).toBeFalsy();
            });
            it("should reruen false if object doesn't have comparison property", () => {
                const result = measureValueFilter.isComparisonCondition(
                    rangeFilter.measureValueFilter.condition,
                );
                expect(result).toBeFalsy();
            });
            it("should reruen true if object has comparison property", () => {
                const result = measureValueFilter.isComparisonCondition(
                    comparasionFilter.measureValueFilter.condition,
                );
                expect(result).toBeTruthy();
            });
        });
        describe("isRangeCondition", () => {
            it("should return false id empty condition is passed", () => {
                const result = measureValueFilter.isRangeCondition(null);
                expect(result).toBeFalsy();
            });
            it("should reruen false if object doesn't have range property", () => {
                const result = measureValueFilter.isRangeCondition(
                    comparasionFilter.measureValueFilter.condition,
                );
                expect(result).toBeFalsy();
            });
            it("should reruen true if object has range property", () => {
                const result = measureValueFilter.isRangeCondition(rangeFilter.measureValueFilter.condition);
                expect(result).toBeTruthy();
            });
        });

        describe("isMeasureValueComparisonFilter", () => {
            it("should return true if the Comparison filter is passed", () => {
                const isComparison = measureValueFilter.isMeasureValueComparisonFilter(comparasionFilter);
                expect(isComparison).toBeTruthy();
            });
            it("should return true if another filter is passed", () => {
                const isRange = measureValueFilter.isMeasureValueComparisonFilter(rangeFilter);
                expect(isRange).toBeFalsy();
            });
        });
        describe("isMeasureValueRangeFilter", () => {
            it("should return true if the Range filter is passed", () => {
                const isRange = measureValueFilter.isMeasureValueRangeFilter(rangeFilter);
                expect(isRange).toBeTruthy();
            });
            it("should return false if the Comparison filter is passed", () => {
                const isRange = measureValueFilter.isMeasureValueRangeFilter(comparasionFilter);
                expect(isRange).toBeFalsy();
            });
        });

        describe("measureValueFilterOperator", () => {
            it("should return operator of the comparasion filter", () => {
                const operator = measureValueFilter.measureValueFilterOperator(comparasionFilter);
                expect(operator).toBe("EQUAL_TO");
            });
            it("should return operator of the range filter", () => {
                const operator = measureValueFilter.measureValueFilterOperator(rangeFilter);
                expect(operator).toBe("BETWEEN");
            });
            it("should return null if doesn't receive filter object", () => {
                const operator = measureValueFilter.measureValueFilterOperator(undefined);
                expect(operator).toBe(null);
            });
        });
        describe("measureValueFilterValue", () => {
            it("should return object with value key from comparasion filter", () => {
                const value = measureValueFilter.measureValueFilterValue(comparasionFilter);
                expect(value).toEqual({ value: 200 });
            });
            it("should return object with from and to keys from range filter", () => {
                const value = measureValueFilter.measureValueFilterValue(rangeFilter);
                expect(value).toEqual({ from: 100, to: 300 });
            });
            it("should return null if doesn't receive filter object", () => {
                const value = measureValueFilter.measureValueFilterValue(undefined);
                expect(value).toBe(null);
            });
        });
    });
});
