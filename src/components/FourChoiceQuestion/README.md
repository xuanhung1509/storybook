# Four-choice Question

## Props structure

- `mode`: Different modes decide how the component looks and behaves.
- Question data props: Required data for question to function.
  - `label`
  - `difficultyLevel`
  - `commonQuestion`
  - `question`
  - `answers`
  - `hint`
  - `correctAnswerId`
  - `solution`
  - `selectedAnswerId`
- Customization props: Change the text content and how the component looks.
  - `textContent`
  - `classNames`
- Event handler props
  - `onHintClick`
  - `onNextClick`
  - `onReviewClick`
  - `onCorrectAnswerSelect`
  - `onIncorrectAnswerSelect`
- `insertComponent`: In case library users need to insert an arbitrary component.
- `ConfirmDialog`: In case library users need to customize the confirm dialog.

> For detailed descriptions, checkout [here](types.ts)
