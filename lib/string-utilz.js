/**
 * Copyright 2017 MaddHacker
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

/*
 * MAKE STRINGS USEFUL => (optional) Prototypes for String so it's not as annoying...
 * 
 * To use, simply include:
 *      require('string-utilz');
 * in your main entry point (typically index.js)
 */

/* #fmt constants */
const __open = '%{';
const __close = '}';
const __esc = '%';

/**
 * Simple method to escape all special RegExp fxns
 * 
 * Special values:
 *  - [ ] / { } ( ) * + ? . \ ^ $ |
 * 
 * @param {string} tmpStr to escape
 * @returns {string} with all special values escaped
 * $& means the whole matched string
 */
const escapeRegEx = (tmpStr) => { return tmpStr.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"); } 

/**
 * Abstract away RegEx management...
 * 
 * @param {string} tmpStr to escape
 * @param {string} flags RegEx flags requested
 * @return {RegExp} escaped string RegExp with given flags 
 * 
 * @see #escapeRegEx(tmpStr)
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Advanced_searching_with_flags
 */
const generateRegEx = (tmpStr, flags) => { return new RegExp(escapeRegEx(tmpStr), flags || ''); }

/**
 * Generic replace to make code climate happier (and code more DRY)
 * 
 * @param {string} tmpStr string to do the 'replace old with new' on
 * @param {string} oldStr string to replace
 * @param {string} newStr string to replace with
 * @param {string} flags RegExp flags
 * @return {string}
 * 
 * @see #generateRegEx(tmpStr, flags)
 * @see #escapeRegEx(tmpStr)
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Advanced_searching_with_flags
 */
const replaceAllGeneric = (tmpStr, oldStr, newStr, flags) => { return tmpStr.replace(generateRegEx(oldStr, flags), newStr); }

/**
 * Combine 2 strings together 
 * with limited maximum 1 space between strings or words
 * 
 * @param {string} tmpStr1 string 1 to combine
 * @param {string} tmpStr2 string 2 to combine
 * @returns {string} combined string
 * 
 * @usage 'Hello '.combineStr('Monday'); => 'Hello Monday'
 * @usage 'Hello  ‘。combineStr('Mondau); => 'Hello Monday'
 * @usage 'String1 '.combineStr('String2') => 'String1 String2'
 * @usage 'I want a '.scombineStr('hotdog') => 'I want a hotdog'
 * 
 * @see https://www.w3schools.com/jsref/jsref_concat_string.asp
 */
const combineStr = (tmpStr1, tmpStr2) => { //return tmpStr1.concat(tmpStr2); }
    var tmp1 = tmpStr1.replace(/\s+/g, ' ');
    var tmp2 = tmpStr2.replace(/\s+/g, ' ');
    var newStr = tmp1.concat(tmp2);
    var wantedStr = newStr.replace(/\s+/g, ' ');
    return wantedStr; 
};

/**
 * |||Need to be simplified
 * Translate numbers into strings
 * 
 * @param {number} num need to be translated
 * @returns {string} numStr tmpStr string num translate to
 * 
 */
const numToStr = (num) => {

    var th = ['','thousand','million'];//, 'billion','trillion', 'quadrillion', 'quintillion'];
    var dg = ['zero','one','two','three','four', 'five','six','seven','eight','nine'];
    var tn = ['ten','eleven','twelve','thirteen', 'fourteen','fifteen','sixteen', 'seventeen','eighteen','nineteen'];
    var tw = ['twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];

    var numStr = '';
    num = num.toString().replace(/[\, ]/g,'');
    var singleNum = num.split('');
    var len = num.length;
    if (num.length > 9)
        return 'Error: Exceede length limit';
    if (num < 1000) {
        numStr =  dg[singleNum[0]] + ' hundred ';
        if (singleNum[1] == '1')
            numStr = numStr + tn[singleNum[2]];
        else if (singleNum[1] == '0')
            numStr = numStr + dg[singleNum[2]];
        else 
            numStr = numStr + tw[singleNum[1]-2] + ' ' + dg[singleNum[2]];
    }
    else if (num % 1000 == 0) {
        if ((len-1) % 3 == 0)
            numStr = dg[singleNum[0]] + ' ' + th[(len-1)/3];
        else if ((len-2) % 3 == 0) 
            numStr = tn[singleNum[1]] + ' ' + th[(len-2)/3];
        else if (len % 3 == 0) 
            numStr = dg[singleNum[0]] + ' hundrend ' + tn[singleNum[1]] + ' ' + dg[singleNum[2]] + ' ' + th[(len-3)/3];
    }
    else{
        var subStr2 = '';
        var subStr1 = '';
        var subStr3 = '';
        if (singleNum[len-3] != '0')
            subStr3 = dg[singleNum[len-3]] + ' hundred ';
        if (singleNum[len-2] == '1')
            subStr3 = subStr3 + tn[singleNum[len-1]];
        else if (singleNum[len-2] == '0')
            subStr3 = subStr3 + dg[singleNum[len-1]];
        else 
            subStr3 = subStr3 + tw[singleNum[len-2]-2] + ' ' + dg[singleNum[len-1]];
        if (len > 4){
            if (len == 5){
                if (singleNum[0] == '1')
                    subStr2 = tn[singleNum[1]] + ' ' + th[1] + ' ';
                else
                    subStr2 = tw[singleNum[0]] + ' ' + dg[singleNum[1]] + ' ' + th[1]+ ' ';
            }
            else if (len == 6){
                if (singleNum[0] != '0')
                    subStr2 = dg[singleNum[0]] + ' hundred '; 
                if (singleNum[1] == '1')
                    subStr2 = subStr2 + tn[singleNum[2]] + ' ' + th[1] + ' ';
                else if (singleNum[1] == '0')
                    subStr2 = subStr2 + dg[singleNum[2]] + th[1] + ' ';
                else
                    subStr2 = subStr2 + tw[singleNum[1]-2] + ' ' + dg[singleNum[2]] + ' ' + th[1]+ ' ';
            }
            if (len > 6){
                if (len = 7)
                    subStr1 = dg[singleNum[0]] + ' ' + th[1] + ' '; 
                else if (len = 8){
                    if (singleNum[0] == '1')
                        subStr1 = tn[singleNum[1]] + ' ' + th[2] + ' ';
                    else
                        subStr1 = tw[singleNum[0]] + ' ' + dg[singleNum[1]] + ' ' + th[2]+ ' ';
                }
                else if (len = 9){
                    if (singleNum[0] != '0')
                        subStr1 = dg[singleNum[0]] + ' hundred '; 
                    if (singleNum[1] == '1')
                        subStr1 = subStr1 +  tn[singleNum[2]] + ' ' + th[2] + ' ';
                    else if (singleNum[1] == '0')
                        subStr1 = subStr1 +  dg[singleNum[2]] + th[2] + ' ';
                    else
                        subStr1 = subStr1 +  tw[singleNum[1]-2] + ' ' + dg[singleNum[2]] + ' ' + th[2]+ ' ';
                }
            }
        }  
        numStr = subStr1 + subStr2 + subStr3;
    }
    return numStr;
};

// /**
//  * Translate words into numbers
//  * 
//  * @param {string} tmpStr string to translate
//  * @returns {number} number after translation
//  * 
//  */
// const StrToNum = (tmpStr, ExpNum) => { 
//     var numList = {
//         'zero': 0,
//         'one': 1,
//         'two': 2,
//         'three': 3,
//         'four': 4,
//         'five': 5,
//         'six': 6,
//         'seven': 7,
//         'eight': 8,
//         'nine': 9,
//         'ten': 10,
//         'eleven': 11,
//         'twelve': 12,
//         'thirteen': 13,
//         'fourteen': 14,
//         'fifteen': 15,
//         'sixteen': 16,
//         'seventeen': 17,
//         'eighteen': 18,
//         'nineteen': 19,
//         'twenty': 20,
//         'thirty': 30,
//         'forty': 40,
//         'fifty': 50,
//         'sixty': 60,
//         'seventy': 70,
//         'eighty': 80,
//         'ninety': 90
//     };
    
//     var Magnitude = {
//         'thousand':     1000,
//         'million':      1000000,
//         'billion':      1000000000,
//         'trillion':     1000000000000,
//         'quadrillion':  1000000000000000,
//         'quintillion':  1000000000000000000,
//         'sextillion':   1000000000000000000000,
//         'septillion':   1000000000000000000000000,
//         'octillion':    1000000000000000000000000000,
//         'nonillion':    1000000000000000000000000000000,
//         'decillion':    1000000000000000000000000000000000,
//     };

//     var numberRes = 0;
//     var numArr = tmpStr.toString().split(/[\s-]+/);
//     var num = numList[numArr[0]];
//     if (num == Null)
//         alert("Unqualified number: " + numArr[0]);  
//     else 
//         numberRes += num;
//         if (numArr[1] == 'hundred')
//             numberRes *= 100;
//             if (numArr[2] != Null)
//                 numberRes *= Magnitude[numArr[2]];
//         else 
//             numberRes *= Magnitude[numArr[1]];

//     return numberRes;
// }


/**
 * starts with functionality
 * 
 * @param {string} tmpStr string to check
 * @param {string} matchStr string to match against
 * @returns {boolean} <b>true</b> if this ends with string, <b>false</b> otherwise
 * 
 * @usage 'bob'.startsWith('b'); => true
 * @usage 'A long string'.startsWith('A lon') => true
 * @usage 'A long string'.startsWith('A lone') => false
 */
const startsWith = (tmpStr, matchStr) => { return tmpStr.slice(0, matchStr.length) == matchStr; }

/**
 * ends with functionality
 * 
 * @param {string} tmpStr string to check
 * @param {string} matchStr string to match against
 * @returns {boolean} <b>true</b> if this ends with string, <b>false</b> otherwise
 * 
 * @usage 'bob'.endsWith('b'); => true
 * @usage 'A long string'.endsWith('string') => true
 * @usage 'A long string'.endsWith('a string') => false
 */
const endsWith = (tmpStr, matchStr) => { return tmpStr.slice(-matchStr.length) == matchStr; }

/**
 * Simple true/false to tell if the given string matches (ignoring case)
 * some subset of <b>this</b> string
 * 
 * @param {string} tmpStr string to check
 * @param {string} matchStr string to match against (ignoring case)
 * @returns {boolean} <b>true</b> if the string is contained (without matching case), <b>false</b> otherwise
 * 
 * @usage 'my string'.containsIgnoreCase('str') => true
 * @usage 'my long string'.containsIgnoreCase('long') => true
 * @usage 'my long string'.containsIgnoreCase('LONG') => true
 * @usage 'my super long string'.containsIgnoreCase('rings') => false
 */
const containsIgnoreCase = (tmpStr, matchStr) => { return tmpStr.search(generateRegEx(matchStr, 'i')) > -1; }

/**
 * Replace all functionality
 * 
 * @param {string} tmpStr string to do the 'replace old with new' on
 * @param {string} oldStr string to replace
 * @param {string} newStr string to replace with
 * @returns {string} with values replaced
 * 
 * @usage 'bob'.replaceAll('b','m'); => 'mom'
 * @usage 'My very long string'.replaceAll(' ','_'); => 'My_very_long_string'
 */
const replaceAll = (tmpStr, oldStr, newStr) => { return replaceAllGeneric(tmpStr, oldStr, newStr, 'g'); }

/**
 * Replace all functionality that ignores case
 * 
 * @param {string} tmpStr string to do the 'replace old with new' on
 * @param {string} oldStr string to replace
 * @param {string} newStr string to replace with
 * @returns {string} with values replaced
 * 
 * @usage 'Bob'.replaceAll('b','m'); => 'mom'
 * @usage 'My very long string'.replaceAll(' ','_'); => 'My_very_long_string'
 */
const replaceAllIgnoreCase = (tmpStr, oldStr, newStr) => { return replaceAllGeneric(tmpStr, oldStr, newStr, 'gi'); }

/**
 * Multiplication for a given string.
 * 
 * @param {string} string to multiply
 * @param {number} number of times to multiply string
 * @return {string} that is multiplied the given number of times.  Multiplying by 0 will return {null}.  Multiplying by a negative number or 1 will return the given string only
 * 
 * @usage '*'.times(2); => '**'
 * @usage '*'.times(0); => `null`
 */
const times = (tmpStr, num) => {
    var tmpRtn = tmpStr;
    if (num == 0) {
        tmpRtn = null;
    } else if (num > 1) {
        for (var i = 1; i < num; i++) {
            tmpRtn += tmpStr;
        }
    }
    return tmpRtn;
};

/**
 * Padding for a string, either left (negative) or right (positive)
 * 
 * @param {string} string to pad
 * @param {number} number of times to repeat given padding character(s)
 * @param {string} string to use as a padding character(s).  Defaults to ' ' (empty string) when not provided
 * @return {string} with left padding (if given size is negative) or right padding (if given size is positive).  Will return the string without any padding when size = 0
 * 
 * @usage '*'.pad(1,'-'); => '*-'
 * @usage '*'.pad(-1,'-'); => '-*'
 */
const pad = (tmpStr, size, char) => {
    if (size == 0)
        return tmpStr;
    char = char || ' ';
    var padding = times(char, Math.abs(size));
    return ((size > 0) ? (tmpStr + padding) : (padding + tmpStr));
};

/**
 * Chops a string => used to "trim" characters from the end (positive number) or beginning (negative number) of a given string
 * 
 * @param {string} string to chop
 * @param {number} number of characters to remove from the beginning (<0) or end (>0)
 * @return {string} chopped string, or `null` if `size` > `tmpStr.length`
 * 
 * @usage 'testing'.chop(3); => 'test'
 * @usage 'testing'.chop(-4); => 'ing'
 */
const chop = (tmpStr, size) => {
    var absSize = Math.abs(size);
    var rtn = null;
    if (tmpStr.length - absSize > 0) {
        var start = ((size < 0) ? absSize : 0);
        var end = ((size > 0) ? (tmpStr.length - absSize) : tmpStr.length);
        rtn = tmpStr.substring(start, end);
    }
    return rtn;
};

/**
 * Creates a fixed sized string by chopping or padding it as needed.
 * 
 * @param {string} string to fix size of
 * @param {number} number of characters the string should have.  Negative notes any chopping/padding starts left, positive starts all chopping/padding from the right
 * @param {string} char 
 * @return {string} chopped or padded string, or `null` if `size` = 0
 * 
 * @see #chop(tmpStr, size)
 * @see #pad(tmpStr, size, char)
 */
const fixSize = (tmpStr, size, char) => {
    var rtn = tmpStr;
    if (size == 0) {
        rtn = null;
    } else {
        var diff = tmpStr.length - Math.abs(size);
        var sign = (size < 0) ? -1 : 1;
        if (diff > 0) {
            rtn = chop(tmpStr, diff * sign);
        } else if (diff < 0) {
            rtn = pad(tmpStr, Math.abs(diff) * sign, char)
        }
    }
    return rtn;
};

/**
 * Format functionality for String class
 * 
 * @param {string} first parameter is the format string
 * @param {string...} string(s) to replace
 * @returns {string} with values replaced
 * 
 * @usage String.fmt('%{s}','bob'); => 'bob'
 * @usage String.fmt('My %{s} long %{s}','very', 'string'); => 'My very long string'
 * @usage String.fmt('%{0} says %{1}, thanks %{0}!','Bob', 'Hi'); => 'Bob says Hi, thanks Bob!'
 */
const fmt = function () {
    var args = Array.from(arguments);
    var tmpStr = args.shift(),
        argIndex = 0;
    // handle simple indicies
    tmpStr = tmpStr.replace(/%\{(\d+)\}/g, function (match, group1) {
        if (/\d/g > args.length) {
            return 'undefined'
        }
        return args[group1];
    });
    // handle simple string replacements
    tmpStr = tmpStr.replace(/%\{s\}/g, function (match, offset, str) {
        if (str.charAt(offset - 1) != __esc) {
            return args[argIndex++];
        }
        return match;
    });
    return tmpStr;
};

/**
 * Adds the following to the `String.prototype` if it's not already a function:
 *  - combineStr
 *  - NumToStr
 *  - startsWith
 *  - endsWith
 *  - containsIgnoreCase
 *  - replaceAll
 *  - replaceAllIgnoreCase
 *  - escapeRegEx
 *  - times
 *  - pad
 *  - chop
 *  - fixSize
 *  - fmt
 * 
 * Also sets `String.fmt` = fmt
 * 
 * This is NON-DESTRUCTIVE! If there is already a function defined, no new function will be set.
 */
const addPrototypes = () => {
    if (typeof String.prototype.numToStr != 'function')
        String.prototype.numToStr = function() {return numToStr.call(null, this); }
    if (typeof String.prototype.combineStr != 'function')
        String.prototype.combineStr = function(tmpStr2) {return combineStr.call(null, this, tmpStr2); }

    if (typeof String.prototype.startsWith != 'function')
        String.prototype.startsWith = function (matchStr) { return startsWith.call(null, this, matchStr); }

    if (typeof String.prototype.endsWith != 'function')
        String.prototype.endsWith = function (matchStr) { return endsWith.call(null, this, matchStr); }

    if (typeof String.prototype.containsIgnoreCase != 'function')
        String.prototype.containsIgnoreCase = function (matchStr) { return containsIgnoreCase.call(null, this, matchStr); }

    if (typeof String.prototype.replaceAll != 'function')
        String.prototype.replaceAll = function (oldStr, newStr) { return replaceAll.call(null, this, oldStr, newStr); }

    if (typeof String.prototype.replaceAllIgnoreCase != 'function')
        String.prototype.replaceAllIgnoreCase = function (oldStr, newStr) { return replaceAllIgnoreCase.call(null, this, oldStr, newStr); }

    if (typeof String.prototype.escapeRegEx != 'function')
        String.prototype.escapeRegEx = function () { return escapeRegEx.call(null, this); }

    if (typeof String.prototype.times != 'function')
        String.prototype.times = function (size) { return times.call(null, this, size); }

    if (typeof String.prototype.pad != 'function')
        String.prototype.pad = function (size, char) { return pad.call(null, this, size, char); }

    if (typeof String.prototype.chop != 'function')
        String.prototype.chop = function (size) { return chop.call(null, this, size); }

    if (typeof String.prototype.fixSize != 'function')
        String.prototype.fixSize = function (size, char) { return fixSize.call(null, this, size, char); }

    if (typeof String.prototype.fmt != 'function')
        String.prototype.fmt = function () { return fmt.apply(null, [this].concat(Array.from(arguments))); }

    if (typeof String.fmt != 'function')
        String.fmt = fmt;

}

module.exports = {
    combineStr: combineStr,
    numToStr: numToStr,
    startsWith: startsWith,
    endsWith: endsWith,
    containsIgnoreCase: containsIgnoreCase,
    replaceAll: replaceAll,
    replaceAllIgnoreCase: replaceAllIgnoreCase,
    escapeRegEx: escapeRegEx,
    times: times,
    pad: pad,
    chop: chop,
    fixSize: fixSize,
    fmt: fmt,
    addStringPrototypes: addPrototypes
}
