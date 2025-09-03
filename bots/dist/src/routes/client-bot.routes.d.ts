import { Elysia } from 'elysia';
import { MasterOrchestrator } from '../bots/orchestration/agent-hierarchy';
export declare const clientBotRouter: Elysia<"/api/client", {
    decorator: {};
    store: {
        orchestrator: MasterOrchestrator;
    };
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
        client: {
            message: {
                post: {
                    body: {
                        metadata?: {
                            email?: string | undefined;
                            phone?: string | undefined;
                            location?: {
                                state?: string | undefined;
                                suburb?: string | undefined;
                                postcode?: string | undefined;
                                address: string;
                            } | undefined;
                        } | undefined;
                        message: string;
                        sessionId: string;
                        channel: "email" | "web" | "sms" | "whatsapp";
                    };
                    params: {};
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
} & {
    api: {
        client: {
            emergency: {
                post: {
                    body: {
                        customerEmail?: string | undefined;
                        description: string;
                        serviceType: string;
                        customerName: string;
                        customerPhone: string;
                        location: {
                            state?: string | undefined;
                            suburb?: string | undefined;
                            postcode?: string | undefined;
                            address: string;
                        };
                        sessionId: string;
                    };
                    params: {};
                    query: unknown;
                    headers: unknown;
                    response: {
                        200: {
                            success: boolean;
                            emergencyId: string;
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
} & {
    api: {
        client: {
            guides: {
                get: {
                    body: unknown;
                    params: {};
                    query: {
                        type?: string | undefined;
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
} & {
    api: {
        client: {
            guides: {
                ":id": {
                    get: {
                        body: unknown;
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
} & {
    api: {
        client: {
            insurance: {
                claim: {
                    post: {
                        body: {
                            urgency?: string | undefined;
                            claimNumber?: string | undefined;
                            description: string;
                            serviceType: string;
                            customerName: string;
                            customerPhone: string;
                            customerEmail: string;
                            insurerName: string;
                            policyNumber: string;
                            location: {
                                state?: string | undefined;
                                suburb?: string | undefined;
                                postcode?: string | undefined;
                                address: string;
                            };
                        };
                        params: {};
                        query: unknown;
                        headers: unknown;
                        response: {
                            200: {
                                success: boolean;
                                jobId: any;
                                insuranceProcess: any;
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
        client: {
            contractors: {
                search: {
                    post: {
                        body: {
                            suburb?: string | undefined;
                            postcode?: string | undefined;
                            emergencyOnly?: boolean | undefined;
                            serviceType: string;
                        };
                        params: {};
                        query: unknown;
                        headers: unknown;
                        response: {
                            200: {
                                success: boolean;
                                count: any;
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
        client: {
            conversation: {
                ":sessionId": {
                    get: {
                        body: unknown;
                        params: {
                            sessionId: string;
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
//# sourceMappingURL=client-bot.routes.d.ts.map