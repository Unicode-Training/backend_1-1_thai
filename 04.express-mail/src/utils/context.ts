import { AsyncLocalStorage } from "async_hooks";

type AsyncStore = Map<string, unknown>;

// Khởi tạo instance của AsyncLocalStorage
export const asyncLocalStorage = new AsyncLocalStorage<AsyncStore>();

/**
 * Hàm lấy đối tượng request hiện tại ở bất kỳ đâu
 * @returns {import('express').Request | null}
 */
export const request = (): import("express").Request | null => {
    const store = asyncLocalStorage.getStore();
    return store ? (store.get("req") as import("express").Request | null) : null;
};

export const user = () => {
    return request()?.user;
}