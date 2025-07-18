import {IconSettings} from '@salesforce/design-system-react'

// @ts-ignore
import actionSprite from '@salesforce-ux/design-system/assets/icons/action-sprite/svg/symbols.svg'
// @ts-ignore
import utilitySprite from '@salesforce-ux/design-system/assets/icons/utility-sprite/svg/symbols.svg'
// @ts-ignore
import standardSprite from '@salesforce-ux/design-system/assets/icons/standard-sprite/svg/symbols.svg'
// @ts-ignore
import doctypeSprite from '@salesforce-ux/design-system/assets/icons/doctype-sprite/svg/symbols.svg'
// @ts-ignore
import customSprite from '@salesforce-ux/design-system/assets/icons/custom-sprite/svg/symbols.svg'

import '@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.css'
/**
 * React component that configured SLDS based editors
 */
export default function SLDSConfig({children}) {
    return (
        <IconSettings
            actionSprite={actionSprite}
            utilitySprite={utilitySprite}
            standardSprite={standardSprite}
            doctypeSprite={doctypeSprite}
            customSprite={customSprite}
        >
            {children}
        </IconSettings>
    )
}
