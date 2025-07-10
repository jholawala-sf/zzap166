import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';

// the code editor should result in an expression we will return from
// the evaluating function; prefix/suffix to contain the expression
// const CODE_PREFIX = `/**/ return (`
// const CODE_SUFFIX = `/**/ );`

/**
 * Editor for editing JSX style javascript with babel tranform
 *
 * @class JSXEditor
 * @classdesc JSXEditor
 * @constructor
 */
function JSXEditor() {
    const [readOnly, setReadOnly] = useState(true);
    const [editorHTML, setEditorHTML] = useState('');

    useEffect(() => {
        emit({
            type: 'sfcc:value',
            payload: {
                content: editorHTML,
            }
        });
    }, [editorHTML, prompt]);

    subscribe('sfcc:ready', async ({ _config, value }) => {
        if (value) {
            setEditorHTML(value.content || '');
        }

        setReadOnly(false);
    });

    subscribe('sfcc:disabled', (disabled) => {
        setReadOnly(disabled);
    });

    subscribe('sfcc:value', (value) => {
        if (value) {
            setEditorHTML(value.content || '');
        }
    });

    return (
        <div style={ { backgroundColor: 'white' } }>
            <CodeMirror
                value={editorHTML}
                readOnly={readOnly}
                extensions={[html()]}
                onChange={(value) => setEditorHTML(value)}
            />
        </div>
    );
}

const container = document.createElement('div');
container.style.backgroundColor = 'white';
document.body.appendChild(container);
ReactDOM.render(<JSXEditor />, container);
