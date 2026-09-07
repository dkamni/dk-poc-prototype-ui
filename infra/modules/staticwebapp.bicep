targetScope = 'resourceGroup'

param environmentName string
param location string
param tags object = {}

var resourceSuffix = take(uniqueString(subscription().id, resourceGroup().name, environmentName), 6)

resource staticWebApp 'Microsoft.Web/staticSites@2022-09-01' = {
  name: 'stapp-ai-layout-${resourceSuffix}'
  location: location
  tags: union(tags, { 'azd-service-name': 'web' })
  sku: {
    name: 'Free'
    tier: 'Free'
  }
  properties: {
    buildProperties: {
      appLocation: '/'
      outputLocation: 'dist'
    }
  }
}

output uri string = 'https://${staticWebApp.properties.defaultHostname}'
output name string = staticWebApp.name
