import { raySetup } from '@/setup';
import { expect, it } from 'vitest';
import { isRef } from 'vue';

function setupCallCounters() {
    const component = { data: {} } as any;
    const callCounters = {
        beforeMount: 0,
        beforeUnmount: 0,
        updated: 0,
        mounted: 0,
        unmounted: 0,
    };

    const lifecycleMethods = {
        beforeMount: (hook): false => {
            callCounters.beforeMount++;
            hook();
            return false;
        },
        beforeUnmount: (hook): false => {
            callCounters.beforeUnmount++;
            hook();
            return false;
        },
        mounted: (hook): false => {
            callCounters.mounted++;
            hook();
            return false;
        },
        unmounted: (hook): false => {
            callCounters.unmounted++;
            hook();
            return false;
        },
        updated: (hook): false => {
            callCounters.updated++;
            hook();
            return false;
        },
    };

    return {
        component,
        callCounters,
        lifecycleMethods,
    };
}

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

it('adds all lifecycle events to the component', () => {
    const { component, callCounters, lifecycleMethods } = setupCallCounters();

    raySetup(component, {
        lifecycleEvents: {
            all: true,
        },
        lifecycleMethods,
    });

    expect(callCounters).toMatchSnapshot();
});

it('adds beforeMount lifecycle event to the component', () => {
    const { component, callCounters, lifecycleMethods } = setupCallCounters();

    raySetup(component, {
        lifecycleEvents: {
            beforeMount: true,
        },
        lifecycleMethods,
    });

    expect(callCounters).toMatchSnapshot();
});

it('adds beforeUnmount lifecycle event to the component', () => {
    const { component, callCounters, lifecycleMethods } = setupCallCounters();

    raySetup(component, {
        lifecycleEvents: {
            beforeUnmount: true,
        },
        lifecycleMethods,
    });

    expect(callCounters).toMatchSnapshot();
});

it('adds updated lifecycle event to the component', () => {
    const { component, callCounters, lifecycleMethods } = setupCallCounters();

    raySetup(component, {
        lifecycleEvents: {
            updated: true,
        },
        lifecycleMethods,
    });

    expect(callCounters).toMatchSnapshot();
});

it('adds mounted lifecycle event to the component', () => {
    const { component, callCounters, lifecycleMethods } = setupCallCounters();

    raySetup(component, {
        lifecycleEvents: {
            mounted: true,
        },
        lifecycleMethods,
    });

    expect(callCounters).toMatchSnapshot();
});

it('adds unmounted lifecycle event to the component', () => {
    const { component, callCounters, lifecycleMethods } = setupCallCounters();

    raySetup(component, {
        lifecycleEvents: {
            unmounted: true,
        },
        lifecycleMethods,
    });

    expect(callCounters).toMatchSnapshot();
});
