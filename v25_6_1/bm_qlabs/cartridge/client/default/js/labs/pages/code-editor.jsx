import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import DefaultLayout from "../layouts/default.jsx";
import { CodeEditor } from "../components/CodeEditor";

function FileTree({ data, onFileClick }) {
    return (
        <ul>
            {data.map((item) => (
                <li
                    key={item.path}
                    onClick={() =>
                        item.isFile ? onFileClick(item.path) : null
                    }
                >
                    {item.name}
                    {!item.isFile && (
                        <FileTree
                            data={item.children}
                            onFileClick={onFileClick}
                        />
                    )}
                </li>
            ))}
        </ul>
    );
}

function TreeExplorer() {
    const [selectedFilePath, setSelectedFilePath] = useState(null);
    const [fileContent, setFileContent] = useState(null);

    const { data, error, isLoading } = useQuery("fetchTree", () =>
        fetch("/api/tree").then((res) => res.json()),
    );

    const handleFileClick = async (filePath) => {
        setSelectedFilePath(filePath);
        const content = await fetch(`/api/file-content?path=${filePath}`).then(
            (res) => res.text(),
        );
        setFileContent(content);
    };

    const handleContentChange = (newContent) => {
        setFileContent(newContent);
        // You can also save the changes to the server here.
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <FileTree data={data} onFileClick={handleFileClick} />
            {selectedFilePath && (
                <CodeEditor
                    value={fileContent}
                    onChange={handleContentChange}
                />
            )}
        </div>
    );
}

export default function CodeEditorPage() {
    return (
        <DefaultLayout>
            <TreeExplorer />
        </DefaultLayout>
    );
}
