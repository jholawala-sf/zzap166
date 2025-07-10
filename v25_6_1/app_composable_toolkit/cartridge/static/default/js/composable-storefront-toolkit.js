// Implements the wrapper client for previewing pwa-kit inside of storefront toolkit
// This pairs with the in-app <StorefrontToolkitConnector> component and uses message passing
// to implement the preview communication channel
// Right only token passing is implemented and this is used to set context on the USID

;(function () {
    let port

    async function onMessage(e) {
        const type = e.data?.type

        switch (type) {
            case 'ack':
                console.log('acknowledged', e.data)
                break
            case 'token':
                // update token from inner app
                const token = e.data.payload.token
                // get token from session storage (we only want this cached for the current session)
                const storedToken = sessionStorage.getItem('composable-toolkit-token')
                if (token === storedToken) {
                    console.log('token is the same, no need to update')
                    return
                } else {
                    // TODO SITE ID otherwise these tokens are not unique per storefront
                    // call context endpoint
                    var params = new URLSearchParams()
                    params.append('jwt', token)
                    var resp = await fetch(window._setContextEndpoint, {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                        },
                        body: params.toString()
                    })
                    var data = await resp.json()
                    console.log('context response', data)
                    if (data.success) {
                        sessionStorage.setItem('composable-toolkit-token', token)
                    }
                }
                break
            default:
                console.log('unknown message type', e.data)
        }
    }

    window.addEventListener('message', function (event) {
        // only response to app ready global messages to connect the message channel
        if (event.data?.type === 'app-ready') {
            console.log('app ready', event.data)
            port = event.ports[0]
            port.postMessage({type: 'init', payload: {}})
            port.onmessage = onMessage
        }
    })
})()
