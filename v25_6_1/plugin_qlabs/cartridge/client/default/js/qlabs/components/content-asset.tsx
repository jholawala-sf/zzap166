import React, { useEffect, useRef } from "react";
import { useContentAsset } from "@companion/state/content";

declare global {
    interface Window {
        jQuery: any;
    }
}

interface ContentAssetViewProps {
    content: string;
    isLoading?: boolean;
    contentRef?: React.RefObject<HTMLDivElement>;
}

interface ContentAssetProps {
    cid: string;
}

export function ContentAsset({ cid }: ContentAssetProps) {
    const { data, isLoading } = useContentAsset(cid);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // init tooltips after content is loaded
        if (
            !isLoading &&
            data?.content &&
            contentRef.current &&
            typeof window !== "undefined"
        ) {
            if (window.jQuery) {
                window
                    .jQuery('[data-toggle="tooltip"]', contentRef.current)
                    .tooltip();
            }
        }
    }, [isLoading, data?.content]);

    return (
        <ContentAssetView
            content={data?.content || ""}
            isLoading={isLoading}
            contentRef={contentRef}
        />
    );
}

export function ContentAssetView({
    content,
    isLoading = false,
    contentRef,
}: ContentAssetViewProps) {
    return (
        <div className="w-full">
            {isLoading ? (
                <div className="h-24 w-full flex justify-center items-center bg-gray-100">
                    <div className="h-3 w-3 animate-spin rounded-full border-2 border-solid border-primary border-r-transparent"></div>
                </div>
            ) : (
                <div
                    className="content-asset-html"
                    dangerouslySetInnerHTML={{ __html: content }}
                    ref={contentRef}
                />
            )}
        </div>
    );
}
