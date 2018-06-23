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

const stringz = require('../../lib/string-utilz');
stringz.addStringPrototypes();

describe('String Utilz (Unit)', () => {

    describe('#replace() => built-in', () => {
        it('should exist', () => {
            expect(typeof String.prototype.replace).toBe('function');
        });
    });

    /**
    * check string#combineStr(tmpStr1, tmpStr2)
    */

   describe('#combineStr(tmpStr1, tmpStr)', () => {
        it('should return true when the string starts with the given value', () => {
            expect('Hello '.combineStr('Monday')).toBe('Hello Monday');
        });
        it('should be case sensitive', () => {
            expect('hello '.combineStr('Monday')).toBe('hello Monday');
        });
        it('should be able to handle spaces', () => {
            expect('Hello    '.combineStr('Monday')).toBe('Hello Monday');
        });
        it('should be able to handle spaces', () => {
            expect('Hello '.combineStr(' Monday')).toBe('Hello Monday');
        });
    });

    /**
     * Check string#startsWith(val);
     */
    describe('#startsWith(str)', () => {
        it('should return true when the string starts with the given value', () => {
            expect('Bob'.startsWith('B')).toBe(true);
        });
        it('should be case sensitive', () => {
            expect('Bob'.startsWith('b')).toBe(false);
        });
        it('should respect many characters', () => {
            expect('Franklin'.startsWith('Frank')).toBe(true);
        });
        it('should be able to handle spaces', () => {
            expect('The quick brown fox'.startsWith('The quick')).toBe(true);
        });
    });

    /**
     * check direct access to stringz#startsWith(tmpStr, matchStr)
     */
    describe('stringz#startsWith(tmpStr, matchStr)', () => {
        it('should return true when the string starts with the given value', () => {
            expect(stringz.startsWith('Bob', 'B')).toBe(true);
        });
    });

    /**
     * Check string#endsWith(val);
     */
    describe('#endsWith(str)', () => {
        it('should return true when the string ends with the given value', () => {
            expect('Bob'.endsWith('b')).toBe(true);
        });
        it('should be case sensitive', () => {
            expect('Bob'.endsWith('B')).toBe(false);
        });
        it('should respect many characters', () => {
            expect('Franklin'.endsWith('lin')).toBe(true);
        });
        it('should be able to handle spaces', () => {
            expect('The quick brown fox'.endsWith('brown fox')).toBe(true);
        });
    });

    /**
     * check direct access to stringz#endsWith(tmpStr, matchStr)
     */
    describe('stringz#endsWith(tmpStr, matchStr)', () => {
        it('should return true when the string ends with the given value', () => {
            expect(stringz.endsWith('Bob', 'b')).toBe(true);
        });
    });

    /**
     * Check string#containsIgnoreCase(val);
     */
    describe('#containsIgnoreCase(str)', () => {
        it('should return true when the string contains the given value', () => {
            expect('Bob'.containsIgnoreCase('b')).toBe(true);
        });
        it('should be case insensitive', () => {
            expect('BOB'.containsIgnoreCase('b')).toBe(true);
        });
        it('should have no false positives', () => {
            expect('The quick brown'.containsIgnoreCase('x')).toBe(false);
        });
        it('should respect many characters', () => {
            expect('Franklin'.containsIgnoreCase('ankl')).toBe(true);
        });
        it('should be able to handle spaces', () => {
            expect('The quick brown fox'.containsIgnoreCase('ck bro')).toBe(true);
        });
    });

    /**
     * check direct access to stringz#containsIgnoreCase(tmpStr, matchStr)
     */
    describe('stringz#containsIgnoreCase(tmpStr, matchStr)', () => {
        it('should return true when the string contains the given value', () => {
            expect(stringz.containsIgnoreCase('Bob', 'o')).toBe(true);
        });
    });

    /**
     * Check string#replaceAll(oldStr,newStr);
     */
    describe('#replaceAll(oldStr,newStr)', () => {
        it('should return the same string when the replace value does not match anything', () => {
            expect('The quick brown fox'.replaceAll('bob', 'frank')).toBe('The quick brown fox');
        });
        it('should replace one character', () => {
            expect('Bob'.replaceAll('o', 'i')).toBe('Bib');
        });
        it('should replace all instances of a character', () => {
            expect('Bobby'.replaceAll('b', 'd')).toBe('Boddy');
        });
        it('should be case sensitive', () => {
            expect('Box'.replaceAll('b', 'd')).toBe('Box');
        });
        it('should respect spaces', () => {
            expect('The quick brown fox'.replaceAll('\ ', '')).toBe('Thequickbrownfox');
        });
        it('should replace spaces', () => {
            expect('The quick brown fox'.replaceAll(' ', '_')).toBe('The_quick_brown_fox');
        });
        it('should be able to change the first character', () => {
            expect('mitten'.replaceAll('m', 'k')).toBe('kitten');
        });
        it('should respect words', () => {
            expect('baa baa black sheep'.replaceAll('baa', 'meow')).toBe('meow meow black sheep');
        });
    });

    /**
    * check direct access to stringz#replaceAll(tmpStr, oldStr, newStr)
    */
    describe('stringz#replaceAll(tmpStr, oldStr, newStr)', () => {
        it('should replace one character', () => {
            expect(stringz.replaceAll('Bob', 'o', 'i')).toBe('Bib');
        });
    });

    /**
     * Check string#replaceAllIgnoreCase(oldStr,newStr);
     */
    describe('#replaceAll(oldStr,newStr)', () => {
        it('should return the same string when the replace value does not match anything', () => {
            expect('The quick brown fox'.replaceAllIgnoreCase('bob', 'frank')).toBe('The quick brown fox');
        });
        it('should replace one character', () => {
            expect('Bob'.replaceAllIgnoreCase('o', 'i')).toBe('Bib');
        });
        it('should replace all instances of a character', () => {
            expect('Bobby'.replaceAllIgnoreCase('b', 'd')).toBe('doddy');
        });
        it('should be case sensitive', () => {
            expect('Box'.replaceAllIgnoreCase('b', 'd')).toBe('dox');
        });
        it('should respect spaces', () => {
            expect('The quick brown fox'.replaceAllIgnoreCase(' ', '')).toBe('Thequickbrownfox');
        });
        it('should replace spaces', () => {
            expect('The quick brown fox'.replaceAllIgnoreCase(' ', '_')).toBe('The_quick_brown_fox');
        });
        it('should be able to change the first character', () => {
            expect('mitten'.replaceAllIgnoreCase('m', 'k')).toBe('kitten');
        });
        it('should respect words', () => {
            expect('Baa baa black sheep'.replaceAllIgnoreCase('baa', 'meow')).toBe('meow meow black sheep');
        });
    });

    /**
    * check direct access to stringz#replaceAllIgnoreCase(tmpStr, oldStr, newStr)
    */
    describe('stringz#replaceAllIgnoreCase(tmpStr, oldStr, newStr)', () => {
        it('should replace all instances of a character, regardless of case', () => {
            expect(stringz.replaceAllIgnoreCase('Bob', 'b', 'm')).toBe('mom');
        });
    });

    /**
     * Check string#escapeRegEx()
     */
    describe('#escapeRegEx() using indicies', () => {
        it('should escape -', () => {
            expect('-'.escapeRegEx()).toBe('\\-');
        });
        it('should escape [', () => {
            expect('['.escapeRegEx()).toBe('\\[');
        });
        it('should escape ]', () => {
            expect(']'.escapeRegEx()).toBe('\\]');
        });
        it('should escape /', () => {
            expect('/'.escapeRegEx()).toBe('\\/');
        });
        it('should escape {', () => {
            expect('{'.escapeRegEx()).toBe('\\{');
        });
        it('should escape }', () => {
            expect('}'.escapeRegEx()).toBe('\\}');
        });
        it('should escape (', () => {
            expect('('.escapeRegEx()).toBe('\\(');
        });
        it('should escape )', () => {
            expect(')'.escapeRegEx()).toBe('\\)');
        });
        it('should escape *', () => {
            expect('*'.escapeRegEx()).toBe('\\*');
        });
        it('should escape +', () => {
            expect('+'.escapeRegEx()).toBe('\\+');
        });
        it('should escape ?', () => {
            expect('?'.escapeRegEx()).toBe('\\?');
        });
        it('should escape .', () => {
            expect('.'.escapeRegEx()).toBe('\\.');
        });
        it('should escape \\ ', () => {
            expect('\ '.escapeRegEx()).toBe(' ');
        });
        it('should escape ^', () => {
            expect('^'.escapeRegEx()).toBe('\\^');
        });
        it('should escape $', () => {
            expect('$'.escapeRegEx()).toBe('\\$');
        });
        it('should escape |', () => {
            expect('|'.escapeRegEx()).toBe('\\|');
        });
    });

    /**
    * check direct access to stringz#escapeRegEx(tmpStr)
    */
    describe('stringz#escapeRegEx(tmpStr)', () => {
        it('should escape -', () => {
            expect(stringz.escapeRegEx('-')).toBe('\\-');
        });
    });

    /**
    * check string#times(size)
    */
    describe('#times(size)', () => {
        it('should return the string when multiplied by 1', () => {
            expect('*'.times(1)).toBe('*');
        });
        it('should return double the string when multiplied by 2', () => {
            expect('*'.times(2)).toBe('**');
        });
        it('should return multiples of the string when multiplied', () => {
            expect('*'.times(10)).toBe('**********');
        });
        it('should return multiples of a complex string', () => {
            expect('quick brown'.times(2)).toBe('quick brownquick brown');
        });
        it('should return null when multipled by 0', () => {
            expect('*'.times(0)).toBe(null);
        });
        it('should return itself when multipled by a negative number', () => {
            expect('*'.times(-2)).toBe('*');
        });
    });

    /**
    * check direct access to stringz#times(tmpStr, size)
    */
    describe('stringz#times(tmpStr, size)', () => {
        it('should return the string when multiplied by 1', () => {
            expect(stringz.times('*', 1)).toBe('*');
        });
    });

    /**
    * check string#pad(size, char)
    */
    describe('#pad(size, char)', () => {
        it('should use a space when no char is provided', () => {
            expect('*'.pad(1)).toBe('* ');
        });
        it('should return the given string when size is 0', () => {
            expect('*'.pad(0)).toBe('*');
            expect('*'.pad(0, '-')).toBe('*');
        });
        it('should pad multiple times', () => {
            expect('*'.pad(5, '-')).toBe('*-----');
        });
        it('should pad to the left when negative', () => {
            expect('*'.pad(-5, '-')).toBe('-----*');
        });
        it('should handle multiple chars', () => {
            expect('*'.pad(-2, 'bob')).toBe('bobbob*');
            expect('*'.pad(2, 'bob')).toBe('*bobbob');
            expect('*'.pad(2, '$$')).toBe('*$$$$');
        });
    });

    /**
    * check direct access to stringz#pad(tmpStr, size, char)
    */
    describe('stringz#pad(tmpStr, size, char)', () => {
        it('should return the string when multiplied by 1', () => {
            expect(stringz.pad('*', 1)).toBe('* ');
        });
    });

    /**
    * check string#chop(size)
    */
    describe('#chop(size)', () => {
        it('should use a positive number to start at the end', () => {
            expect('testing'.chop(1)).toBe('testin');
        });
        it('should use a negative number to start at the beginning', () => {
            expect('testing'.chop(-1)).toBe('esting');
        });
        it('should remove the required characters', () => {
            expect('testing'.chop(3)).toBe('test');
            expect('testing'.chop(-4)).toBe('ing');
        });
        it('should return null when size >= tmpStr.length', () => {
            expect('*'.chop(1)).toBe(null);
            expect('***'.chop(3)).toBe(null);
            expect('***'.chop(5)).toBe(null);
        });
    });

    /**
    * check direct access to stringz#chop(tmpStr, size)
    */
    describe('stringz#chop(tmpStr, size)', () => {
        it('should be able to remove characters', () => {
            expect(stringz.chop('testing', 3)).toBe('test');
        });
    });

    /**
    * check string#fixSize(size, char)
    */
    describe('#fixSize(size, char)', () => {
        it('should return null when size = 0', () => {
            expect('testing'.fixSize(0)).toBe(null);
        });
        it('should use a space as a default char', () => {
            expect('testing'.fixSize(10)).toBe('testing   ');
        });
        it('should use a positive number to start at the end', () => {
            expect('testing'.fixSize(4)).toBe('test');
            expect('testing'.fixSize(10, '-')).toBe('testing---');
        });
        it('should use a negative number to start at the beginning', () => {
            expect('testing'.fixSize(-3)).toBe('ing');
            expect('testing'.fixSize(-10, '-')).toBe('---testing');
        });
        it('should be able to chop', () => {
            expect('testing'.fixSize(4)).toBe('test');
            expect('testing'.fixSize(-3)).toBe('ing');
        });
        it('should be able to pad', () => {
            expect('testing'.fixSize(10, '$')).toBe('testing$$$');
            expect('testing'.fixSize(-10, '$')).toBe('$$$testing');
        });
    });

    /**
    * check direct access to stringz#fixSize(tmpStr, size, char)
    */
    describe('stringz#fixSize(tmpStr, size, char)', () => {
        it('should return null when size = 0', () => {
            expect(stringz.fixSize('testing', 0)).toBe(null);
        });
    });

    /**
     * Check string#fmt(args...) with indicies;
     */
    describe('#fmt(args...) using indicies', () => {
        it('should return the same string when there are no fmt args', () => {
            expect('The quick brown fox'.fmt('bob', 'frank')).toBe('The quick brown fox');
        });
        it('should not replace open "{" at the beginning', () => {
            expect('The %{s %{s} %{2}'.fmt('quick', 'brown', 'fox')).toBe('The %{s quick fox');
        });
        it('should not replace open "{" all over the place', () => {
            expect('The %{s %{0} %{1 %{s} %{2} %{1'.fmt('quick', 'brown', 'fox')).toBe('The %{s quick %{1 quick fox %{1');
        });
        it('should support indicies in the "{}"', () => {
            expect('The %{0} %{1} %{2}'.fmt('quick', 'brown', 'fox')).toBe('The quick brown fox');
        });
        it('should support indicies out of order in the "{}"', () => {
            expect('The %{2} %{0} %{1}'.fmt('quick', 'brown', 'fox')).toBe('The fox quick brown');
        });
        it('should support indicies and the "s" mixed in the "{}"', () => {
            expect('The %{0} %{s} %{2}'.fmt('quick', 'brown', 'fox')).toBe('The quick quick fox');
        });
        it('should support indicies out of order and the "s" mixed in the "{}"', () => {
            expect('The %{2} %{s} %{0}'.fmt('quick', 'brown', 'fox')).toBe('The fox quick quick');
        });
        it('should support repeated indicies', () => {
            expect('The %{0} %{0} %{0}'.fmt('quick', 'brown', 'fox')).toBe('The quick quick quick');
        });
        it('should support repeated "s" in the “{}" in order', () => {
            expect('The %{s} %{s} %{s}'.fmt('quick', 'brown', 'fox')).toBe('The quick brown fox');
        });
        it('should support indicies in the "{}"', () => {
            expect('The %{0} %{1} %{3}'.fmt('quick', 'brown', 'fox')).toBe('The quick brown undefined');
        });
    });

    /**
     * Check string#fmt(args...) with simple string replacement;
     */
    describe('#fmt(args...) with simple string replacement', () => {
        it('should return the same string when there are no fmt args', () => {
            expect('The quick brown fox'.fmt('bob', 'frank')).toBe('The quick brown fox');
        });
        it('should replace strings in order', () => {
            expect('The %{s} %{s} %{s}'.fmt('quick', 'brown', 'fox')).toBe('The quick brown fox');
        });
        it('should respect the "%%" as an escape strings in order', () => {
            expect('The %%{s} %%{s} %%{s}'.fmt('quick', 'brown', 'fox')).toBe('The %%{s} %%{s} %%{s}');
        });
        it('should respect the "%%" as an escape string, mixed with replacements', () => {
            expect('The %{s} %{s} %%{s}'.fmt('quick', 'brown', 'fox')).toBe('The quick brown %%{s}');
        });
        it('should not replace open "{" at the end', () => {
            expect('The %{s} %{s} %{2'.fmt('quick', 'brown', 'fox')).toBe('The quick brown %{2');
        });
        it('should not replace open "{" at the beginning', () => {
            expect('The %{s %{s} %{2}'.fmt('quick', 'brown', 'fox')).toBe('The %{s quick fox');
        });
        it('should not replace open "{" all over the place', () => {
            expect('The %{s %{0} %{1 %{s} %{2} %{1'.fmt('quick', 'brown', 'fox')).toBe('The %{s quick %{1 quick fox %{1');
        });
        it('should support indicies and the "s" mixed in the "{}"', () => {
            expect('The %{0} %{s} %{2}'.fmt('quick', 'brown', 'fox')).toBe('The quick quick fox');
        });
        it('should support indicies out of order and the "s" mixed in the "{}"', () => {
            expect('The %{2} %{s} %{0}'.fmt('quick', 'brown', 'fox')).toBe('The fox quick quick');
        });
    });

    /**
    * check direct access to stringz#fmt(tmpStr, args...)
    */
    describe('stringz#fmt(tmpStr, args...)', () => {
        it('should support indicies out of order and the "s" mixed in the "{}"', () => {
            expect(stringz.fmt('The %{2} %{s} %{0}', 'quick', 'brown', 'fox')).toBe('The fox quick quick');
        });
    });

});
