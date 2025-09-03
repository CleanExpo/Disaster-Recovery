import { Elysia } from 'elysia';
export declare const adminRouter: Elysia<"/api/admin", {
    decorator: {};
    store: {};
    derive: {};
    resolve: {};
}, {
    typebox: {};
    error: {};
}, {
    schema: {};
    standaloneSchema: {};
    macro: {};
    macroFn: {};
    parser: {};
}, {
    api: {
        admin: {
            contractors: {
                ":id": {
                    verify: {
                        post: {
                            body: {
                                backgroundCheck?: boolean | undefined;
                            };
                            params: {
                                id: string;
                            };
                            query: unknown;
                            headers: unknown;
                            response: {
                                200: {
                                    success: boolean;
                                    data: any;
                                };
                                422: {
                                    type: "validation";
                                    on: string;
                                    summary?: string;
                                    message?: string;
                                    found?: unknown;
                                    property?: string;
                                    expected?: string;
                                };
                            };
                        };
                    };
                };
            };
        };
    };
} & {
    api: {
        admin: {
            content: {
                ":id": {
                    approve: {
                        post: {
                            body: {
                                approvedBy: string;
                            };
                            params: {
                                id: string;
                            };
                            query: unknown;
                            headers: unknown;
                            response: {
                                200: {
                                    success: boolean;
                                    data: any;
                                };
                                422: {
                                    type: "validation";
                                    on: string;
                                    summary?: string;
                                    message?: string;
                                    found?: unknown;
                                    property?: string;
                                    expected?: string;
                                };
                            };
                        };
                    };
                };
            };
        };
    };
} & {
    api: {
        admin: {
            metrics: {
                get: {
                    body: unknown;
                    params: {};
                    query: unknown;
                    headers: unknown;
                    response: {
                        200: {
                            success: boolean;
                            data: any;
                        };
                    };
                };
            };
        };
    };
} & {
    api: {
        admin: {
            compliance: {
                audit: {
                    get: {
                        body: unknown;
                        params: {};
                        query: {
                            startDate?: string | undefined;
                            endDate?: string | undefined;
                            limit?: number | undefined;
                        };
                        headers: unknown;
                        response: {
                            200: {
                                success: boolean;
                                data: any;
                            };
                            422: {
                                type: "validation";
                                on: string;
                                summary?: string;
                                message?: string;
                                found?: unknown;
                                property?: string;
                                expected?: string;
                            };
                        };
                    };
                };
            };
        };
    };
}, {
    derive: {};
    resolve: {};
    schema: {};
    standaloneSchema: {};
}, {
    derive: {};
    resolve: {};
    schema: {};
    standaloneSchema: {};
}>;
//# sourceMappingURL=admin.routes.d.ts.map