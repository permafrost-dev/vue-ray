import { raySetup } from '@/setup';
import { expect, it } from 'vitest';
import { isRef } from 'vue';

it('performs setup for ray and returns a ref', () => {
    const component = { data: {} } as any;
    const result = raySetup(component);

    expect(result.value).not.toBeNull();
    expect(isRef(result)).toBe(true);
});

it('adds the ray methods to the component', () => {
    const component = { data: {} } as any;
    raySetup(component);

    expect(component.$ray).toBeDefined();
});
