## About

Use when you have a prototype where users are intended to follow a prescribed set of steps or interactions.

The `exa-demo-path` element listens for clicks on the page and evaluates whether or not the target element is part of the intended path, if not flashing hints are overlayed on all path elements.

## The element

```html
<!-- note, the element is self standing; doesn't need to wrap the ui-->
<exa-demo-path data-path='.on-path'></exa-demo-path>
```

### Attributes

| attribute    | value                                        |
|--------|----------------------------------------------|
| data-path  | a css selector for UI elements that will 'flash' when the user clicks outside of the prescribed path.   |

## Example

```html
<exa-demo-path data-path='.on-path'></exa-demo-path>

<button>Inactive Button</button>
<button class='on-path'>Active Button</button>
```
