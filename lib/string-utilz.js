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

/*
 * MAKE STRINGS USEFUL => Prototypes for String so it's not as annoying...
 * 
 * To use, simply include:
 *      require('stringz');
 * in your main entry point (typically index.js)
 */

'use strict';

/**
 * Abstract away RegEx management...
 */
function generateRegEx(tmpStr, flags) {
    return new RegExp(tmpStr.escapeRegEx(), flags || '');
}

if (typeof String.prototype.startsWith != 'function') {
    /**
     * starts with functionality
     * 
     * @param {string}
     *            string to match against
     * @returns {boolean} <b>true</b> if this ends with string, <b>false</b>
     *          otherwise
     * 
     * @usage 'bob'.startsWith('b'); => true
     * @usage 'A long string'.startsWith('A lon') => true
     * @usage 'A long string'.startsWith('A lone') => false
     */
    String.prototype.startsWith = function (str) {
        return this.slice(0, str.length) == str;
    };
}

if (typeof String.prototype.endsWith != 'function') {
    /**
     * starts with functionality
     * 
     * @param {string}
     *            string to match against
     * @returns {boolean} <b>true</b> if this starts with string, <b>false</b>
     *          otherwise
     * 
     * @usage 'bob'.endsWith('b'); => true
     * @usage 'A long string'.endsWith('string') => true
     * @usage 'A long string'.endsWith('a string') => false
     */
    String.prototype.endsWith = function (str) {
        return this.slice(-str.length) == str;
    };
}

if (typeof String.prototype.containsIgnoreCase != 'function') {
    /**
     * Simple true/false to tell if the given string matches (ignoring case)
     * some subset of <b>this</b> string
     * 
     * @param {string}
     *            to match against (ignoring case)
     * @returns {boolean} <b>true</b> if the string is contained (without
     *          matching case), <b>false</b> otherwise
     * 
     * @usage 'my string'.containsIgnoreCase('str') => true
     * @usage 'my long string'.containsIgnoreCase('long') => true
     * @usage 'my long string'.containsIgnoreCase('LONG') => true
     * @usage 'my super long string'.containsIgnoreCase('rings') => false
     */
    String.prototype.containsIgnoreCase = function (str) {
        return this.search(generateRegEx(str, 'i')) > -1;
    };
}

/**
 * Generic replace to make code climate happier (and code more DRY)
 */
function replaceAllGeneric(tmpStr, oldStr, newStr, flags) {
    return tmpStr.replace(generateRegEx(oldStr, flags), newStr);
}

if (typeof String.prototype.replaceAll != 'function') {
    /**
     * Replace all functionality
     * 
     * @param {string}
     *            string to replace
     * @param {string}
     *            string to replace with
     * @returns {string} with values replaced
     * 
     * @usage 'bob'.replaceAll('b','m'); => 'mom'
     * @usage 'My very long string'.replaceAll(' ','_'); =>
     *        'My_very_long_string'
     */
    String.prototype.replaceAll = function (oldStr, newStr) {
        return replaceAllGeneric(this, oldStr, newStr, 'g');
    };
}

if (typeof String.prototype.replaceAllIgnoreCase != 'function') {
    /**
     * Replace all functionality that ignores case
     * 
     * @param {string}
     *            string to replace
     * @param {string}
     *            string to replace with
     * @returns {string} with values replaced
     * 
     * @usage 'Bob'.replaceAll('b','m'); => 'mom'
     * @usage 'My very long string'.replaceAll(' ','_'); =>
     *        'My_very_long_string'
     */
    String.prototype.replaceAllIgnoreCase = function (oldStr, newStr) {
        return replaceAllGeneric(this, oldStr, newStr, 'gi');
    };
}

if (typeof String.prototype.escapeRegEx != 'function') {
    /**
     * Simple method to escape all special RegExp fxns
     * 
     * Special values:
     *  - [ ] / { } ( ) * + ? . \ ^ $ |
     * 
     * @returns {string} with all special values escaped
     */
    String.prototype.escapeRegEx = function () {
        return this.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    };
}

if (typeof String.prototype.fmt != 'function') {
    /**
     * Format functionality for a string object
     * 
     * @param {string...}
     *            string(s) to replace
     * @returns {string} with values replaced
     * 
     * @usage '%{s}'.fmt('bob'); => 'bob'
     * @usage 'My %{s} long %{s}'.fmt('very', 'string'); =>
     *        'My very long string'
     * @usage '%{0} says %{1}, thanks %{0}!'.fmt('Bob', 'Hi'); 
     *        => 'Bob says Hi, thanks Bob!'
     * 
     * @see String.fmt()
     */
    String.prototype.fmt = function () {
        return String.fmt.apply(null, [this].concat(Array.from(arguments)));
    };
}

if (typeof String.fmt != 'function') {
    /**
     * Format functionality for String class
     * 
     * @param {string} first parameter is the format string
     * @param {string...}
     *            string(s) to replace
     * @returns {string} with values replaced
     * 
     * @usage String.fmt('%{s}','bob'); => 'bob'
     * @usage String.fmt('My %{s} long %{s}','very', 'string'); =>
     *        'My very long string'
     * @usage String.fmt('%{0} says %{1}, thanks %{0}!','Bob', 'Hi'); 
     *        => 'Bob says Hi, thanks Bob!'
     * 
     * @see String.prototype.fmt()
     */
    String.fmt = function () {
        const __open = '%{';
        const __close = '}';
        const __esc = '%';

        var args = Array.from(arguments);
        var tmpStr = args.shift(),
            argIndex = 0;
        // handle simple indicies
        tmpStr = tmpStr.replace(/%\{(\d+)\}/g, function (match, group1) {
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
}
