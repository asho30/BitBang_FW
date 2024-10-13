// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
//var mysql = require('mysql');
const fs = require('fs-extra')
const path = require('path')
//const selectTestsWithGrep = require('cypress-select-tests/grep')
//const fetch = require('node-fetch')
const requestTemplates = require('../requests/requestsTemplates')
const networker = require('../fixtures/networker')
//const rp = require('request-promise')
let oAuthdata = null
let data

function getDbConnectionInfo(config) {

  const dbConnectionInfo = {
    host: config.networkerDbHost,
    user: config.networkerDbUser,
    password: config.networkerDbPassword,
    database: config.networkerDbName,
    port: config.networkerDbPort
  }
  return dbConnectionInfo
}

function getConfigurationByFile(file) {
  const pathToConfigFile = path.resolve('__dirname', '..', './cypress/config', `${file}.json`)   //./cypress/
  return fs.readJson(pathToConfigFile)
}

function queryDB(connectionInfo, query) {
  const connection = mysql.createConnection(connectionInfo)
  connection.connect()

  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) {
        return reject(error)
      }

      connection.end()
      return resolve(results)
    })
  })
}

function getGraphQlInfo(config) {
  const request_config = {
    method: 'POST',
    url: config.grapqlUrl,
    headers:
      { Host: config.graphqlHost }
  }
  return request_config
}

async function getAuthToken(config) {

  let url = config.url
  let response = await fetch(url, {
    method: 'post',
    body: JSON.stringify({
      "grant_type": config.grant_type,
      "client_id": config.client_id,
      "client_secret": config.client_secret,
      "audience": config.audience,
      "username": config.superAdminUsername,
      "password": config.superAdminPassword,
      "scope": config.scope,
    }),
    headers: { 'Content-Type': 'application/json' }
  })

  data = await response.json()
  console.log("login ", data)

  return data
}

async function networkerSignIn(networker, config) {
  if (oAuthdata === null) {
    oAuthdata = await getAuthToken(config)
  }

  const getRequestConfig = getGraphQlInfo(config)

  return await rp(getRequestConfig.url, {
    method: getRequestConfig.method,
    headers:
    {
      Host: getRequestConfig.headers.Host,
      authorization:
        `Bearer ${oAuthdata.access_token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "operationName": requestTemplates.signIn.operationName,
      "variables": { "input": networker },
      "query": requestTemplates.signIn.query
    })
  })
}


async function networkerSignUp(networker, config) {
  if (oAuthdata === null) {
    oAuthdata = await getAuthToken(config)
  }

  const getRequestConfig = getGraphQlInfo(config)

  return await rp(getRequestConfig.url, {
    method: getRequestConfig.method,
    headers:
    {
      Host: getRequestConfig.headers.Host,
      authorization:
        `Bearer ${oAuthdata.access_token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "operationName": requestTemplates.signUp.operationName,
      "variables": { "input": networker },
      "query": requestTemplates.signUp.query
    })
  })
}


module.exports = (on, config) => {
  on('before:run', (details) => {
    //console.log('details',details)
    let connectioninfo = getDbConnectionInfo2(details)
    networker.name = 'automation networker'
  })

  on('task', {
    // destructure the argument into the individual fields
    queryDatabase(envconfig) {

      const connectionInfo = getDbConnectionInfo(envconfig)

      if (!connectionInfo) {
        throw new Error(`Do not have DB connection under name ${envconfig.dbName}`)
      }

      return queryDB(connectionInfo, envconfig.query)
    },
  })

  on('task', {
    // destructure the argument into the individual fields
    generateAccessCode({ phone }) {
      cy.getToken().then(request_config => {
        var { headers } = request_config
        headers[networker] = networker
        networker.id = networkerId
        networker.settings.selfEnrollmentEnabled = true
        cy.generateAccessCode(phone, request_config)
      })
    }
  })

  on('task', {
    // destructure the argument into the individual fields
    addNewNetworker({ networker, config }) {
      return addnetworker(networker, config)
    }
  })

  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  // on('before:browser:launch', (browser = {}, launchOptions) => {
  //   if (browser.name === 'chrome') {
  //     launchOptions.args.push('--auto-open-devtools-for-tabs');
  //     return launchOptions;
  //   }
  // })

  //on('file:preprocessor', selectTests(config, pickTests))
  //on('file:preprocessor', selectTestsWithGrep(config))

  on('before:browser:launch', (browser, launchOptions) => {
    if (browser.name === 'chrome') {
      launchOptions.args.push('--disable-dev-shm-usage')
      return launchOptions
    }

    return launchOptions
  })

  on("before:browser:launch", (browser = {}, launchOptions) => {
    launchOptions.args.push("--simulate-critical-update");
    return launchOptions;
  })

  const file = config.env.configFile || 'staging'
  return getConfigurationByFile(file)
}

