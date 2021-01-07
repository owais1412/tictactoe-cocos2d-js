/* global console, process, require */

var file, out_str, out,
  fs = require('fs'),
  _ = require('underscore'),
  retval = 0,
  functions_list = ['onExit', 'onEnter', 'ctor'],
  findSuper = function (startline) {
    'use strict';

    var from_start = out.slice(startline),
      paranthesis_count = 0,
      found = false,
      is_commented, search;

    _.find(from_start, function (line) {
      if (line.indexOf('{') > 0) {
        paranthesis_count++;
      } else if (line.indexOf('}') > 0) {
        paranthesis_count--;
      }
      if (!found) {
        search = line.search('this._super');
        found = search > 0;
        if (found) {
          is_commented = line.search('//');
          if (is_commented > 0 && is_commented < search) {
            found = false;
          }
        }
      }

      if (paranthesis_count === 0) {
        return true;
      }
    });
    return found;
  },
  process_file = function (file) {
    'use strict';

    var lines, is_super_present;

    out_str = fs.readFileSync(file, 'utf8');
    out = out_str.split('\n');

    lines = {};
    _.each(out, function (line, line_number) {
      if (line.search('ignore:this_super_check') > 0) {
        process.exit(0);
      }
      _.each(functions_list, function (func) {
        is_super_present = false;
        if (line.search(func + ': function') > 0) {
          is_super_present = findSuper(line_number);
          if (!is_super_present) {
            console.log('this._super is not invoked for ' + func +
            ' in line number :' + (line_number + 1));
            retval++;
          }
          if (lines[func]) {
            lines[func].push({
              line_number: line_number,
              is_present: is_super_present
            });
          } else {
            lines[func] = [{
              line_number: line_number,
              is_present: is_super_present
            }];
          }
        }
      });
    });

    return retval;
  };

file = process.argv[2];
if (file.search('src/') !== -1) {
  process_file(file);
}
process.exit(retval);
