import { Input } from './stepper.styles.ts';
import { useState } from 'react';

function Stepper() {
    const [value, setValue] = useState(1);

    const onInput = (event: any) => {
        setValue(event.target.value);
    }

    return (
        <>
            <Input id="slider" type="range" min="1" max="5" defaultValue="1" step="1" onInput={onInput}/>
        </>
    )
}

export default Stepper;
