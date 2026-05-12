import { css } from 'lit';

export const flex = css /* css */ `
    .flex {
        display: flex;
        justify-content: var(--justify-content, center);
        align-items: var(--align-items, center);
        gap: var(--gap, 1rem);
    }

    .flex-row {
        flex-direction: row;
    }

    .flex-column {
        flex-direction: column;
    }
`;
