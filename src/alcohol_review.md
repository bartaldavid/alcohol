# Alcohol App review

## Generic stuff

Overall this is really nice stuff, especially for one of the first TypeScript projects, and one of the first React projects!
GOOO MAN B)

It is a good idea to use Prettier and ESLint with VSCode, so your code will be universally formatted, and follows best practices in all places.
Read about installation here:
https://prettier.io/docs/en/install.html
https://github.com/prettier/eslint-config-prettier#installation

## Drink.tsx, StoredDrink.tsx

- The regular TypeScript file extension is `.ts`. Only use `.tsx` when you mix JSX into the code, e.g. React components. For classes, types, etc `.ts` is enough

- Wherever you can, it's better to use types, then classes. TS, and React especially moves away from object-oriented programming towards the functional direction. Consider rewriting, and using your data storage entities like the following:

```typescript
type Drink {
  name: string,
  quantity: number,
  alcoholContent: number
  price: number,
}

// in DrinkForm.tsx
const [form, setForm] = useState<Drink>(null);
// and then handle the null case properly, or initilaze the state with the desired default object like this:
const [form, setForm] = useState<Drink>({name: '', quantity: 0, alcoholContent: 0, price: 1});
// I recommend the first approach, these default values do not have real meaning
```

## App.tsx

- Local storage handling is a bit messy, these kinds of operations are better moved to a custom hook, or a static helper. Try to avoid having complex non-UI logic directly in your component.

- The `useEffect` hook which reads from the LS is run immediately after the component mounts - at which point the state is clearly an empty array, the spread operator (`...`) does nothing, but later it can open up the code to a whole list of state management problem. Try and have a single source of truth. Create a hook which saves/loads drinks, and use that in your component. Hide all the implementation details there, and decide where you want to handle your state, inside localStorage, and read/write from there everytime, or in React state, and only mirror it to LS.

- Decide whether you want use regular or arrow function declarations, don't mix the two approaches. See `handleClearAll` vs `saveDrinksToArray`. You can read up on the difference here, but tldr; the `this` keyword will point to different places: https://medium.com/geekculture/regular-vs-arrow-function-1f8140fbcece

- If you have complicated functions declared in the component body, it's a good idea to wrap them in a `useCallback` hook. It "memoizes" the function, avoiding recreaton on every render, saving precious resources. Read up here: https://beta.reactjs.org/apis/react/useCallback. The functions you declared however, could easily be used inline, like this. No need to declare it beforehand.

```typescript
<button onClick={() => setDrinks([])} id="clear-all-button">
  <GiTrashCan /> Clear all
</button>
```

## DrinksList

- This component is simply a map of other components, without business logic, and used only in a single place. There's really no need to separate it to another component, just write the code inline in `App.tsx`

## DrinkForm

- Style and code is very nicely separeted, folder structure is nice, and the JSX is also pretty straightforward here! Well done!
- Thin about how you can refactor all those small function into something more simple, and more generic.
- Extra kudos for properly typing React event props, and for `event.preventDefault()`!

## DrinkCard

- Perfect controlled/"dumb" component, this is what React is about! Sweet

## QuantityChooser

- It was a good idea to separate data/config, code, and styling
- It is better to write comments and logs in English, even when practicing - who knows who will have to work on your code later on
- the `<value.logo />` part on line 24 does not work, because that variable already contains a React component function. Use it like this:

```typescript
// QCData.ts -> QCData.tsx
{
  label: "4 cl",
  value: 40,
  logo: <GiGlassShot />, // this is the important part here
}

// index.tsx
{value.logo}
```
