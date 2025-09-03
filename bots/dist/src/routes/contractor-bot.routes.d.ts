import { Elysia } from 'elysia';
export declare const contractorBotRouter: Elysia<"/api/contractor", {
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
        contractor: {
            auth: {
                login: {
                    post: {
                        body: {
                            email: string;
                            password: string;
                        };
                        params: {};
                        query: unknown;
                        headers: unknown;
                        response: {
                            200: {
                                success: boolean;
                                token: any;
                                contractor: {
                                    id: any;
                                    businessName: any;
                                    email: any;
                                    services: any;
                                };
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
} & {
    api: {
        contractor: {
            jobs: {
                available: {
                    get: {
                        body: unknown;
                        params: {};
                        query: unknown;
                        headers: {
                            authorization: string;
                        };
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
} & {
    api: {
        contractor: {
            jobs: {
                ":jobId": {
                    accept: {
                        post: {
                            body: unknown;
                            params: {
                                jobId: string;
                            };
                            query: unknown;
                            headers: {
                                authorization: string;
                            };
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
        contractor: {
            jobs: {
                ":jobId": {
                    status: {
                        patch: {
                            body: {
                                notes?: string | undefined;
                                status: "in_progress" | "completed" | "cancelled";
                            };
                            params: {
                                jobId: string;
                            };
                            query: unknown;
                            headers: {
                                authorization: string;
                            };
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
        contractor: {
            jobs: {
                my: {
                    get: {
                        body: unknown;
                        params: {};
                        query: {
                            status?: string | undefined;
                        };
                        headers: {
                            authorization: string;
                        };
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
} & {
    api: {
        contractor: {
            guides: {
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
        contractor: {
            procedures: {
                ":serviceType": {
                    get: {
                        body: unknown;
                        params: {
                            serviceType: string;
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
} & {
    api: {
        contractor: {
            availability: {
                put: {
                    body: {
                        schedule?: {
                            available: boolean;
                            dayOfWeek: number;
                            startTime: string;
                            endTime: string;
                        }[] | undefined;
                        currentCapacity: number;
                        emergencyAvailable: boolean;
                    };
                    params: {};
                    query: unknown;
                    headers: {
                        authorization: string;
                    };
                    response: {
                        200: {
                            success: boolean;
                            message: string;
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
} & {
    api: {
        contractor: {
            metrics: {
                get: {
                    body: unknown;
                    params: {};
                    query: unknown;
                    headers: {
                        authorization: string;
                    };
                    response: {
                        200: {
                            success: boolean;
                            data: {
                                totalJobs: any;
                                completionRate: any;
                                customerRating: any;
                                responseTime: any;
                                currentCapacity: any;
                                maxCapacity: any;
                                avgCompletionTime: number;
                                jobsByStatus: {
                                    pending: any;
                                    assigned: any;
                                    in_progress: any;
                                    completed: any;
                                };
                            };
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
//# sourceMappingURL=contractor-bot.routes.d.ts.map