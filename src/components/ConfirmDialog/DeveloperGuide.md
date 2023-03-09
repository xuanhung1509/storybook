# Confirm Dialog

A confirm dialog with an expressive API similar to the browser's native `window.confirm()` method.

- [Overview](#overview)
- [Basic Usage](#basic-usage)
- [Customization](#customization)

## Overview

```tsx
import {
  ConfirmDialog,
  ConfirmDialogProvider,
  useConfirmDialog,
} from '@/components/ConfirmDialog';

const NextButton = () => {
  const { confirm } = useConfirmDialog();

  const handleClick = () => {
    if (await confirm()) {
      // Action on confirm
    }
  };

  return (
    <button type="button" onClick={handleClick}>
      Next
    </button>
  );
};

const MyComponent = ({ ConfirmDialogProps, ...otherProps }) => {
  return (
    <ConfirmDialogProvider>
      {/* MyComponent code, including NextButton */}

      <ConfirmDialog {...ConfirmDialogProps} />
    </ConfirmDialogProvider>
  );
};

export default MyComponent;
```

## Basic Usage

- Wrap the library component (e.g. `MyComponent`) inside `ConfirmDialogProvider`
- Put `ConfirmDialog` inside `ConfirmDialogProvider`
- To trigger the dialog (e.g. on a button click):
  - Destructure `confirm` method from `useConfirmDialog` hook.
  - Use `await confirm()`, just like you would do with the browser's native `window.confirm()` method.
    (The difference though, is that you do not put a title inside `confirm` method)

> To customize the text content and styles of the dialog, see [Customization](#customization).

## Customization

Library users can change the text content (e.g. title, description, button text) via `textContent` prop, as well as the look-and-feel via `classNames` prop. For all the available props, checkout [ConfirmDialog](ConfirmDialog.tsx) interface.

To allow customization of ConfirmDialog from library's users:

- Add `ConfirmDialogProps` to `MyComponent` props.
- Spread `ConfirmDialogProps` onto `ConfirmDialog` component.
- Library's users can then customize from outside:

```tsx
<MyComponent
  // Other props
  ConfirmDialogProps={{
    textContent: {
      title: 'Alternative title',
      description: 'Alternative description',
      // ...
    },
    classNames: {
      // ...
    },
  }}
/>
```
