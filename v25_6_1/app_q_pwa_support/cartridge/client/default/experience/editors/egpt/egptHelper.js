const CLIENT_ID = '6c957560-464f-4a98-ad0f-5e9662527e27'
const HOSTNAME = new URL(document.baseURI).hostname

async function getAccessToken() {
    const response = await fetch(`https://${HOSTNAME}/dw/oauth2/access_token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `grant_type=urn%3Ademandware%3Aparams%3Aoauth%3Agrant-type%3Aclient-id%3Adwsid%3Adwsecuretoken&client_id=${CLIENT_ID}`,
        includeCredentials: true
    })
    const data = await response.json()
    const token = data.access_token
    return token
}

/**
 * Attempt to get the prompt from the prompt studio custom object
 * TODO: this is a stop gap until we can move this component into qlabs
 * and used the shared queries there
 *
 * @return {Promise<void>}
 */
async function getPromptFromPromptStudio(promptName) {
    const token = await getAccessToken()
    const response = await fetch(
        `https://${HOSTNAME}/s/-/dw/data/v23_2/custom_objects_search/QLabsDataStore`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                query: {
                    bool_query: {
                        must: [
                            {
                                term_query: {
                                    fields: ['c_typeId'],
                                    operator: 'is',
                                    values: ['prompts']
                                }
                            },
                            {
                                bool_query: {
                                    must: [
                                        {
                                            term_query: {
                                                fields: ['c_attrs'],
                                                operator: 'is',
                                                values: [`name=${promptName}`]
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                },
                select: '(**)',
                start: 0,
                count: 1
            })
        }
    )
    const data = await response.json()
    const prompt = data.hits[0]
    const promptData = JSON.parse(prompt.c_data)
    return promptData.body
}

function htmlDecode(input) {
    var doc = new DOMParser().parseFromString(input, 'text/html')
    return doc.documentElement.textContent
}

export async function requestCodeCompletionFromVision(
    serviceUrl,
    imageDataUrl,
    model,
    promptName = 'Page Designer - JSX',
    customFields = []
) {
    var prompt = await getPromptFromPromptStudio(promptName)
    if (customFields.length) {
        const functionPreamble = `\n/**
 * @param {object} props - variables available to component attributes
${customFields
    .map(
        (field) =>
            ` * @param {string} props.${field.id} - ${field.name} ${
                field.type === 'product' ? '(pid)' : ''
            }`
    )
    .join('\n')}
 **/
function MyComponent({${customFields.map((field) => field.id).join(', ')}}) {\n\n`
        prompt += functionPreamble
    }

    prompt += `/* Use this image of a screenshot or wireframe to generate the component. Only respond with JSX. Do not surround the response with markdown code blocks */`

    const _query = new URLSearchParams({
        _method: 'POST',
        _endpoint: 'chat/completions'
    })

    // fetch serviceUrl post JSON body
    const response = await fetch(`${serviceUrl}?${_query}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: model,
            // prompt: prompt,
            max_tokens: 4096,
            messages: [
                {
                    role: 'user',
                    content: [
                        {type: 'text', text: prompt},
                        {
                            type: 'image_url',
                            image_url: {
                                url: imageDataUrl
                            }
                        }
                    ]
                }
            ]
        })
    })

    const body = await response.json()

    if (response.status !== 200) {
        throw new Error(`Unable to generate prompt, something went wrong: ${body?.error}`)
    }

    if (!body.choices || !body.choices.length) {
        throw new Error('No completion available')
    }

    console.debug('OpenAI response ', body)
    return body.choices[0].message.content.trim()
}

/**
 * Request a completion from EGPT
 *
 * @param {string} serviceUrl
 * @param {string} userPrompt
 * @param {string} currentCode
 * @param {string} model
 * @param {string} promptName
 * @param {Array} customFields
 * @return {Promise<string>}
 */
export async function requestCodeCompletion(
    serviceUrl,
    userPrompt,
    currentCode,
    model,
    promptName = 'Page Designer - JSX',
    customFields = []
) {
    var prompt = await getPromptFromPromptStudio(promptName)
    if (customFields.length) {
        const functionPreamble = `\n/**
 * @param {object} props - variables available to component attributes
${customFields
    .map(
        (field) =>
            ` * @param {string} props.${field.id} - ${field.name} ${
                field.type === 'product' ? '(pid)' : ''
            }`
    )
    .join('\n')}
 **/
function MyComponent({${customFields.map((field) => field.id).join(', ')}}) {\n\n`
        prompt += functionPreamble
    }

    if (currentCode) {
        prompt += `/* current component */\n${currentCode}\n/* end current component */\n\n`
        prompt += `/* (modify the current component with the following instructions) ${userPrompt} (you must output the entire JSX of current component with these changes. Only respond with JSX.) /`
    } else {
        prompt += `/* ${userPrompt} (only respond with JSX) */`
    }

    // fetch serviceUrl post JSON body
    const response = await fetch(`${serviceUrl}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-endpoint': 'prompt/generations',
            'x-original-method': 'POST'
        },
        body: JSON.stringify({
            promptTextorId: prompt,
            provider: 'OpenAI',
            additionalConfig: {
                applicationName: 'ECOMQLabs',
                model: model,
                maxTokens: 2048
            }
        })
    })

    const body = await response.json()
    if (response.status !== 200) {
        throw new Error(`Unable to generate prompt, something went wrong: ${body?.error?.message}`)
    }

    if (!body.generations || !body.generations.length) {
        throw new Error('No completion available')
    }

    const generation = body.generations[0].text
    // egpt html encodes the result
    return htmlDecode(generation)
}
