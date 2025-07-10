/* eslint-disable jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import React from 'react'
import {Button, Icon} from '@salesforce/design-system-react'

export function LoadingChatMessage() {
    return (
        <li className="slds-chat-listitem slds-chat-listitem_inbound">
            <div className="slds-chat-message">
                <span
                    aria-hidden="true"
                    className="slds-avatar slds-avatar_circle slds-chat-avatar"
                >
                    <abbr className="slds-avatar__initials slds-avatar__initials_inverse">
                        <Icon category="utility" name="einstein" />
                    </abbr>
                </span>
                <div className="slds-chat-message__body">
                    <span className="slds-icon-typing slds-is-animated">
                        <span className="slds-icon-typing__dot"></span>
                        <span className="slds-icon-typing__dot"></span>
                        <span className="slds-icon-typing__dot"></span>
                    </span>
                </div>
            </div>
        </li>
    )
}

export function Chat({messages, examples, isLoading, onRollback, onExampleClick}) {
    const messagesListRef = React.useRef(null)

    // scroll to bottom of messagesListRef on messages change
    React.useEffect(() => {
        setTimeout(() => {
            messagesListRef.current?.scroll(0, messagesListRef.current.scrollHeight)
        }, 50)
    }, [messages, isLoading])

    return (
        <div
            className="slds-card__body slds-scrollable_y"
            style={{maxHeight: '600px', minHeight: '200px'}}
            ref={messagesListRef}
        >
            <section role="log" className="slds-chat">
                <ul className="slds-chat-list">
                    <ChatIntro examples={examples} onExampleClick={onExampleClick} />
                    {messages
                        ?.filter((m) => m.content)
                        .map((m, i) => (
                            <ChatMessage message={m} key={i} onRollback={onRollback} />
                        ))}
                    {isLoading && <LoadingChatMessage />}
                </ul>
            </section>
        </div>
    )
}

function ChatIntro({examples, onExampleClick}) {
    return (
        <li className="slds-chat-listitem slds-chat-listitem_inbound">
            <div className="slds-chat-message">
                <span
                    aria-hidden="true"
                    className="slds-avatar slds-avatar_circle slds-chat-avatar"
                >
                    <abbr className="slds-avatar__initials slds-avatar__initials_inverse">
                        <Icon category="utility" name="einstein" />
                    </abbr>
                </span>
                <div className="slds-chat-message__body">
                    <div className="slds-chat-message__text slds-chat-message__text_inbound">
                        <p>
                            Tell me what component you are imagining or I can help you get started
                            with some examples:
                        </p>
                        {examples?.map((e, i) => (
                            <div key={i}>
                                <Button
                                    variant="neutral"
                                    style={{
                                        textAlign: 'left',
                                        lineHeight: '1.5em',
                                        padding: '10px',
                                        margin: '5px 0'
                                    }}
                                    onClick={() => onExampleClick(e)}
                                >
                                    {e.desc}
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </li>
    )
}

/**
 * @param {object} props
 * @param {ChatSessionMessage} props.message
 */
function ChatMessage({message, onRollback}) {
    if (message.inbound) {
        return (
            <li className="slds-chat-listitem slds-chat-listitem_inbound">
                <div className="slds-chat-message">
                    <span
                        aria-hidden="true"
                        className="slds-avatar slds-avatar_circle slds-chat-avatar"
                    >
                        <abbr className="slds-avatar__initials slds-avatar__initials_inverse">
                            <Icon category="utility" name="einstein" />
                        </abbr>
                    </span>
                    <div className="slds-chat-message__body">
                        <div className="slds-chat-message__text slds-chat-message__text_inbound">
                            {message.content}
                        </div>
                    </div>
                </div>
            </li>
        )
    } else {
        // outbound (i.e. from AI or system; see note on inbound/outbound above)
        return (
            <>
                <li className="slds-chat-listitem slds-chat-listitem_outbound">
                    <div className="slds-chat-message">
                        <div className="slds-chat-message__body">
                            <div className="slds-chat-message__text slds-chat-message__text_outbound">
                                {message.image ? (
                                    <img
                                        src={message.image}
                                        style={{maxWidth: '275px'}}
                                        alt={'Uploaded'}
                                    />
                                ) : (
                                    message.content
                                )}
                            </div>
                            {message.result && (
                                <div className="slds-chat-message__meta">
                                    <a onClick={() => onRollback(message)}>Rollback</a>
                                </div>
                            )}
                        </div>
                    </div>
                </li>
            </>
        )
    }
}
