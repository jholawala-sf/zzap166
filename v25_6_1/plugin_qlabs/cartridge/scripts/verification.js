/*
User Verification JWT Generation
 */
var StringUtils = require("dw/util/StringUtils");
var Signature = require("dw/crypto/Signature");
var Encoding = require("dw/crypto/Encoding");
var Bytes = require("dw/util/Bytes");

// TODO: make more generic
var ISS_BM = "https://dx.commercecloud.salesforce.com/BM";
var ISS_STOREFRONT = "https://dx.commercecloud.salesforce.com/storefront";

function base64UrlEncode(str) {
    return StringUtils.encodeBase64(str)
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=/g, "");
}

function createRS256Signature(header, payload, privateKey) {
    // Convert header and payload to base64Url
    const base64UrlHeader = base64UrlEncode(JSON.stringify(header));
    const base64UrlPayload = base64UrlEncode(JSON.stringify(payload));

    // Create the signing input by concatenating header and payload with a dot
    const signingInput = `${base64UrlHeader}.${base64UrlPayload}`;

    var contentToSignInBytes = new Bytes(signingInput);

    var apiSig = new Signature();
    var signedBytes = apiSig.signBytes(contentToSignInBytes, new Bytes(privateKey), "SHA256withRSA");

    var signature = Encoding.toBase64(signedBytes);
    signature = signature.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    // Return complete JWT
    return `${signingInput}.${signature}`;
}

function generate(iss, sub) {
    var privateKey =
        dw.system.System.getPreferences().custom["qlabsVerificationPrivateKey"];

    var header = {
        alg: "RS256",
        kid: "5igp-SQwF2ZLh9BhJoiP40vpY9qS1_Q1B6EGwCOv678",
        typ: "JWT",
    };

    var now = Math.floor(Date.now() / 1000);
    var payload = {
        iss: iss,
        sub: sub,
        aud: iss,
        exp: now + 60 * 60,
        iat: now,
    };

    return createRS256Signature(header, payload, privateKey);
}

exports.generateJWT = function generateJWT() {
    return generate(ISS_BM, session.userName);
};

exports.generateJWTStorefront = function generateJWTStorefront() {
    var username = "anonymous";
    if (customer.authenticated) {
        username = customer.profile.email;
    }
    return generate(ISS_STOREFRONT, username);
}
