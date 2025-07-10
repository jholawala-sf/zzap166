interface IconProps extends React.SVGProps<SVGSVGElement> {
    solid?: boolean;
}

export const BookmarkIcon = ({ solid = false, ...props }: IconProps) =>
    solid ? (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            {...props}
        >
            <path
                fillRule="evenodd"
                d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
                clipRule="evenodd"
            />
        </svg>
    ) : (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            {...props}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
            />
        </svg>
    );

export const ArrowPathIcon = (props: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        {...props}
    >
        <path
            fillRule="evenodd"
            d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z"
            clipRule="evenodd"
        />
    </svg>
);

export const SparklesIcon = (props: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 520 520"
        fill="currentColor"
        {...props}
    >
        <path d="m349 272-69 34a105 105 0 0 0-47 47l-33 67c-5 10-19 10-24 0l-34-68a105 105 0 0 0-47-47l-68-34a13 13 0 0 1 0-24l68-34a105 105 0 0 0 47-47l34-68a13 13 0 0 1 24 0l34 68a105 105 0 0 0 47 47l68 34c10 5 10 19 0 24Zm148 150-30-14a45 45 0 0 1-20-20l-14-30a6 6 0 0 0-10 0l-15 30a45 45 0 0 1-20 20l-30 15c-3 2-3 8 0 10l30 15a45 45 0 0 1 20 20l15 29c2 4 8 4 10 0l14-30a45 45 0 0 1 20-20l30-14c4-2 4-8 0-10Zm0-335-30-15a45 45 0 0 1-20-20l-14-29a6 6 0 0 0-10 0l-15 30a45 45 0 0 1-20 20l-30 14c-3 2-3 8 0 10l30 15a45 45 0 0 1 20 20l15 29c2 4 8 4 10 0l15-30a45 45 0 0 1 20-20l29-14c4-2 4-8 0-10Z" />
    </svg>
);

export const AgentSessionIcon = (props: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 520 520"
        fill="currentColor"
        {...props}
    >
        <path d="M260 40C127 40 21 138 21 259c0 38 11 74 29 106 3 5 4 11 2 17l-31 85c-3 8 5 15 13 13l86-33c5-2 11-1 17 2 36 20 79 32 125 32 131-1 238-98 238-220-1-123-108-221-240-221zm-65 320c0 5-4 9-9 9h-42a9 9 0 0 1-9-9v-54c0-5 4-9 9-9h42c5 0 9 4 9 9zm96 0c0 5-4 9-9 9h-42a9 9 0 0 1-9-9V233c0-5 4-9 9-9h42c5 0 9 4 9 9zm96 0c0 5-4 9-9 9h-42a9 9 0 0 1-9-9V161c0-5 4-9 9-9h42c5 0 9 4 9 9z" />
    </svg>
);

export const SendIcon = (props: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 520 520"
        fill="currentColor"
        {...props}
    >
        <path d="m21 445 44-163h186c5 0 10-5 10-10v-20c0-5-5-10-10-10H65L22 82l-2-8c0-7 7-14 15-13l5 1 450 185c6 2 10 8 10 14s-4 11-9 13L40 464l-6 1c-8-1-14-7-14-15z" />
    </svg>
);

export const CloseIcon = (props: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 520 520"
        fill="currentColor"
        {...props}
    >
        <path d="m310 254 130-131c6-6 6-15 0-21l-20-21c-6-6-15-6-21 0L268 212a10 10 0 0 1-14 0L123 80c-6-6-15-6-21 0l-21 21c-6 6-6 15 0 21l131 131c4 4 4 10 0 14L80 399c-6 6-6 15 0 21l21 21c6 6 15 6 21 0l131-131a10 10 0 0 1 14 0l131 131c6 6 15 6 21 0l21-21c6-6 6-15 0-21L310 268a10 10 0 0 1 0-14z" />
    </svg>
);

export const EllipsisVerticalIcon = (props: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        {...props}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
        />
    </svg>
);

export const SpinnerIcon = (props: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        {...props}
    >
        <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
        ></circle>
        <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
    </svg>
);
