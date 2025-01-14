What the "?.()" notation means:

Imagine you have this: `const controls = globeObj.controls?.();`

This can be interpreted as:

a.) Assign the result of calling the `controls` function of `globeObj` (if it exists)
    to the constant `controls`.
    
b.) If `controls` is truthy (i.e. not null / undefined / etc.), then call the `update` 
    method on the controls object. 

<hr/>

What the useRef<>() notation means:

Imagine you have this: `const globeElement = useRef<any>(null);`

This can be interpreted as:

a.) Create mutable reference `globeElement` via `useRef`, and allow it to hold a 
    value of any type.
    
b.) Initialize the value as null. 