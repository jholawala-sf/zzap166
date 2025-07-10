import React, {useState, useEffect} from 'react'
import {createRoot} from 'react-dom/client'
import {
    Button,
    Icon,
    RadioButtonGroup,
    Radio,
    Card,
    Pill
} from '@salesforce/design-system-react'
import SLDSConfig from './components/slds'
import {useLivePreviewPublisher} from './hooks'

const CLIENT_ID = '6c957560-464f-4a98-ad0f-5e9662527e27'
const HOSTNAME = new URL(document.baseURI).hostname

// TODO refactor this into a helper
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

function useRecommenders(siteId) {
    const [recommenders, setRecommenders] = useState([])
    useEffect(() => {
        async function fetchRecommenders() {
            const token = await getAccessToken()
            const response = await fetch(
                `https://${HOSTNAME}/s/-/dw/data/v23_2/sites/${siteId}/ai/recommender_names`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            const data = await response.json()
            setRecommenders(data.recommenders)
        }

        fetchRecommenders()
    }, [])
    return recommenders
}

function ProductPicker({products, onChange}) {
    const [inputValue, setInputValue] = useState('')

    const addProduct = () => {
        if (inputValue.trim() !== '') {
            onChange([...products, inputValue.trim()])
            setInputValue('')
        }
    }

    const removeProduct = (index) => {
        onChange(products.filter((_, i) => i !== index))
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            addProduct()
        }
    }

    return (
        <>
            <div className="slds-form-element__control slds-grid">
                <input
                    type="text"
                    id="product-input"
                    placeholder={'Product ID'}
                    className="slds-input"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                />
                <button
                    className="slds-button slds-button_brand slds-m-left_small"
                    onClick={addProduct}
                >
                    Add
                </button>
            </div>
            <div
                className="slds-pill_container slds-m-vertical--small"
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'flex-start',
                    gap: '0.5rem'
                }}
            >
                {products.map((product, i) => (
                    <Pill
                        key={i}
                        icon={<Icon title="Product" category="standard" name="product" />}
                        labels={{
                            label: product,
                            removeTitle: 'Remove'
                        }}
                        onRemove={() => removeProduct(i)}
                    />
                ))}
            </div>
        </>
    )
}

function Override({id, onChange, value, sourceLocations, recommenders}) {
    const overrideTypes = ['Recommender', 'Product', 'Disabled']

    return (
        <>
            <div className="slds-form-element slds-m-vertical--x-small">
                <legend className="slds-form-element__legend slds-form-element__label">
                    <abbr className="slds-required" title="required">
                        *<div className="slds-assistive-text">Required</div>
                    </abbr>
                    Source Location
                </legend>
                <div className="slds-form-element__control">
                    <div className="slds-select_container">
                        <select
                            className="slds-select"
                            id={'source' + id}
                            value={value.source}
                            onChange={(ev) => onChange({...value, source: ev.target.value})}
                        >
                            <option>Select...</option>
                            {sourceLocations.map((location) => (
                                <option key={location} value={location}>
                                    {location}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <RadioButtonGroup
                labels={{label: 'Override Type'}}
                onChange={(event) => onChange({...value, type: event.target.value})}
                required={true}
                name={'overrideType' + id}
            >
                {overrideTypes.map((type) => (
                    <Radio
                        key={type}
                        id={type + id}
                        labels={{label: type}}
                        value={type}
                        checked={value.type === type}
                        variant="button-group"
                    />
                ))}
            </RadioButtonGroup>

            {(value.type === 'Recommender' || value.type === 'Product') && (
                <div className="slds-form-element slds-m-vertical--x-small">
                    <legend className="slds-form-element__legend slds-form-element__label">
                        Title Override
                    </legend>
                    <div className="slds-form-element__control">
                        <div className="slds-select_container">
                            <input
                                className={'slds-input'}
                                id={'title' + id}
                                value={value.title}
                                onChange={(ev) => onChange({...value, title: ev.target.value})}
                            />
                        </div>
                    </div>
                </div>
            )}

            {value.type === 'Recommender' && (
                <div className="slds-form-element slds-m-vertical--x-small">
                    <legend className="slds-form-element__legend slds-form-element__label">
                        <abbr className="slds-required" title="required">
                            *<div className="slds-assistive-text">Required</div>
                        </abbr>
                        Target Recommender
                    </legend>
                    <div className="slds-form-element__control">
                        <div className="slds-select_container">
                            <select
                                className="slds-select"
                                id={'recommender' + id}
                                value={value.recommender}
                                onChange={(ev) =>
                                    onChange({...value, recommender: ev.target.value})
                                }
                            >
                                <option>Select...</option>
                                {recommenders.map((rec) => (
                                    <option key={rec.name} value={rec.name}>
                                        {rec.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            )}

            {value.type === 'Product' && (
                <div className="slds-form-element slds-m-vertical--x-small">
                    <legend className="slds-form-element__legend slds-form-element__label">
                        <abbr className="slds-required" title="required">
                            *<div className="slds-assistive-text">Required</div>
                        </abbr>
                        Products
                    </legend>
                    <div className="slds-form-element__control">
                        <ProductPicker
                            products={value.products}
                            onChange={(products) => onChange({...value, products})}
                        />
                    </div>
                </div>
            )}
        </>
    )
}

const RECOMMENDERS = [
    'pdp-similar-items',
    'viewed-recently-einstein',
    'product-to-product-einstein',
    'complete-the-set',
    'home-top-revenue-for-category',
    'products-in-all-categories'
]

/**
 * Recommender configuration overrides
 */
function RecommenderOverrides({config, value}) {
    const [readOnly, setReadOnly] = useState(false)
    const [overrides, setOverrides] = useState(value?.overrides || [])
    const recommenders = useRecommenders(config.siteId)
    const livePreviewPublish = useLivePreviewPublisher(config.workerScript)

    useEffect(() => {
        console.log(overrides)
        emit({
            type: 'sfcc:value',
            payload: {
                overrides
            }
        })
        livePreviewPublish({
            overrides
        })
    }, [overrides])

    subscribe('sfcc:disabled', (disabled) => {
        setReadOnly(disabled)
    })

    useEffect(() => {
        subscribe('sfcc:value', (value) => {
            console.log('sfcc:value get', value)
            if (value) {
                setOverrides(value.overrides || {})
            }
        })
    }, [])

    const setOverride = (i, value) => {
        const newOverrides = [...overrides]
        newOverrides[i] = value
        setOverrides(newOverrides)
    }

    return (
        <SLDSConfig>
            <div style={{backgroundColor: 'white'}}>
                <div className={'slds-p-vertical--small'}>
                    <Button
                        label="Add Override"
                        onClick={() =>
                            setOverrides([
                                ...overrides,
                                {
                                    source: '',
                                    type: 'Recommender',
                                    products: [],
                                    recommender: ''
                                }
                            ])
                        }
                        disabled={readOnly}
                        variant="brand"
                    />
                </div>
                {recommenders.length > 0 && (
                    <>
                        {overrides.map((override, i) => (
                            <Card
                                key={i}
                                headerActions={
                                    <Button
                                        label="Remove"
                                        onClick={() =>
                                            setOverrides(overrides.filter((o, j) => i !== j))
                                        }
                                        variant="destructive"
                                    />
                                }
                                heading="Override"
                                icon={<Icon category="utility" name="einstein" size="small" />}
                            >
                                <div className={'slds-p-horizontal_small'}>
                                    <Override
                                        key={i}
                                        id={i}
                                        value={override}
                                        onChange={(v) => setOverride(i, v)}
                                        recommenders={recommenders}
                                        sourceLocations={RECOMMENDERS.filter(
                                            (recommender) =>
                                                !overrides.find((o) => o.source === recommender) ||
                                                override.source === recommender
                                        )}
                                    />
                                </div>
                            </Card>
                        ))}
                    </>
                )}
            </div>
        </SLDSConfig>
    )
}

subscribe('sfcc:ready', async ({config, value}) => {
    const container = document.createElement('div')
    container.style.backgroundColor = 'white'
    document.body.appendChild(container)
    const root = createRoot(container)
    root.render(<RecommenderOverrides config={config} value={value} />)
})
