// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  urlBase:"https://cors-anywhere.herokuapp.com/"+"http://119.81.217.94:8080/api/plugins/telemetry/DEVICE/544004b0-c850-11e7-89af-f34162121867/values/timeseries?keys=",
  scantime:20000,
  interval:0,
  limit:1,
  username:'tenant@thingsboard.org',
  password:'tenant'
};
