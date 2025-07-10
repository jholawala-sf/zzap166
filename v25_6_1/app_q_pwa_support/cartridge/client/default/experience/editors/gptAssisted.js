import React, {useState, useEffect, useRef} from 'react'

import {createRoot} from 'react-dom/client'
import {Input, Button, Icon, Tabs, TabsPanel, Alert} from '@salesforce/design-system-react'
import CodeMirror from '@uiw/react-codemirror'
import {javascript} from '@codemirror/lang-javascript'
import {requestCodeCompletion, requestCodeCompletionFromVision} from './egpt/egptHelper'
import {useLivePreviewPublisher} from './hooks'
import {Chat} from './components/chat'
import SLDSConfig from './components/slds'

// export const MODEL_GPT4 = 'gpt-4'
export const MODEL_GPT3 = 'gpt-3.5-turbo'

const EXAMPLES = [
    {
        desc: 'A 3 column responsive grid with a banner, carousel and table...',
        prompt: `give me 3 boxes. it should display as 3 columns on desktop and 1 column on mobile.

the first should contain a banner with text and a button. The button should link to the workout category.

the second should contain a carousel with product tiles for products 1234, 5678 and 4321

the third should contain a striped table to display shipping rates`
    },
    {
        desc: 'A full width banner with a button and callout...',
        prompt: 'A full width banner with a button and callout'
    },
    {
        desc: '2 columns with text and image offsets in each column. The first column should...',
        prompt: 'A hardcoded result',
        result: `<h1>Hardcoded Result</h1>`
    }
]

async function sleep(number) {
    return new Promise((resolve) => setTimeout(resolve, number))
}

function strToCamelCaseIdentifier(str) {
    return str.replace(/[^a-zA-Z0-9]/g, '').replace(/([A-Z])/g, (g) => `${g[0].toLowerCase()}`)
}

/**
 * Editor for editing JSX style javascript with openAI completion
 *
 * @class JSXEditor
 * @classdesc JSXEditor
 * @constructor
 */
function JSXEditor({config, value}) {
    const [readOnly, setReadOnly] = useState(false)
    const [prompt, setPrompt] = useState('')
    const [editorHTML, setEditorHTML] = useState(value?.result || '')
    const [tab, setTab] = useState(0)
    const livePreviewPublish = useLivePreviewPublisher(config.workerScript)
    const [customFields, setCustomFields] = useState(value?.customFields || [])
    // is valid if prompt exists and all custom fields (if they exist) have an id
    const [isValidInstructions, setIsValidInstructions] = useState(
        value?.prompt && customFields.every((field) => field.id)
    )
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [examples, setExamples] = useState(() => {
        var _examples = EXAMPLES
        if (config.examples) {
            try {
                const _func = new Function('return ' + config.examples)
                _examples = _func()
            } catch (e) {
                console.error('Failed to parse examples', e)
            }
        }
        return _examples
    })
    const jsxPrompt = config.jsxPrompt ?? 'Page Designer - JSX'
    const [messages, setMessages] = useState(value?.messages || [])
    const fileInput = useRef(null)

    const handleFileUpload = async (event) => {
        event.preventDefault()
        const file = fileInput.current.files[0]

        const reader = new FileReader()
        reader.onloadend = async () => {
            const dataUrl = reader.result

            setMessages((messages) => [
                ...messages,
                {
                    content: 'Uploading image...',
                    image: dataUrl,
                    inbound: false
                }
            ])
            var result

            try {
                result = await requestCodeCompletionFromVision(
                    config.serviceUrl,
                    dataUrl,
                    'gpt-4-vision-preview',
                    jsxPrompt,
                    customFields
                )
                setPrompt('')
            } catch (e) {
                setMessages((messages) => [
                    ...messages,
                    {
                        inbound: true,
                        error: true,
                        content: `Error executing instructions: ${e.message}`
                    }
                ])
            }

            if (result) {
                setEditorHTML(result)
                setMessages((messages) => {
                    let _messages = messages.slice()
                    _messages[messages.length - 1].result = result
                    return _messages
                })
            }

            setReadOnly(false)
        }

        if (file) {
            setReadOnly(true)
            reader.readAsDataURL(file)
        } else {
            console.error('No file selected')
        }
    }

    useEffect(() => {
        setIsValidInstructions(prompt && customFields.every((field) => field.id))
    }, [prompt, customFields])

    async function handleSend() {
        setReadOnly(true)
        setMessages((messages) => [
            ...messages,
            {
                content: prompt,
                inbound: false
            }
        ])

        if (config.enableExamples && examples.find((e) => e.prompt === prompt)?.result) {
            const example = examples.find((e) => e.prompt === prompt)
            console.log('Using example with hardcoded result', example)
            setPrompt('')
            await sleep(4000)
            var result = example.result
        } else {
            try {
                result = await requestCodeCompletion(
                    config.egptServiceUrl,
                    prompt,
                    editorHTML,
                    config.model || MODEL_GPT3,
                    jsxPrompt,
                    customFields
                )
                setPrompt('')
            } catch (e) {
                setMessages((messages) => [
                    ...messages,
                    {
                        inbound: true,
                        error: true,
                        content: `Error executing instructions: ${e.message}`
                    }
                ])
            }
        }

        if (result) {
            setEditorHTML(result)
            setMessages((messages) => {
                let _messages = messages.slice()
                _messages[messages.length - 1].result = result
                return _messages
            })
        }

        setReadOnly(false)
    }

    useEffect(() => {
        emit({
            type: 'sfcc:value',
            payload: {
                result: editorHTML,
                prompt,
                messages,
                customFields
            }
        })
        livePreviewPublish({
            result: editorHTML,
            customFields
            // messages and prompts shouldn't be here anyway
        })
    }, [editorHTML, messages, prompt, customFields])

    subscribe('sfcc:disabled', (disabled) => {
        setReadOnly(disabled)
    })

    useEffect(() => {
        subscribe('sfcc:value', (value) => {
            console.log('sfcc:value get', value)
            if (value) {
                setPrompt(value.prompt || '')
                setEditorHTML(value.result || '')
            }
        })
    }, [])

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function handleBreakoutOpen() {
        emit({
            type: 'sfcc:value',
            payload: ['Search-Show', 'cgid', 'accessories']
        })

        emit(
            {
                type: 'sfcc:breakout',
                payload: {
                    id: 'sfcc:linkBuilder',
                    title: 'Link',
                    value: 'foo'
                }
            },
            handleBreakoutClose
        )
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function handleBreakoutOpen2() {
        emit(
            {
                type: 'sfcc:breakout',
                payload: {
                    id: 'sfcc:productPicker',
                    title: 'Product',
                    value: 'foo'
                }
            },
            handleBreakoutClose
        )
    }

    function handleBreakoutClose({type, value}) {
        emit({
            type: 'sfcc:value',
            payload: {
                result: editorHTML,
                prompt
            }
        })
        if (type === 'sfcc:breakoutApply') {
            console.log(value)
        } else {
            console.log('Cancelled')
        }
    }

    function onExampleClick(example) {
        setPrompt(example.prompt)
    }

    function onRollback(message) {
        setMessages((messages) => {
            // slice to remove all messages after message
            const _messages = messages.slice(0, messages.indexOf(message) + 1)
            setEditorHTML(message.result)
            return _messages
        })
        console.log(message)
    }

    return (
        <SLDSConfig>
            <div style={{backgroundColor: 'white'}}>
                <Alert
                    icon={null}
                    style={{textAlign: 'left'}}
                    variant={"warning"}
                    labels={{
                        heading:
                            'This is NOT the product version and should no longer be demoed. Please use the product version for demos.'
                    }}/>
                <Tabs
                    variant="scoped"
                    defaultSelectedIndex={tab}
                    selectedIndex={tab}
                    onSelect={(target) => setTab(target)}
                >
                    <TabsPanel
                        label={
                            <span>
                                <Icon
                                    name="einstein"
                                    category="utility"
                                    size="x-small"
                                    style={{
                                        fill: '#0176D3',
                                        backgroundColor: 'transparent',
                                        marginRight: '5px'
                                    }}
                                />{' '}
                                Instructions
                            </span>
                        }
                    >
                        <Chat
                            messages={messages}
                            examples={examples}
                            isLoading={readOnly}
                            onExampleClick={onExampleClick}
                            onRollback={onRollback}
                        />
                        <div className="slds-form-element">
                            <div className="slds-form-element__control">
                                <textarea
                                    className="slds-textarea"
                                    disabled={readOnly}
                                    value={prompt}
                                    rows={6}
                                    width={'100%'}
                                    onChange={(e) => setPrompt(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="slds-m-top_small slds-m-bottom_large slds-x-small-buttons_horizontal">
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInput}
                                style={{display: 'none'}}
                                onChange={handleFileUpload}
                            />
                            <Button
                                label={
                                    <>
                                        <span style={{marginRight: '5px'}}>
                                            <Icon
                                                name="sparkles"
                                                category="utility"
                                                size="small"
                                                colorVariant="brand"
                                            />
                                        </span>
                                        Create Component
                                    </>
                                }
                                disabled={readOnly || !isValidInstructions}
                                onClick={() => handleSend()}
                                variant="brand"
                                className=""
                            />
                            {messages.length === 0 && config.enableVision && (
                                <Button
                                    label={
                                        <>
                                            <span style={{marginRight: '5px'}}>
                                                <Icon
                                                    name="image"
                                                    category="utility"
                                                    size="small"
                                                    colorVariant="base"
                                                />
                                            </span>
                                            From Image
                                        </>
                                    }
                                    disabled={readOnly || isValidInstructions}
                                    onClick={() => fileInput.current.click()}
                                    variant="brand"
                                    className=""
                                />
                            )}
                        </div>
                    </TabsPanel>
                    <TabsPanel
                        label={
                            <span>
                                <Icon
                                    name="custom_apps"
                                    category="utility"
                                    size="x-small"
                                    style={{
                                        fill: '#0176D3',
                                        backgroundColor: 'transparent',
                                        marginRight: '5px'
                                    }}
                                />{' '}
                                Properties
                            </span>
                        }
                    >
                        <Alert
                            icon={null}
                            style={{textAlign: 'left'}}
                            labels={{
                                heading:
                                    '(BETA) Properties are available as variables in your component. For example, if you provide properties for Product 1 and Product 2 they will be available in generated code.'
                            }}
                        />
                        {customFields.map((field, index) => (
                            <div key={index} className="slds-form-element">
                                <label
                                    className="slds-form-element__label"
                                    htmlFor={`text-input-name-${index}`}
                                >
                                    Field Name:
                                </label>
                                <div className="slds-form-element__control">
                                    <input
                                        type="text"
                                        id={`text-input-name-${index}`}
                                        className="slds-input"
                                        disabled={readOnly}
                                        value={field.name}
                                        onChange={(e) => {
                                            const newFields = [...customFields]
                                            newFields[index].name = e.target.value
                                            // set id to camel cased name
                                            newFields[index].id = strToCamelCaseIdentifier(
                                                e.target.value
                                            )
                                            setCustomFields(newFields)
                                        }}
                                    />
                                </div>
                                <label
                                    className="slds-form-element__label"
                                    htmlFor={`text-input-type-${index}`}
                                >
                                    Field Type:
                                </label>
                                <div className="slds-form-element__control">
                                    <select
                                        id={`text-input-type-${index}`}
                                        className="slds-select"
                                        disabled={readOnly}
                                        value={field.type}
                                        onChange={(e) => {
                                            const newFields = [...customFields]
                                            newFields[index].type = e.target.value
                                            setCustomFields(newFields)
                                        }}
                                    >
                                        <option value="string">String</option>
                                        <option value="text">Text (multi-line)</option>
                                        <option value="image">Image</option>
                                        <option value="product">Product</option>
                                        <option value="category">Category</option>
                                        <option value="link">Link</option>
                                    </select>
                                </div>
                                <Button
                                    label="Delete"
                                    disabled={readOnly}
                                    onClick={() => {
                                        const newFields = [...customFields]
                                        newFields.splice(index, 1)
                                        setCustomFields(newFields)
                                    }}
                                    variant="destructive"
                                    size="small"
                                    className="slds-m-top_small slds-m-bottom_large slds-m-b"
                                />
                            </div>
                        ))}
                        <Button
                            label="Add Property"
                            disabled={readOnly}
                            onClick={() => {
                                setCustomFields([
                                    ...customFields,
                                    {id: '', name: '', value: '', type: 'string'}
                                ])
                            }}
                            variant="brand"
                            className="slds-m-top_small slds-m-bottom_large slds-m-b"
                        />
                    </TabsPanel>
                    <TabsPanel
                        label={
                            <>
                                <Icon
                                    name="insert_tag_field"
                                    category="utility"
                                    size="x-small"
                                    style={{
                                        fill: '#0176D3',
                                        backgroundColor: 'transparent',
                                        marginRight: '5px'
                                    }}
                                />{' '}
                                <span>Code</span>
                            </>
                        }
                    >
                        {customFields.map((field, index) => (
                            <div className={`slds-form-element slds-m-vertical_small`} key={index}>
                                <label
                                    className="slds-form-element__label"
                                    htmlFor={`text-input-${index}`}
                                >
                                    {field.name}
                                </label>
                                <div className="slds-form-element__control">
                                    {field.type === 'text' && (
                                        <textarea
                                            className="slds-textarea"
                                            id={`text-input-${index}`}
                                            disabled={readOnly}
                                            value={field.value}
                                            onChange={(e) => {
                                                const newFields = [...customFields]
                                                newFields[index].value = e.target.value
                                                setCustomFields(newFields)
                                            }}
                                        />
                                    )}
                                    {(field.type === 'string' ||
                                        field.type === 'product' ||
                                        field.type === 'image') && (
                                        <Input
                                            id={`text-input-${index}`}
                                            disabled={readOnly}
                                            value={field.value}
                                            onChange={(e) => {
                                                const newFields = [...customFields]
                                                newFields[index].value = e.target.value
                                                setCustomFields(newFields)
                                            }}
                                        />
                                    )}
                                </div>
                            </div>
                        ))}

                        <div className={`slds-form-element slds-m-vertical_small`}>
                            <div className="slds-form-element__control">
                                <CodeMirror
                                    value={editorHTML}
                                    height="400px"
                                    readOnly={readOnly}
                                    extensions={[javascript({jsx: true})]}
                                    onChange={(value) => setEditorHTML(value)}
                                />
                            </div>
                        </div>
                    </TabsPanel>
                </Tabs>
            </div>
        </SLDSConfig>
    )
}

subscribe('sfcc:ready', async ({config, value}) => {
    const container = document.createElement('div')
    container.style.backgroundColor = 'white'
    document.body.appendChild(container)
    const root = createRoot(container)
    root.render(<JSXEditor config={config} value={value} />)
})
