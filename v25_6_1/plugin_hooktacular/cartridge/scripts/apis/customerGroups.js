exports.get = function () {
    // arrow function require salesforce 21.2 code compatibility

    // discuss if group details are required
    var result = customer.customerGroups.toArray().map(group => ({ id: group.ID }));
    return result;
};
