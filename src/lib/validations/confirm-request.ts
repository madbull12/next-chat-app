import { z } from 'zod';

export const confirmRequestValidator = z.object({
    id:z.string()
});

