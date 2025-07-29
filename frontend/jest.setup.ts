import { TextEncoder, TextDecoder } from 'util';
import '@testing-library/jest-dom/jest-globals';
import '@testing-library/jest-dom';


if (typeof global.TextEncoder === 'undefined') {
    global.TextEncoder = TextEncoder as any;
}

if (typeof global.TextDecoder === 'undefined') {
    global.TextDecoder = TextDecoder as any;
}