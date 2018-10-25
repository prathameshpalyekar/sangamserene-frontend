import _ from 'lodash';

const internals = {};

const EMPLOYER_REQUIRED_FIELDS = {
    firstName : true,
    lastName : true,
    email: true,
    phoneNumber: true,
    address: true,
    zipCode: true,
    place: true,
    employerInfo: {
        companyName: true,
        billingInfo: {
            companyName: true,
            invoiceRef: true,
            invoiceEmail: true,
            invoiceAddress: true,
            corporateNum: true,
            invoiceZipCode: true,
            invoicePlace: true,
            invoiceVat: true
        }
    }
}

internals.validateObject = function (user, rules) {
    let result = true;
    _.forIn(rules, function (value, key) {
        if (!user.get(key)) {
            result = false;
            return false;
        }
        if (typeof value !== 'boolean' ) {
            result = internals.validateObject(user.get(key), rules[key]);
        }
        return result;
    });
    return result;
}

internals.validateEmployer = function (user) {
    return internals.validateObject(user, EMPLOYER_REQUIRED_FIELDS);
}

module.exports = {
    validateUser: function(user) {
        if (user.get('employeeType') === 'employer') {
            return internals.validateEmployer(user);
        } else {
            return false;
        }
    }
}
