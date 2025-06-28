import { z } from "zod";

import { logger } from "./logging";

const API_URL = "http://192.168.100.111:3000";

export type X<T> = { success: true; data: T } | { success: false; error: { message: string } };

const getFileSchema = z.object({
    filename: z.string(),
});
export type GetFileResponse = z.infer<typeof getFileSchema>;

export const sendFileSchema = z.object({
    filename: z.string(),
});
export type SendFileResponse = z.infer<typeof sendFileSchema>;

export const errorMessageSchema = z.object({
    error: z.string(),
});
export type ErrorMessageResponse = z.infer<typeof errorMessageSchema>;

const ERROR_NETWORK = "Network error";
const ERROR_RESPONSE_FORMAT = "Got invalid response format";

export const sendFile = async (file: File, expire: number): Promise<X<GetFileResponse>> => {
    try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("expires", String(expire));

        const response = await fetch(`${API_URL}/send`, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            return {
                success: false,
                error: { message: errorMessageSchema.parse(await response.json()).error },
            };
        }

        logger.debug(`Sent file ${String(file.name)}`);
        const result = sendFileSchema.safeParse(await response.json());

        if (result.success) {
            return result;
        }

        return {
            ...result,
            error: { message: ERROR_RESPONSE_FORMAT },
        };
    } catch (error) {
        logger.error(`Failed to send file: ${String(error)}`);

        return {
            success: false,
            error: { message: ERROR_NETWORK },
        };
    }
};

export const getFile = async (filename: string): Promise<X<GetFileResponse>> => {
    try {
        const response = await fetch(`${API_URL}/get/${filename}`);

        if (!response.ok) {
            return {
                success: false,
                error: { message: errorMessageSchema.parse(await response.json()).error },
            };
        }

        const result = getFileSchema.safeParse(await response.json());

        if (result.success) {
            return result;
        }
        return {
            ...result,
            error: { message: ERROR_RESPONSE_FORMAT },
        };
    } catch (error) {
        logger.error(`Failed to get file ${filename}: ${String(error)}`);
        return {
            success: false,
            error: { message: ERROR_NETWORK },
        };
    }
};
