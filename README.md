# ng-attr

## `<div ng-attr="{ 'attribute-name': scopeReference }"></div>`

Directive for Angular 1.x for dynamic element attributes

Somewhat similar to `ng-class` buf to attributes.

Given:

```js
angular
    .module('myApp')
    .component('myComponent', {
        template: '<div ng-attr="{ \'special-attribute\': $ctrl.attrValue }"></div>',
        controller: function() {
            this.attrValue = 'Hello gurls';
        }
    });
```

will be compiled to

```html
<div ng-attr="{ 'attribute-name': scopeReference }" special-attribute="Hello gurls"></div>
```

## Installation

* `npm i ng-attr --save`
* `angular.module('yourModule', ['argshook.ngAttr'])`

