var express = require('express');
var program = require('commander');
var moment = require('moment');
var fns = require('date-fns');

// Constants
const DATE_RANGE_START = new Date(2016,0,1);
const DATE_RANGE_END = new Date(2017,8,11);
const SMALL_COLLECTION_SIZE = 10000;
const MEDIUM_COLLECTION_SIZE = 100000;
const LARGE_COLLECTION_SIZE = 1000000;

const TESTS_TYPES = {
    SMALL: 0,
    MEDIUM: 1,
    LARGE: 2
};
const TEST_LIBS = {
    MOMENT: 'Moment',
    NATIVE: 'Native',
    FNS: 'date-fns'
};

program
        .version('0.0.1')
        .option('-m, -moment', 'Run test using Moment')
        .option('-n, -native', 'Run test using Native Dates')
        .option('-f, -fns', 'Run test using date-fns')
        .parse(process.argv)


/* ========================================= SORT TESTS ========================================= */

var momentSortPerformanceTest = function (randDates, testType) {
    var testTypeName = nameForTestType(testType);
    
    var startTime = new Date().getTime();
    randDates.sort(function (a, b) {
        return a - b;
    })
    var timeTaken = new Date().getTime() - startTime;

    console.log(`Finished ${testTypeName} Sort Performance Test against ${TEST_LIBS.MOMENT} - Took ${timeTaken}`);
}

var nativeSortPerformanceTest = function (randDates, testType) {
    var testTypeName = nameForTestType(testType);

    var startTime = new Date().getTime();
    randDates.sort(function (a, b) {
        return a - b;
    });
    var timeTaken = new Date().getTime() - startTime;

    console.log(`Finished ${testTypeName} Sort Performance Test against ${TEST_LIBS.NATIVE} - Took ${timeTaken}`);
}

var fnsSortPerformanceTest = function (randDates, testType) {
    var testTypeName = nameForTestType(testType);

    var startTime = new Date().getTime();
    randDates.sort(fns.compareAsc); // Nicer Implementation than the others
    var timeTaken = new Date().getTime() - startTime;

    console.log(`Finished ${testTypeName} Sort Performance Test against ${TEST_LIBS.FNS} - Took ${timeTaken}`);
}


/* ========================================= FORMAT LONG TESTS ========================================= */

var momentFormatLongPerformanceTest = function (randDates, testType) {
    var testTypeName = nameForTestType(testType);
    
    var startTime = new Date().getTime();
    randDates.forEach(function(date) {
        date.format("dddd, MMMM Do YYYY, h:mm:ss a");
    });
    var timeTaken = new Date().getTime() - startTime;

    console.log(`Finished ${testTypeName} Format Long Performance Test against ${TEST_LIBS.MOMENT} - Took ${timeTaken}`);
}

var fnsFormatLongPerformanceTest = function (randDates, testType) {
    var testTypeName = nameForTestType(testType);

    var startTime = new Date().getTime();
    randDates.forEach(function(date) {
        fns.format(date, "dddd, MMMM Do YYYY, h:mm:ss a");
    });
    var timeTaken = new Date().getTime() - startTime;

    console.log(`Finished ${testTypeName} Format Long Performance Test against ${TEST_LIBS.FNS} - Took ${timeTaken}`);
}


/* ========================================= FORMAT SHORT TESTS ========================================= */

var momentFormatShortPerformanceTest = function (randDates, testType) {
    var testTypeName = nameForTestType(testType);
    
    var startTime = new Date().getTime();
    randDates.forEach(function(date) {
        date.format("DD/MM/YYYY");
    });
    var timeTaken = new Date().getTime() - startTime;

    console.log(`Finished ${testTypeName} Format Short Performance Test against ${TEST_LIBS.MOMENT} - Took ${timeTaken}`);
}

var fnsFormatShortPerformanceTest = function (randDates, testType) {
    var testTypeName = nameForTestType(testType);

    var startTime = new Date().getTime();
    randDates.forEach(function(date) {
        fns.format(date, "DD/MM/YYYY");
    });
    var timeTaken = new Date().getTime() - startTime;

    console.log(`Finished ${testTypeName} Format Short Performance Test against ${TEST_LIBS.FNS} - Took ${timeTaken}`);
}


/* ========================================= BEFORE AND AFTER TESTS ========================================= */

var beforeDate = new Date (2017, 2, 2);		
var beforeMoment = moment('2017-03-02');			
var afterDate = new Date (2016, 5, 19);		
var afterMoment = moment('2016-06-19');

var momentBeforeAfterPerformanceTest = function (randDates, testType) {
    var testTypeName = nameForTestType(testType);
    
    var startTime = new Date().getTime();
    randDates.forEach(function(date) {
        var isBefore = date.isBefore(beforeMoment);
        var isAfter = date.isAfter(afterMoment);
    });
    var timeTaken = new Date().getTime() - startTime;

    console.log(`Finished ${testTypeName} Before And After Performance Test against ${TEST_LIBS.MOMENT} - Took ${timeTaken}`);
}

var nativeBeforeAfterPerformanceTest = function (randDates, testType) {
    var testTypeName = nameForTestType(testType);

    var startTime = new Date().getTime();
    randDates.forEach(function(date) {
        var isBefore = (beforeDate - date) > 0;
        var isAfter = (date - afterDate) > 0;
    });
    var timeTaken = new Date().getTime() - startTime;

    console.log(`Finished ${testTypeName} Before And After Performance Test against ${TEST_LIBS.NATIVE} - Took ${timeTaken}`);
}

var fnsBeforeAfterPerformanceTest = function (randDates, testType) {
    var testTypeName = nameForTestType(testType);

    var startTime = new Date().getTime();
    randDates.forEach(function(date) {
        fns.isAfter(date, afterDate);
        fns.isBefore(date, beforeDate);
    });
    var timeTaken = new Date().getTime() - startTime;

    console.log(`Finished ${testTypeName} Before And After Performance Test against ${TEST_LIBS.FNS} - Took ${timeTaken}`);
}


/* ========================================= BETWEEN TESTS ========================================= */

var momentBetweenPerformanceTest = function (randDates, testType) {
    var testTypeName = nameForTestType(testType);
    
    var startTime = new Date().getTime();
    randDates.forEach(function(date) {
        date.isBetween(afterDate, beforeDate);
    });
    var timeTaken = new Date().getTime() - startTime;

    console.log(`Finished ${testTypeName} Between Performance Test against ${TEST_LIBS.MOMENT} - Took ${timeTaken}`);
}

var nativeBetweenPerformanceTest = function (randDates, testType) {
    var testTypeName = nameForTestType(testType);

    var startTime = new Date().getTime();
    randDates.forEach(function(date) {
        var isBefore = (beforeDate - date) > 0;
        var isAfter = (date - afterDate) > 0;
        var isBetween = isBefore && isAfter;
    });
    var timeTaken = new Date().getTime() - startTime;

    console.log(`Finished ${testTypeName} Between Performance Test against ${TEST_LIBS.NATIVE} - Took ${timeTaken}`);
}

var fnsBetweenPerformanceTest = function (randDates, testType) {
    var testTypeName = nameForTestType(testType);

    var startTime = new Date().getTime();
    randDates.forEach(function(date) {
        fns.isWithinRange(date, afterDate, beforeDate);
    });
    var timeTaken = new Date().getTime() - startTime;

    console.log(`Finished ${testTypeName} Between Performance Test against ${TEST_LIBS.FNS} - Took ${timeTaken}`);
}


/* ========================================= PURE ADD HOURS TESTS ========================================= */

var hoursToAdd = 448;

// Cloning version to avoid mutation
var momentAddHoursPerformanceTest = function (randDates, testType) {
    var testTypeName = nameForTestType(testType);
    
    var startTime = new Date().getTime();
    randDates.forEach(function(date) {
        var newMomment = date.clone().add(hoursToAdd, 'h');
    });
    var timeTaken = new Date().getTime() - startTime;

    console.log(`Finished ${testTypeName} Add Hours Performance Test against ${TEST_LIBS.MOMENT} - Took ${timeTaken}`);
}

var nativeAddHoursPerformanceTest = function (randDates, testType) {
    var testTypeName = nameForTestType(testType);

    var startTime = new Date().getTime();
    randDates.forEach(function(date) {
        var newDate = date.setTime(date.getTime() + (hoursToAdd*60*60*1000));
    });
    var timeTaken = new Date().getTime() - startTime;

    console.log(`Finished ${testTypeName} Add Hours Performance Test against ${TEST_LIBS.NATIVE} - Took ${timeTaken}`);
}

var fnsAddHoursPerformanceTest = function (randDates, testType) {
    var testTypeName = nameForTestType(testType);

    var startTime = new Date().getTime();
    randDates.forEach(function(date) {
        var newDate = fns.addHours(date, hoursToAdd);
    });
    var timeTaken = new Date().getTime() - startTime;

    console.log(`Finished ${testTypeName} Add Hours Performance Test against ${TEST_LIBS.FNS} - Took ${timeTaken}`);
}


/* ========================================= IMPURE ADD HOURS TESTS ========================================= */

// Cloning version to avoid mutation
var momentImpureAddHoursPerformanceTest = function (randDates, testType) {
    var testTypeName = nameForTestType(testType);
    
    var startTime = new Date().getTime();
    randDates.forEach(function(date) {
        var newMomment = date.add(hoursToAdd, 'h');
    });
    var timeTaken = new Date().getTime() - startTime;

    console.log(`Finished ${testTypeName} Add Hours Impure Performance Test against ${TEST_LIBS.MOMENT} - Took ${timeTaken}`);
}


/* ========================================= FROM NOW TESTS ========================================= */

var momentFromNowPerformanceTest = function (randDates, testType) {
    var testTypeName = nameForTestType(testType);
    
    var startTime = new Date().getTime();
    randDates.forEach(function(date) {
        var fromNow = date.fromNow();
    });
    var timeTaken = new Date().getTime() - startTime;

    console.log(`Finished ${testTypeName} From Now Performance Test against ${TEST_LIBS.MOMENT} - Took ${timeTaken}`);
}

var fnsFromNowPerformanceTest = function (randDates, testType) {
    var testTypeName = nameForTestType(testType);

    var startTime = new Date().getTime();
    randDates.forEach(function(date) {
        var newDate = fns.distanceInWordsToNow(date);
    });
    var timeTaken = new Date().getTime() - startTime;

    console.log(`Finished ${testTypeName} From Now Performance Test against ${TEST_LIBS.FNS} - Took ${timeTaken}`);
}


var fnsClosestToPerformanceTest = function (randDates, testType) {
    var testTypeName = nameForTestType(testType);

    var startTime = new Date().getTime();
    fns.closestTo(afterDate, randDates);
    var timeTaken = new Date().getTime() - startTime;

    console.log(`Finished ${testTypeName} Closest To Performance Test against ${TEST_LIBS.FNS} - Took ${timeTaken}`);
}


/* ========================================= TEST WRAPPERS ========================================= */

var momentTest = function (testType) {
    var randDates = randomDates(testType, true);

    momentSortPerformanceTest(randDates, testType);
    momentFormatLongPerformanceTest(randDates, testType);
    momentFormatShortPerformanceTest(randDates, testType);
    momentBeforeAfterPerformanceTest(randDates, testType);
    momentBetweenPerformanceTest(randDates, testType);
    momentAddHoursPerformanceTest(randDates, testType);
    momentImpureAddHoursPerformanceTest(randDates, testType);
    momentFromNowPerformanceTest(randDates, testType);
}

var nativeTest = function (testType) {
    var randDates = randomDates(testType);

    nativeSortPerformanceTest(randDates, testType);
    nativeBeforeAfterPerformanceTest(randDates, testType);
    nativeBetweenPerformanceTest(randDates, testType);
    nativeAddHoursPerformanceTest(randDates, testType);
}

var fnsTest = function (testType) {
    var randDates = randomDates(testType);

    fnsClosestToPerformanceTest(randDates, testType);
    fnsSortPerformanceTest(randDates, testType);
    fnsFormatLongPerformanceTest(randDates, testType);
    fnsFormatShortPerformanceTest(randDates, testType);
    fnsBeforeAfterPerformanceTest(randDates, testType);
    fnsBetweenPerformanceTest(randDates, testType);
    fnsAddHoursPerformanceTest(randDates, testType);
    fnsFromNowPerformanceTest(randDates, testType);

}


/* ========================================= HELPER FUNCTIONS ========================================= */

var collectionSizeForTestType = function (testType) {
    switch (testType) {
        case TESTS_TYPES.SMALL:
            return SMALL_COLLECTION_SIZE;
        case TESTS_TYPES.MEDIUM:
            return MEDIUM_COLLECTION_SIZE;
        case TESTS_TYPES.LARGE:
            return LARGE_COLLECTION_SIZE;
    }
}

var nameForTestType = function (testType) {
    switch (testType) {
        case TESTS_TYPES.SMALL:
            return 'Small';
        case TESTS_TYPES.MEDIUM:
            return 'Medium';
        case TESTS_TYPES.LARGE:
            return 'Large';
    }
}

var randomDate = function (rangeStart, rangeEnd) {
    return new Date (rangeStart.getTime() + Math.random() * (rangeEnd.getTime() - rangeStart.getTime()));
}
var randomMomentDate = function (rangeStart, rangeEnd) {
    return moment(rangeStart.getTime() + Math.random() * (rangeEnd.getTime() - rangeStart.getTime()));
}

var randomTimeStamps = function (collectionSize, rangeStart, rangeEnd) {
    var randTimeStamps = []
    for (var i = 0; i < collectionSize; i++) {
        randTimeStamps.push(rangeStart.getTime() + Math.random() * (rangeEnd.getTime() - rangeStart.getTime()));
    }

    return randTimeStamps;
}

var randomDates = function (testType, isMomentDate = false) {
    var collectionSize = collectionSizeForTestType(testType);
    var testTypeName = nameForTestType(testType);
    var timeStamps = randomTimeStamps(collectionSize, DATE_RANGE_START, DATE_RANGE_END);
    var dates = [];

    var startTime = new Date().getTime();
    timeStamps.forEach(function(ts) {
        dates.push(isMomentDate ? moment(ts) : new Date(ts));
    });
    var timeTaken = new Date().getTime() - startTime;
    console.log (`Finished Creating ${testTypeName} Set of ${isMomentDate ? 'Moment' : 'Native'} Dates - Took ${timeTaken}`)

    return dates;
}


/* ========================================= START FUNCTION ========================================= */

var dateTest = function (testLib) {
    switch(testLib) {
        case TEST_LIBS.MOMENT:
            momentTest(TESTS_TYPES.MEDIUM);
            break;
        case TEST_LIBS.Native:
            nativeTest(TESTS_TYPES.MEDIUM);
            break;
        case TEST_LIBS.FNS:
            fnsTest(TESTS_TYPES.MEDIUM);
            break;
    }
}

if (program.Moment) dateTest(TEST_LIBS.MOMENT);
if (program.Native) dateTest(TEST_LIBS.Native);
if (program.Fns) dateTest(TEST_LIBS.FNS);
 