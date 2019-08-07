/*jshint esversion: 6 */
/*global fetch, btoa */
import Q from 'q';
/**
 * This is a sample server Petstore server.  You can find out more about     Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).      For this sample, you can use the api key `special-key` to test the authorization     filters.
 * @class Test
 * @param {(string|object)} [domainOrOptions] - The project domain or options object. If object, see the object's optional properties.
 * @param {string} [domainOrOptions.domain] - The project domain
 * @param {object} [domainOrOptions.token] - auth token - object with value property and optional headerOrQueryName and isQuery properties
 */
let Test = (function() {
    'use strict';

    function Test(options) {
        let domain = (typeof options === 'object') ? options.domain : options;
        this.domain = domain ? domain : 'https://petstore.swagger.io/v2';
        if (this.domain.length === 0) {
            throw new Error('Domain parameter must be specified as a string.');
        }
        this.token = (typeof options === 'object') ? (options.token ? options.token : {}) : {};
        this.apiKey = (typeof options === 'object') ? (options.apiKey ? options.apiKey : {}) : {};
    }

    function serializeQueryParams(parameters) {
        let str = [];
        for (let p in parameters) {
            if (parameters.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + '=' + encodeURIComponent(parameters[p]));
            }
        }
        return str.join('&');
    }

    function mergeQueryParams(parameters, queryParameters) {
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    let parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }
        return queryParameters;
    }

    /**
     * HTTP Request
     * @method
     * @name Test#request
     * @param {string} method - http method
     * @param {string} url - url to do request
     * @param {object} parameters
     * @param {object} body - body parameters / object
     * @param {object} headers - header parameters
     * @param {object} queryParameters - querystring parameters
     * @param {object} form - form data object
     * @param {object} deferred - promise object
     */
    Test.prototype.request = function(method, url, parameters, body, headers, queryParameters, form, deferred) {
        const queryParams = queryParameters && Object.keys(queryParameters).length ? serializeQueryParams(queryParameters) : null;
        const urlWithParams = url + (queryParams ? '?' + queryParams : '');

        if (body && !Object.keys(body).length) {
            body = undefined;
        }

        fetch(urlWithParams, {
            method,
            headers,
            body: JSON.stringify(body)
        }).then((response) => {
            return response.json();
        }).then((body) => {
            deferred.resolve(body);
        }).catch((error) => {
            deferred.reject(error);
        });
    };

    /**
     * Set Token
     * @method
     * @name Test#setToken
     * @param {string} value - token's value
     * @param {string} headerOrQueryName - the header or query name to send the token at
     * @param {boolean} isQuery - true if send the token as query param, otherwise, send as header param
     */
    Test.prototype.setToken = function(value, headerOrQueryName, isQuery) {
        this.token.value = value;
        this.token.headerOrQueryName = headerOrQueryName;
        this.token.isQuery = isQuery;
    };
    /**
     * Set Api Key
     * @method
     * @name Test#setApiKey
     * @param {string} value - apiKey's value
     * @param {string} headerOrQueryName - the header or query name to send the apiKey at
     * @param {boolean} isQuery - true if send the apiKey as query param, otherwise, send as header param
     */
    Test.prototype.setApiKey = function(value, headerOrQueryName, isQuery) {
        this.apiKey.value = value;
        this.apiKey.headerOrQueryName = headerOrQueryName;
        this.apiKey.isQuery = isQuery;
    };
    /**
     * Set Auth headers
     * @method
     * @name Test#setAuthHeaders
     * @param {object} headerParams - headers object
     */
    Test.prototype.setAuthHeaders = function(headerParams) {
        let headers = headerParams ? headerParams : {};
        if (!this.token.isQuery) {
            if (this.token.headerOrQueryName) {
                headers[this.token.headerOrQueryName] = this.token.value;
            } else if (this.token.value) {
                headers['Authorization'] = 'Bearer ' + this.token.value;
            }
        }
        if (!this.apiKey.isQuery && this.apiKey.headerOrQueryName) {
            headers[this.apiKey.headerOrQueryName] = this.apiKey.value;
        }
        return headers;
    };

    /**
     * Add a new pet to the store
     * @method
     * @name Test#addPet
     * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Pet object that needs to be added to the store
     */
    Test.prototype.addPet = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/pet';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/xml, application/json'];
        headers['Content-Type'] = ['application/json,application/xml'];

        if (parameters['body'] !== undefined) {
            body = parameters['body'];
        }

        if (parameters['body'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Update an existing pet
     * @method
     * @name Test#updatePet
     * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Pet object that needs to be added to the store
     */
    Test.prototype.updatePet = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/pet';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/xml, application/json'];
        headers['Content-Type'] = ['application/json,application/xml'];

        if (parameters['body'] !== undefined) {
            body = parameters['body'];
        }

        if (parameters['body'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Multiple status values can be provided with comma separated strings
     * @method
     * @name Test#findPetsByStatus
     * @param {object} parameters - method options and parameters
     * @param {array} parameters.status - Status values that need to be considered for filter
     */
    Test.prototype.findPetsByStatus = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/pet/findByStatus';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/xml, application/json'];

        if (parameters['status'] !== undefined) {
            queryParameters['status'] = parameters['status'];
        }

        if (parameters['status'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: status'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Muliple tags can be provided with comma separated strings. Use         tag1, tag2, tag3 for testing.
     * @method
     * @name Test#findPetsByTags
     * @param {object} parameters - method options and parameters
     * @param {array} parameters.tags - Tags to filter by
     */
    Test.prototype.findPetsByTags = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/pet/findByTags';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/xml, application/json'];

        if (parameters['tags'] !== undefined) {
            queryParameters['tags'] = parameters['tags'];
        }

        if (parameters['tags'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: tags'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Returns a single pet
     * @method
     * @name Test#getPetById
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.petId - ID of pet to return
     */
    Test.prototype.getPetById = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/pet/{petId}';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/xml, application/json'];

        path = path.replace('{petId}', parameters['petId']);

        if (parameters['petId'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: petId'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Updates a pet in the store with form data
     * @method
     * @name Test#updatePetWithForm
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.petId - ID of pet that needs to be updated
     * @param {string} parameters.name - Updated name of the pet
     * @param {string} parameters.status - Updated status of the pet
     */
    Test.prototype.updatePetWithForm = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/pet/{petId}';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/xml, application/json'];
        headers['Content-Type'] = ['application/x-www-form-urlencoded'];

        path = path.replace('{petId}', parameters['petId']);

        if (parameters['petId'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: petId'));
            return deferred.promise;
        }

        if (parameters['name'] !== undefined) {
            form['name'] = parameters['name'];
        }

        if (parameters['status'] !== undefined) {
            form['status'] = parameters['status'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Deletes a pet
     * @method
     * @name Test#deletePet
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.apiKey - This is a sample server Petstore server.  You can find out more about     Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).      For this sample, you can use the api key `special-key` to test the authorization     filters.
     * @param {integer} parameters.petId - Pet id to delete
     */
    Test.prototype.deletePet = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/pet/{petId}';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/xml, application/json'];

        if (parameters['apiKey'] !== undefined) {
            headers['api_key'] = parameters['apiKey'];
        }

        path = path.replace('{petId}', parameters['petId']);

        if (parameters['petId'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: petId'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * uploads an image
     * @method
     * @name Test#uploadFile
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.petId - ID of pet to update
     * @param {string} parameters.additionalMetadata - Additional data to pass to server
     * @param {file} parameters.file - file to upload
     */
    Test.prototype.uploadFile = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/pet/{petId}/uploadImage';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['multipart/form-data'];

        path = path.replace('{petId}', parameters['petId']);

        if (parameters['petId'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: petId'));
            return deferred.promise;
        }

        if (parameters['additionalMetadata'] !== undefined) {
            form['additionalMetadata'] = parameters['additionalMetadata'];
        }

        if (parameters['file'] !== undefined) {
            form['file'] = parameters['file'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Returns a map of status codes to quantities
     * @method
     * @name Test#getInventory
     * @param {object} parameters - method options and parameters
     */
    Test.prototype.getInventory = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/store/inventory';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Place an order for a pet
     * @method
     * @name Test#placeOrder
     * @param {object} parameters - method options and parameters
     * @param {} parameters.body - order placed for purchasing the pet
     */
    Test.prototype.placeOrder = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/store/order';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/xml, application/json'];

        if (parameters['body'] !== undefined) {
            body = parameters['body'];
        }

        if (parameters['body'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * For valid response try integer IDs with value >= 1 and <= 10.         Other values will generated exceptions
     * @method
     * @name Test#getOrderById
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.orderId - ID of pet that needs to be fetched
     */
    Test.prototype.getOrderById = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/store/order/{orderId}';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/xml, application/json'];

        path = path.replace('{orderId}', parameters['orderId']);

        if (parameters['orderId'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: orderId'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * For valid response try integer IDs with positive integer value.         Negative or non-integer values will generate API errors
     * @method
     * @name Test#deleteOrder
     * @param {object} parameters - method options and parameters
     * @param {integer} parameters.orderId - ID of the order that needs to be deleted
     */
    Test.prototype.deleteOrder = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/store/order/{orderId}';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/xml, application/json'];

        path = path.replace('{orderId}', parameters['orderId']);

        if (parameters['orderId'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: orderId'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * This can only be done by the logged in user.
     * @method
     * @name Test#createUser
     * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Created user object
     */
    Test.prototype.createUser = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/user';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/xml, application/json'];

        if (parameters['body'] !== undefined) {
            body = parameters['body'];
        }

        if (parameters['body'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Creates list of users with given input array
     * @method
     * @name Test#createUsersWithArrayInput
     * @param {object} parameters - method options and parameters
     * @param {} parameters.body - List of user object
     */
    Test.prototype.createUsersWithArrayInput = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/user/createWithArray';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/xml, application/json'];

        if (parameters['body'] !== undefined) {
            body = parameters['body'];
        }

        if (parameters['body'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Creates list of users with given input array
     * @method
     * @name Test#createUsersWithListInput
     * @param {object} parameters - method options and parameters
     * @param {} parameters.body - List of user object
     */
    Test.prototype.createUsersWithListInput = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/user/createWithList';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/xml, application/json'];

        if (parameters['body'] !== undefined) {
            body = parameters['body'];
        }

        if (parameters['body'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Logs user into the system
     * @method
     * @name Test#loginUser
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.username - The user name for login
     * @param {string} parameters.password - The password for login in clear text
     */
    Test.prototype.loginUser = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/user/login';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/xml, application/json'];

        if (parameters['username'] !== undefined) {
            queryParameters['username'] = parameters['username'];
        }

        if (parameters['username'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: username'));
            return deferred.promise;
        }

        if (parameters['password'] !== undefined) {
            queryParameters['password'] = parameters['password'];
        }

        if (parameters['password'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: password'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Logs out current logged in user session
     * @method
     * @name Test#logoutUser
     * @param {object} parameters - method options and parameters
     */
    Test.prototype.logoutUser = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/user/logout';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/xml, application/json'];

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Get user by user name
     * @method
     * @name Test#getUserByName
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.username - The name that needs to be fetched. Use user1 for testing. 
     */
    Test.prototype.getUserByName = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/user/{username}';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/xml, application/json'];

        path = path.replace('{username}', parameters['username']);

        if (parameters['username'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: username'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * This can only be done by the logged in user.
     * @method
     * @name Test#updateUser
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.username - name that need to be updated
     * @param {} parameters.body - Updated user object
     */
    Test.prototype.updateUser = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/user/{username}';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/xml, application/json'];

        path = path.replace('{username}', parameters['username']);

        if (parameters['username'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: username'));
            return deferred.promise;
        }

        if (parameters['body'] !== undefined) {
            body = parameters['body'];
        }

        if (parameters['body'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * This can only be done by the logged in user.
     * @method
     * @name Test#deleteUser
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.username - The name that needs to be deleted
     */
    Test.prototype.deleteUser = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/user/{username}';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers['Accept'] = ['application/xml, application/json'];

        path = path.replace('{username}', parameters['username']);

        if (parameters['username'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: username'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };

    return Test;
})();

exports.Test = Test;