targetScope = 'subscription'

@minLength(1)
@maxLength(64)
@description('Name of the azd environment')
param environmentName string

@minLength(1)
@description('Primary location for all resources')
param location string

@description('Name of the resource group to create')
param resourceGroupName string = 'dk-poc-ui'

var tags = {
  'azd-env-name': environmentName
}

resource rg 'Microsoft.Resources/resourceGroups@2023-07-01' = {
  name: resourceGroupName
  location: location
  tags: tags
}

module staticWebApp './modules/staticwebapp.bicep' = {
  name: 'staticwebapp'
  scope: rg
  params: {
    environmentName: environmentName
    location: location
    tags: tags
  }
}

output AZURE_RESOURCE_GROUP string = rg.name
output WEB_URL string = staticWebApp.outputs.uri
