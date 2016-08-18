/* global jasmine, describe, it, beforeEach, expect, module, inject, createCompiler   */

'use strict';

describe('Directive: ngAttr', function() {
  var compile, $rootScope;

  var elementAttrsMock = {
    'ng-attr': 'attrs'
  };


  beforeEach(module('argshook.ngAttr'));

  beforeEach(inject(function($compile, _$rootScope_) {
    compile = createCompiler('<div />', _$rootScope_, $compile);
    $rootScope = _$rootScope_;
  }));

  it('should compile successfully', function() {
    compile({}, elementAttrsMock, function (scope, element) {
      expect(element.attr('ng-attr')).toBe('attrs');
    });
  });

  describe('when given object with attributes', function() {
    it('should set given attributes to values from scope', function() {
      var parentScope = {
        value: 'hello'
      };

      parentScope.attrs = {
        attribute: parentScope.value,
        another: parentScope.value + parentScope.value
      };

      compile(parentScope, elementAttrsMock, function (scope, element) {
        expect(element.attr('attribute')).toBe('hello');
        expect(element.attr('another')).toBe('hellohello');
      });
    });

    describe('containing invalid values', function() {
      it('should ignore them', function() {
        var parentScope = {
          onScope: 'expected'
        };

        parentScope.attrs = {
          invalid: undefined,
          invalid2: NaN,
          'valid-attr': parentScope.onScope
        };

        compile(parentScope, elementAttrsMock, function (scope, element) {
          expect(element.attr('valid-attr')).toBe('expected');
          expect(element.attr('invalid')).toBe(undefined);
          expect(element.attr('invalid2')).toBe(undefined);
        });
      });
    });

    describe('and value changes later', function() {
      it('should update attribute to new value', function() {
        var parentScope = {
          value: 'da best',
          another: 'besterest'
        };

        parentScope.attrs = {
          'best-attribute': parentScope.value
        };

        compile(parentScope, elementAttrsMock, function (scope, element) {
          scope = $rootScope.$new();

          expect(element.attr('best-attribute')).toBe('da best');
          parentScope.attrs['best-attribute'] = 'besterest';

          scope.$apply();

          expect(element.attr('best-attribute')).toBe('besterest');
        });
      });
    });
  });

  describe('when given object without attributes', function() {
    it('should not add any attributes', function() {
      compile({ attrs: {} }, elementAttrsMock, function (scope, element) {
        expect(element[0].attributes.length).toBe(2); // ng-attr="attrs" and class="ng-scope"
      });
    });
  });
});

