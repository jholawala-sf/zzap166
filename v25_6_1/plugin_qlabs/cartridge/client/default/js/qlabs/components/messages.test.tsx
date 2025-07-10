import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import {
    MarkdownMessageView,
    ProductTilesMessageView,
    SessionEndedMessageView,
    MessagesView,
    LoadingMessage,
    ChatInputView,
} from "./messages";
import { ResponseMessageType } from "@qlabs/api/agentapi";

// Import mocked modules
import { useAgentAPI } from "@qlabs/state/agentapi";
import { usePinnedProducts } from "@companion/state/pinned-products";
import { useExpr } from "@companion/hooks/jsonata";
import { useProductTiles } from "@companion/state/products";

// Mock dependencies
vi.mock("@qlabs/state/agentapi", () => ({
    useAgentAPI: vi.fn(() => ({
        messages: [],
        sessionId: "test-session",
        isLoading: false,
        isError: false,
        error: null,
        isActive: true,
        data: null,
        lastStructuredMessage: null,
        resetStructuredData: vi.fn(),
        resetSession: vi.fn(),
        sendMessage: vi.fn(),
        subscribe: vi.fn(),
        emit: vi.fn(),
    })),
    ResponseMessageType: {
        Inform: "Inform",
        SessionEnded: "SessionEnded",
        ProgressIndicator: "ProgressIndicator",
    },
}));

vi.mock("@companion/state/pinned-products", () => ({
    usePinnedProducts: vi.fn(() => ({
        pinnedProducts: [],
        addPinnedProduct: vi.fn(),
        removePinnedProduct: vi.fn(),
        setPinnedProducts: vi.fn(),
        isPending: false,
        pinnedProductMessagePrefix: "PINNED_PRODUCT_MESSAGE",
    })),
}));

vi.mock("@companion/hooks/jsonata", () => ({
    useExpr: vi.fn((query, data) => ({
        result: data ? "Test result" : null,
        isLoading: false,
    })),
}));

vi.mock("@companion/state/products", () => ({
    useProductTiles: vi.fn(() => ({
        data: [],
        isLoading: false,
        isError: false,
        error: null,
        isPending: false,
        isLoadingError: false,
        isRefetchError: false,
        isSuccess: true,
        status: "success",
        dataUpdatedAt: Date.now(),
        errorUpdatedAt: 0,
        failureCount: 0,
        failureReason: null,
        errorUpdateCount: 0,
        isFetched: true,
        isFetchedAfterMount: true,
        isFetching: false,
        isInitialLoading: false,
        isPaused: false,
        isPlaceholderData: false,
        isRefetching: false,
        isStale: false,
        refetch: vi.fn(),
        fetchStatus: "idle",
        promise: Promise.resolve([]),
    })),
}));

vi.mock("./product-tile", () => ({
    ProductTileView: ({ productTile }) => (
        <div data-testid="product-tile">{productTile.product.id}</div>
    ),
    FallbackProductTileView: ({ originalProduct }) => (
        <div data-testid="fallback-product-tile">{originalProduct.id}</div>
    ),
}));

vi.mock("./buttons", () => ({
    ButtonsView: () => <div data-testid="buttons-view">Buttons</div>,
}));

vi.mock("./icons", () => ({
    SpinnerIcon: ({ className }) => (
        <div data-testid="spinner-icon" className={className}>
            Spinner
        </div>
    ),
    EllipsisVerticalIcon: ({ className }) => (
        <div data-testid="ellipsis-icon" className={className}>
            Menu
        </div>
    ),
}));

describe("MarkdownMessageView", () => {
    const mockUserMessage = {
        MESSAGE_TYPE: "USER" as const,
        text: "Hello world",
    };

    const mockAgentMessage = {
        id: "1234",
        MESSAGE_TYPE: "AGENT" as const,
        type: ResponseMessageType.Inform,
        message: "Agent response",
        json: {
            action: { output: { userFriendlyMessage: "Friendly message" } },
        },
    };

    it("renders user message correctly", () => {
        render(<MarkdownMessageView message={mockUserMessage} />);
        expect(screen.getByText("Hello world")).toBeInTheDocument();
    });

    it("renders agent message correctly", () => {
        render(<MarkdownMessageView message={mockAgentMessage} />);
        expect(screen.getByText("Test result")).toBeInTheDocument();
    });

    it("returns null for non-Inform agent messages", () => {
        const nonInformMessage = {
            ...mockAgentMessage,
            id: "1234",
            type: "Other" as any,
        };
        const { container } = render(
            <MarkdownMessageView message={nonInformMessage} />,
        );
        expect(container.firstChild).toBeNull();
    });

    it("returns null when no content is available", () => {
        // Mock useExpr to return null for empty data
        vi.mocked(useExpr).mockReturnValueOnce({
            result: null,
            isLoading: false,
            error: null,
        });

        const emptyMessage = {
            id: "empty",
            MESSAGE_TYPE: "AGENT" as const,
            type: ResponseMessageType.Inform,
            message: "",
            json: {},
        };
        const { container } = render(
            <MarkdownMessageView message={emptyMessage} />,
        );
        expect(container.firstChild).toBeNull();
    });
});

describe("ProductTilesMessageView", () => {
    const mockProductMessage = {
        id: "product-tiles",
        MESSAGE_TYPE: "AGENT" as const,
        type: ResponseMessageType.Inform,
        json: {
            action: {
                output: {
                    products: {
                        productId: ["prod1", "prod2"],
                    },
                },
            },
        },
    };

    beforeEach(() => {
        vi.mocked(useExpr).mockImplementation((query, data) => {
            if (query === "action.output.products.productId" && data) {
                return { result: ["prod1", "prod2"], isLoading: false, error: null };
            }
            return { result: null, isLoading: false, error: null };
        });

        vi.mocked(useProductTiles).mockReturnValue({
            data: [
                { 
                    product: { 
                        id: "prod1", 
                        productName: "Product 1",
                        price: {
                            sales: { value: 10, currency: "USD", formatted: "$10.00", decimalPrice: "10.00" },
                            list: { value: 15, currency: "USD", formatted: "$15.00", decimalPrice: "15.00" }
                        },
                        images: {},
                        error: false 
                    },
                    urls: {
                        product: "/product/prod1",
                        quickView: "/quickview/prod1",
                        addToCart: "/addtocart/prod1"
                    }
                },
                { 
                    product: { 
                        id: "prod2", 
                        productName: "Product 2",
                        price: {
                            sales: { value: 20, currency: "USD", formatted: "$20.00", decimalPrice: "20.00" },
                            list: { value: 25, currency: "USD", formatted: "$25.00", decimalPrice: "25.00" }
                        },
                        images: {},
                        error: false 
                    },
                    urls: {
                        product: "/product/prod2",
                        quickView: "/quickview/prod2",
                        addToCart: "/addtocart/prod2"
                    }
                },
            ],
            isLoading: false,
            isError: false,
            error: null,
            isPending: false,
            isLoadingError: false,
            isRefetchError: false,
            isSuccess: true,
            status: "success",
            dataUpdatedAt: Date.now(),
            errorUpdatedAt: 0,
            failureCount: 0,
            failureReason: null,
            errorUpdateCount: 0,
            isFetched: true,
            isFetchedAfterMount: true,
            isFetching: false,
            isInitialLoading: false,
            isPaused: false,
            isPlaceholderData: false,
            isRefetching: false,
            isStale: false,
            refetch: vi.fn(),
            fetchStatus: "idle",
            promise: Promise.resolve([]),
        });
    });

    it("renders product tiles when product IDs are available", () => {
        render(<ProductTilesMessageView message={mockProductMessage} />);
    });

    it("returns null when no product IDs are available", () => {
        // Mock useExpr to return null for this specific case
        vi.mocked(useExpr).mockReturnValueOnce({
            result: null,
            isLoading: false,
            error: null,
        });

        const messageWithoutProducts = {
            id: "no-products",
            MESSAGE_TYPE: "AGENT" as const,
            type: ResponseMessageType.Inform,
            json: {},
        };
        const { container } = render(
            <ProductTilesMessageView message={messageWithoutProducts} />,
        );
        expect(container.firstChild).toBeNull();
    });
});

describe("SessionEndedMessageView", () => {
    const mockSessionEndedMessage = {
        id: "session-ended",
        MESSAGE_TYPE: "AGENT" as const,
        type: ResponseMessageType.SessionEnded,
        message: "Session ended",
    };

    const mockResetSession = vi.fn();

    beforeEach(() => {
        vi.mocked(useAgentAPI).mockReturnValue({
            messages: [],
            sessionId: "test-session",
            isLoading: false,
            isError: false,
            error: null,
            isActive: true,
            data: null,
            lastStructuredMessage: null,
            resetStructuredData: vi.fn(),
            resetSession: mockResetSession,
            sendMessage: vi.fn(),
            subscribe: vi.fn(),
            emit: vi.fn(),
        });
    });

    it("renders session ended message", () => {
        render(<SessionEndedMessageView message={mockSessionEndedMessage} />);
        expect(screen.getByText("Session has ended")).toBeInTheDocument();
        expect(screen.getByText("Restart Session")).toBeInTheDocument();
    });

    it("calls resetSession when restart link is clicked", () => {
        render(<SessionEndedMessageView message={mockSessionEndedMessage} />);
        fireEvent.click(screen.getByRole("link"));
        expect(mockResetSession).toHaveBeenCalled();
    });

    it("returns null for non-SessionEnded messages", () => {
        const nonSessionEndedMessage = {
            id: "regular-message",
            MESSAGE_TYPE: "AGENT" as const,
            type: ResponseMessageType.Inform,
            message: "Regular message",
        };
        const { container } = render(
            <SessionEndedMessageView message={nonSessionEndedMessage} />,
        );
        expect(container.firstChild).toBeNull();
    });
});

describe("LoadingMessage", () => {
    it("renders loading spinner when isLoading is true", () => {
        vi.mocked(useAgentAPI).mockReturnValue({
            messages: [],
            sessionId: "test-session",
            isLoading: true,
            isError: false,
            error: null,
            isActive: true,
            data: null,
            lastStructuredMessage: null,
            resetStructuredData: vi.fn(),
            resetSession: vi.fn(),
            sendMessage: vi.fn(),
            subscribe: vi.fn(),
            emit: vi.fn(),
        });

        render(<LoadingMessage />);
        expect(screen.getByTestId("spinner-icon")).toBeInTheDocument();
    });

    it("returns null when not loading", () => {
        vi.mocked(useAgentAPI).mockReturnValue({
            messages: [],
            sessionId: "test-session",
            isLoading: false,
            isError: false,
            error: null,
            isActive: true,
            data: null,
            lastStructuredMessage: null,
            resetStructuredData: vi.fn(),
            resetSession: vi.fn(),
            sendMessage: vi.fn(),
            subscribe: vi.fn(),
            emit: vi.fn(),
        });

        const { container } = render(<LoadingMessage />);
        expect(container.firstChild).toBeNull();
    });

    it("displays progress indicator messages", () => {
        vi.mocked(useAgentAPI).mockReturnValue({
            messages: [
                {
                    id: "progress-1",
                    MESSAGE_TYPE: "AGENT",
                    type: ResponseMessageType.ProgressIndicator,
                    message: "Processing...",
                },
                {
                    id: "progress-2",
                    MESSAGE_TYPE: "AGENT",
                    type: ResponseMessageType.ProgressIndicator,
                    message: "Almost done...",
                },
            ],
            sessionId: "test-session",
            isLoading: true,
            isError: false,
            error: null,
            isActive: true,
            data: null,
            lastStructuredMessage: null,
            resetStructuredData: vi.fn(),
            resetSession: vi.fn(),
            sendMessage: vi.fn(),
            subscribe: vi.fn(),
            emit: vi.fn(),
        });

        render(<LoadingMessage />);
        expect(screen.getByText("Processing...")).toBeInTheDocument();
        expect(screen.getByText("Almost done...")).toBeInTheDocument();
    });
});

describe("ChatInputView", () => {
    const mockOnSendMessage = vi.fn();
    const mockResetSession = vi.fn();

    beforeEach(() => {
        mockOnSendMessage.mockClear();
        mockResetSession.mockClear();
    });

    it("renders chat input with placeholder", () => {
        render(
            <ChatInputView
                onSendMessage={mockOnSendMessage}
                placeholder="Type a message..."
            />,
        );
        expect(
            screen.getByPlaceholderText("Type a message..."),
        ).toBeInTheDocument();
    });

    it("sends message when form is submitted with text", () => {
        render(<ChatInputView onSendMessage={mockOnSendMessage} />);
        const input = screen.getByRole("textbox");
        const sendButton = screen.getByRole("button");

        fireEvent.change(input, { target: { value: "Hello" } });
        fireEvent.click(sendButton);

        expect(mockOnSendMessage).toHaveBeenCalledWith("Hello");
    });

    it("clears input after sending message", () => {
        render(<ChatInputView onSendMessage={mockOnSendMessage} />);
        const input = screen.getByRole("textbox") as HTMLInputElement;
        const sendButton = screen.getByRole("button");

        fireEvent.change(input, { target: { value: "Hello" } });
        fireEvent.click(sendButton);

        expect(input.value).toBe("");
    });

    it("disables input and button when disabled prop is true", () => {
        render(
            <ChatInputView onSendMessage={mockOnSendMessage} disabled={true} />,
        );
        const input = screen.getByRole("textbox");
        const sendButton = screen.getByRole("button");

        expect(input).toBeDisabled();
        expect(sendButton).toBeDisabled();
    });

    it("shows menu when showMenu is true", () => {
        render(
            <ChatInputView
                onSendMessage={mockOnSendMessage}
                showMenu={true}
                resetSession={mockResetSession}
            />,
        );
        expect(screen.getByTestId("ellipsis-icon")).toBeInTheDocument();
    });

    it("opens and closes menu dropdown", () => {
        render(
            <ChatInputView
                onSendMessage={mockOnSendMessage}
                showMenu={true}
                resetSession={mockResetSession}
            />,
        );

        const menuButton = screen
            .getByTestId("ellipsis-icon")
            .closest("button");
        fireEvent.click(menuButton!);

        expect(screen.getByRole("menuitem")).toBeInTheDocument();

        fireEvent.click(menuButton!);
        expect(screen.queryByRole("menuitem")).not.toBeInTheDocument();
    });

    it("calls resetSession when menu option is clicked", () => {
        render(
            <ChatInputView
                onSendMessage={mockOnSendMessage}
                showMenu={true}
                resetSession={mockResetSession}
            />,
        );

        const menuButton = screen
            .getByTestId("ellipsis-icon")
            .closest("button");
        fireEvent.click(menuButton!);

        const resetButton = screen.getByRole("menuitem");
        fireEvent.click(resetButton);

        expect(mockResetSession).toHaveBeenCalled();
    });
});

describe("MessagesView", () => {
    const mockMessages = [
        {
            MESSAGE_TYPE: "USER" as const,
            text: "Hello",
        },
        {
            id: "agent-response",
            MESSAGE_TYPE: "AGENT" as const,
            type: ResponseMessageType.Inform,
            message: "Hi there",
        },
    ];

    beforeEach(() => {
        vi.mocked(usePinnedProducts).mockReturnValue({
            pinnedProducts: [],
            addPinnedProduct: vi.fn(),
            removePinnedProduct: vi.fn(),
            setPinnedProducts: vi.fn(),
            isPending: false,
            pinnedProductMessagePrefix: "PINNED_PRODUCT_MESSAGE",
        });
    });

    it("renders messages correctly", () => {
        render(<MessagesView messages={mockMessages} isLoading={false} />);

        expect(screen.getByText("Hello")).toBeInTheDocument();
        expect(screen.getByText("Hi there")).toBeInTheDocument();
    });

    it("filters out user messages when user=false", () => {
        render(
            <MessagesView
                messages={mockMessages}
                isLoading={false}
                user={false}
            />,
        );

        expect(screen.queryByText("Hello")).not.toBeInTheDocument();
        expect(screen.getByText("Hi there")).toBeInTheDocument();
    });

    it("filters out agent messages when agent=false", () => {
        render(
            <MessagesView
                messages={mockMessages}
                isLoading={false}
                agent={false}
            />,
        );

        expect(screen.getByText("Hello")).toBeInTheDocument();
        expect(screen.queryByText("Hi there")).not.toBeInTheDocument();
    });

    it("skips messages based on skip array", () => {
        render(
            <MessagesView
                messages={mockMessages}
                isLoading={false}
                skip={[1]}
            />,
        );

        expect(screen.queryByText("Hello")).not.toBeInTheDocument();
        expect(screen.getByText("Hi there")).toBeInTheDocument();
    });

    it("limits messages when last prop is provided", () => {
        const manyMessages = [
            ...mockMessages,
            {
                MESSAGE_TYPE: "USER" as const,
                text: "Message 3",
            },
        ];

        render(
            <MessagesView messages={manyMessages} isLoading={false} last={1} />,
        );

        expect(screen.queryByText("Hello")).not.toBeInTheDocument();
        expect(screen.queryByText("Hi there")).not.toBeInTheDocument();
        expect(screen.getByText("Message 3")).toBeInTheDocument();
    });

    it("filters out pinned product messages", () => {
        const messagesWithPinned = [
            ...mockMessages,
            {
                MESSAGE_TYPE: "USER" as const,
                text: "PINNED_PRODUCT_MESSAGE Product message",
            },
        ];

        render(
            <MessagesView messages={messagesWithPinned} isLoading={false} />,
        );

        expect(screen.getByText("Hello")).toBeInTheDocument();
        expect(screen.getByText("Hi there")).toBeInTheDocument();
        expect(
            screen.queryByText("PINNED_PRODUCT_MESSAGE Product message"),
        ).not.toBeInTheDocument();
    });
});

